const database = require("../db/postgresql/PostgreSQL");
const StudentService = require("./StudentService");
const LecturerService = require("./LecturerService");
const {Group} = require("../db/models/GroupModel");
const { Student } = require("../db/models/StudentModel");
const UserService = require("./UserService");

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
    getMembersGroup = async (groupId) =>{
        return await Student.findAll({
            where:{
                groupId
            },
            raw: true,
            order: [
                ["gpa","DESC"]
            ]
        }).then(async data =>{
            if(data){
                data = await Promise.all(data.map(async student =>{
                    const userData = await UserService.getUserByUserId(student.userId)
                    return {
                        stuId: student.stuId ,
                        userId: student.userId,
                        stuCode: student.stuCode,
                        note: student.note,
                        groupId: student.groupId,
                        class: student.class,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        dateOfBirth: userData.dateOfBirth,
                        email: userData.email,
                        phone: userData.phone,
                        majorId: userData.majorId
                    }
                }))
            }
            return data;
        })
    }

    getAllGroupByTypeCapstone = async (typeCapstone) =>{
        return await Group.findAll({
            where:{typeCapstone},
            order: [
                ["groupName", "ASC"]
            ],
            raw: true
        });
    }
}



module.exports = new GroupService();
