const database = require("../db/postgresql/PostgreSQL");
const RoleService = require("./RoleService");
const UserRoleService = require("./UserRoleService");

class StudentService {
    //userId undefine 
    registerExecuteProject = async (student) => {

        //check student was in db
        let data = await database.User.findOne({
            where: {
                email: student.email
            }
        });
        console.log(data);

        if (data) {
            let userId;
            const user = await database.User.create({
                firstName: student.firstName,
                lastName: student.lastName,
                dateOfBirth: student.dateOfBirth,
                email: student.email,
                password: null,
                phone: student.phone,
                majorId: student.majorId,
            }).then(data => {
                userId = data.userId;
            });

            const StudentData = await database.Student.findOrCreate({
                where: {
                    userId
                },
                defaults: {
                    stuCode: student.stuCode,
                    gpa: student.gpa,
                    courseCreadits: student.courseCreadits,
                    codeLevel: student.codeLevel,
                    note: student.note,
                    capstone: student.capstone,
                    class: student.class,
                    isApproved: student.isApproved,
                    userId: userId,
                    class: student.class
                }
            });
            let roleId;
            await RoleService.getRoleByRoleName("student")
                .then(data => {
                    roleId = data.roleId;
                })

            if (userId && roleId) {

                await UserRoleService.addUserRole({
                    userId,
                    roleId
                });

                let check = StudentData.find(userEle => {
                    return typeof userEle === 'boolean';
                });
                return check ? {
                    user: user,
                    StudentData: StudentData[0]
                } : "STUDENT IS IN DB";
            }
            return null;
        }
        return null;
    }
    getStudent = async (userId) => {
        let userInfo = await database.User.findOne({
            where: {
                userId: userId
            }
        });
        let studentInfo = await database.Student.findOne({
            where: {
                userId: userId
            }
        });

        return {
            userInfo: userInfo,
            studentInfo: studentInfo
        }
    }

    getAllStudent = async () => {
        return await database.Student.findAll().then(async datas => {
            return await Promise.all(datas.map(async data => {
                const user = database.User.findOne({
                    where: {
                        userId: data.userId
                    }
                }).then(userInfo => {
                    let info = {
                        ...userInfo.toJSON(),
                        ...data.toJSON()
                    }
                    return info;
                });
                return await user;
            }))
        });
    }

    approveStudent = async (params) => {
        return await database.Student.update({
            isApproved: true
        }, {
            where: {
                stuId: params
            },
        });
    }
}

module.exports = new StudentService();