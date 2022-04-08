const database = require("../db/postgresql/PostgreSQL");
const StudentService = require("./StudentService");
const LecturerService = require("./LecturerService");

class GroupService {

    createGroup = async(data) =>{
            const isGrouped = await database.Group.findOne({
                where: {groupName: data.groupName}
            });
            if(!isGrouped){
                const group = await database.Group.create({
                    groupName: data.groupName,
                    groupDesc: data.groupDesc,
                });
                await data.students.map(async studentId => {
                    await database.Student.update(
                        {
                            groupId: group.groupId
                        },{
                        where: {
                            stuId: studentId,
                            isApproved: true
                        }
                    });
                });
                return group;
            }
            return null;
    }

    assignMentor = async (data)=>{
        const isMentored = await database.Lecturer.findOne({
            where: {lecturerId: data.lecturerId},
        });
        if(isMentored){
            var datas = await data.groups.map(async groupId => {
                let isGrouped =  await database.Group.findOne(
                    {
                    where: {
                        groupId: groupId,
                    }
                });
                if(isGrouped){
                    const groupLecturer = await database.GroupLecturer.create({
                        groupId: groupId,
                        lecturerId: data.lecturerId
                    });
                    return groupLecturer;
                }
            });
            return datas;
        }
        return null;
    }

    getAllGroup = async()=> {
        return await database.Group.findAll().then(async groups => {
            const Groups = Promise.all(groups.map(async group => {
                var students = [];
                var mentors = [];
                const student = await database.Student.findAll({
                    where: {
                        groupId: group.groupId
                    },
                    order:[
                        ["gpa", "DESC"]
                    ]
                });
                if (student) {

                    for (let i = 0; i < student.length; i++) {
                        students.push(await StudentService.getStudent(student[i].userId));
                    }
                }
    
                const mentor = await database.GroupLecturer.findAll({
                    where: {
                        groupId: group.groupId
                    },
                    raw:true
                });
                if (mentor) {
                    for (let i = 0; i < mentor.length; i++) {
                        const user = await database.Lecturer.findOne({
                            where: {
                                lecturerId: mentor[i].lecturerId
                            },
                        });
                        mentors.push(await LecturerService.getLecturerByUserId(user.userId));
                    }
                }
                const groupInfo = {
                    groupId: group.groupId,
                    students: students,
                    mentors: mentors,
                    name: group.groupName,
                    note: group.groupDesc,
                    typeCapstone: group.typeCapstone,
                    isScientificGroup: group.isScientificGroup
                }
                return await groupInfo
            }));
            return Groups;
        });
    }

}



module.exports = new GroupService();
