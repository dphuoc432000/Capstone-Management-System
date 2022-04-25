const {
    vary
} = require("express/lib/response");
const database = require("../db/postgresql/PostgreSQL");
const LecturerService = require("./LecturerService");
const StudentService = require("./StudentService");
/*
Defense
add defense bao gom council and councilMember
*/
class DefenseService {
    createDefense = async (data) => {
        const isDefense = await database.Council.findOne({
            where: {
                councilName: data.councilName
            }
        });
        if (!isDefense) {
            const defense = await database.Council.create({
                councilName: data.councilName,
                councilDesc: data.councilDesc,
                time: data.time,
                location: data.location
            });
            data.lecturers.map(async lecturer => {
                await database.CouncilMember.create({
                    councilId: defense.councilId,
                    lecturerId: lecturer.lecturerId,
                    roleId: lecturer.roleId,
                    workUnit: lecturer.workUnit
                });
            });
            return defense;
        }
        return null;
    }


    assignGroupDefense = async (data) => {
        let mentor = await database.GroupLecturer.findOne({
            where: {
                groupId: data.groupId
            },
            attributes: ['lecturerId'],
            raw: true
        });

        let councilMember = await database.CouncilMember.findAll({
            where: {
                councilId: data.councilId
            },
            attributes: ['lecturerId'],
            raw: true
        });

        let arr = councilMember.map(el => el.lecturerId);

        let isMentor = arr.includes(mentor.lecturerId);

        if (!isMentor) {
            return database.Group.update({
                councilId: data.councilId
            }, {
                where: {
                    councilId: null,
                    groupId: data.groupId
                },

            });
        }
        return null;
    }

    getAllDefense = async () => {
        return await database.Council.findAll({
                raw: true
            })
            .then(async councils => {
                return await Promise.all(councils.map(async council => {

                    let detailMembers = await database.CouncilMember.findAll({
                        where: {
                            councilId: council.councilId
                        }
                    }).then(async members => {
                        return await Promise.all(members.map(async member => {
                            let workUnit = member.workUnit;
                            let memberInfo = await database.Lecturer.findOne({
                                where: {
                                    lecturerId: member.lecturerId
                                },
                                raw: true
                            }).then(async info => {
                                return await database.User.findOne({
                                    where: {
                                        userId: info.userId
                                    },
                                    attributes: ['firstName', 'lastName']
                                });
                            });
                            let roleName = await database.Role.findOne({
                                where: {
                                    roleId: member.roleId
                                },
                                raw: true,
                                attributes: ['roleName']
                            });
                            let dataMember = {
                                workUnit,
                                memberInfo,
                                roleName
                            }
                            return dataMember;
                        }));
                    });

                    var group = await database.Group.findOne({
                        where: {
                            councilId: council.councilId
                        },
                        raw: true,
                        attributes: ['groupId']
                    });

                    let students = [];
                    let mentors = [];
                    let student = await database.Student.findAll({
                        where: {
                            groupId: group.groupId
                        },
                        order: [
                            ["gpa", "DESC"]
                        ],
                        raw: true
                    });
                    if (student) {

                        for (let i = 0; i < student.length; i++) {
                            students.push(await StudentService.getStudent(student[i].userId));
                        }
                    }

                    let mentor = await database.GroupLecturer.findAll({
                        where: {
                            groupId: group.groupId
                        },
                        raw: true
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
                    return {
                        council,
                        students,
                        mentors,
                        detailMembers
                    }
                }))
            })
    }

    getAllDefenseByLecturerId = async (lecturerId) => {
        let dataCouncil = await database.CouncilMember.findAll({
            where: {
                lecturerId: lecturerId
            },
            raw: true,
        }).then(async datas => {
            return await Promise.all(datas.map(async data => {
                return await database.Council.findOne({
                    where: {
                        councilId: data.councilId
                    }
                });
            }));
        })
        return await Promise.all(dataCouncil.map(async council => {
            let detailMembers = await database.CouncilMember.findAll({
                where: {
                    councilId: council.councilId
                }
            }).then(async members => {
                return await Promise.all(members.map(async member => {
                    let workUnit = member.workUnit;
                    let memberInfo = await database.Lecturer.findOne({
                        where: {
                            lecturerId: member.lecturerId
                        },
                        raw: true
                    }).then(async info => {
                        return await database.User.findOne({
                            where: {
                                userId: info.userId
                            },
                            attributes: ['firstName', 'lastName']
                        });
                    });
                    let roleName = await database.Role.findOne({
                        where: {
                            roleId: member.roleId
                        },
                        raw: true,
                        attributes: ['roleName']
                    });
                    let dataMember = {
                        workUnit,
                        memberInfo,
                        roleName
                    }
                    return dataMember;
                }));
            });

            var group = await database.Group.findOne({
                where: {
                    councilId: council.councilId
                },
                raw: true,
                attributes: ['groupId']
            });

            let students = [];
            let mentors = [];
            let student = await database.Student.findAll({
                where: {
                    groupId: group.groupId
                },
                order: [
                    ["gpa", "DESC"]
                ],
                raw: true
            });
            if (student) {

                for (let i = 0; i < student.length; i++) {
                    students.push(await StudentService.getStudent(student[i].userId));
                }
            }

            let mentor = await database.GroupLecturer.findAll({
                where: {
                    groupId: group.groupId
                },
                raw: true
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
            return {
                council,
                students,
                mentors,
                detailMembers
            }
        }))
    }
}

module.exports = new DefenseService();