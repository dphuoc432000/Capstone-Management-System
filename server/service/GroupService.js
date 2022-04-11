const {Group} = require("../db/models/GroupModel");
const { Student } = require("../db/models/StudentModel");
const UserService = require("./UserService");

class GroupService {

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