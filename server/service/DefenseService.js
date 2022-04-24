const database = require("../db/postgresql/PostgreSQL");
/*
Defense
add defense bao gom council and councilMember
*/
class DefenseService {
    createDefense = async (data)=>{
        const isDefense = await database.Council.findOne({
            where: {councilName: data.councilName}
        });
        if(!isDefense){
            const defense = await database.Council.create({
                councilName: data.councilName,
                councilDesc: data.councilDesc,
                time: data.time,
                location: data.location
            });
            data.lecturers.map(async lecturer => {
                await database.CouncilMember.create( 
                    {
                        councilId: defense.councilId,
                        lecturerId: lecturer.lecturerId,
                        roleName: lecturer.roleName,
                        workUnit: lecturer.workUnit
                    });
            });
            return defense;
        }
        return null;
    }


    assignGroupDefense = async (data)=>{
        let isGroup = await database.Group.findOne({
            where: {groupId: data.groupId},
        });

        let councilMember = await database.CouncilMember.findAll({
            where: {councilId: data.councilId}
        });

        let isMentor = councilMember.map(member=>{
            let mentor = database.GroupLecturer.findOne({
                where: {lecturerId: member.lecturerId}
            });
            if(isMentor){
                return true;
            }
        });
        console.log(isMentor);
        if(isGroup && isMentor){
            return database.Group.update({
                councilId: data.councilId
            },{
                where: {councilId: null, groupId: data.groupId}
            });
        }
        return null;
    }

}

module.exports = new DefenseService();