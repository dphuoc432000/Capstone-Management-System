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
                    typeCapstone: data.typeCapstone,
                    isScientificGroup: data.isScientificGroup
                });
                await data.students.map(async studentId => {
                    await database.Student.update(
                        {
                            groupId: group.groupId
                        },{
                        where: {
                            stuId: studentId,
                            isApproved: true,
                            groupId: null
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
                        lecturerId: data.lecturerId,
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


    getGroupByStudId = async (studId)=>{
        const student = await database.Student.findOne({
            where: {stuId: studId}
        });
        const group = await database.Group.findOne({
            where:{groupId: student.groupId}
        });
        if(student&&group){
            var Students = [];
                var mentors = [];
                const students = await database.Student.findAll({
                    where: {
                        groupId: group.groupId
                    },
                    order:[
                        ["gpa", "DESC"]
                    ]
                });
                if (students) {
                    for (let i = 0; i < students.length; i++) {
                        Students.push(await StudentService.getStudent(students[i].userId));
                    }
                }else return null;
    
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
                return await groupInfo;
        }else return null;
    }

    getGroupByLecturerId = async (lecturerId)=>{
        return await database.GroupLecturer.findAll({
            where: {lecturerId: lecturerId}
        }).then(lecturers=>{
            return  Promise.all(lecturers.map(async lecturer =>{
                const group = await database.Group.findOne({
                    where:{groupId: lecturer.groupId}
                });
                if(lecturer&&group){
                    var Students = [];
                        var mentors = [];
                        const students = await database.Student.findAll({
                            where: {
                                groupId: group.groupId
                            },
                            order:[
                                ["gpa", "DESC"]
                            ]
                        });
                        if (students) {
                            for (let i = 0; i < students.length; i++) {
                                Students.push(await StudentService.getStudent(students[i].userId));
                            }
                        }else return null;
            
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
                        return await groupInfo;
                }else return null;
            }))
        })
    }

    deleteGroup = async(groupId)=>{
        const Group = await database.Group.findOne({
            where:{groupId: groupId}
        });
        if(Group){
            await database.GroupLecturer.destroy({
                where:{groupId:groupId}
            });
            await database.Student.update({
                groupId: null
            },{
                where:{groupId: groupId}
            });

            await database.Group.destroy({
                where:{groupId:groupId}
            });
            return true
        }else return false;
    }

    updateGroup = async(data, groupId)=>{
        const isGrouped = await database.Group.findOne({
            where: {groupId: groupId}
        });
        if(isGrouped){
            const group = await database.Group.update({
                groupName: data.groupName,
                groupDesc: data.groupDesc,
                typeCapstone: data.typeCapstone,
                isScientificGroup: data.isScientificGroup
            }, {
                where:{groupId: groupId}
            });
            await database.Student.update({
                groupId: null
            },{
                where:{groupId: groupId}
            });
            data.students.map(async studentId => {
                await database.Student.update(
                    {
                        groupId: groupId
                    },{
                    where: {
                        stuId: studentId,
                        isApproved: true,
                        groupId: null
                    }
                });
            });
            return group;
        }
        return null;
    }
}



module.exports = new GroupService();
