const { Lecturer } = require("../db/models/LecturerModel")
const userService = require("./UserService");
const checkObject = require('../utils/checkObject');
const userRoleService = require('./UserRoleService');
const roleService = require('./RoleService');
const { sendEmailUser, LectureMail } = require('../helper/SendEmail');
var validator = require("email-validator");
const majorService = require("./MajorService");
const departmentService = require('./DepartmentService')
const bcrypt = require('bcrypt');

class LecturerService {

    //Thêm lecturer[mentor]
    addLecturer = async ({ email, password }) => {
        //validate email
        if (validator.validate(email)) {

            //Tạo user
            //mã hóa password
            let userId;
            const userData = await userService.addUser({ email, password: bcrypt.hashSync(password, 10) })
                .then(data => {
                    //kiểm tra user có phải là object 
                    if (checkObject(data)) {
                        userId = data.userId;
                    }
                });

            //Lấy roleId mentor
            let roleId;
            await roleService.getRoleByRoleName("mentor")
                .then(data => {
                    if (checkObject(data))
                        roleId = data.roleId;
                })

            if (userId && roleId) {
                //Tạo role mentor cho user trong bảng userRole
                await userRoleService.addUserRole({ userId, roleId })

                const lecturerData = await Lecturer.findOrCreate({
                    where: { userId },
                    defaults: {
                        userId: userId
                    }
                })

                let check = lecturerData.find(lecturerEle => {
                    return typeof lecturerEle === 'boolean';
                })
                if (check) {
                    //gửi mail
                    await sendEmailUser(email, password, LectureMail);
                    return {
                        user: userData,
                        lecturer: lecturerData[0]
                    }
                }
            }
            return "USERID DUPPLICATE";
        }
        return null;
    }

    //Cập nhật lecturer và user
    /*
    dataUpdate = {
        userId,
        firstName,
        lastName,
        email,
        phone,
        majorId,
        academicLevel
    } */
    updateLecturerAndUser = async (userId, dataUpdate) => {
        if (checkObject(dataUpdate)) {
            return await userService.getUserByUserId(userId)
                .then(async (data) => {
                    if (data) {
                        const userInfor = {
                            firstName: dataUpdate.firstName,
                            lastName: dataUpdate.lastName,
                            email: dataUpdate.email,
                            phone: dataUpdate.phone,
                            majorId: dataUpdate.majorId,
                        }
                        const lecturerInfor = {
                            academicLevel: dataUpdate.academicLevel
                        }
                        //update data user table
                        const updateUserData = await userService.updateUser(userInfor, { userId })
                        //update data lecturer table
                        const updateLecturerData = await Lecturer.update(lecturerInfor, { where: { userId } })
                        return {
                            user_row_updated: updateUserData[0],
                            lecture_row_updated: updateLecturerData[0]
                        }
                    }
                    return "USER NOT FOUND";
                });
        }
        return null;
    }

    //Danh sachs Lecturer
    getAllLecturer = async () => {
        return await Lecturer.findAll({ raw: true })
            .then(async dataList => {
                return await Promise.all(dataList.map(async data => {
                    return await this.getLecturerByUserId(data.userId, data);
                }))
            })
    }

    //Lấy thông tin một lecturer bằng userId
    //lecturer: biến phụ có thể có hoặc không
    getLecturerByUserId = async (userId, lecturer) => {
        const user = await userService.getUserByUserId(userId)
            .then(async userData => {
                let lecturerData;
                if (!lecturer)
                    lecturerData = await Lecturer.findOne({ where: { userId }, raw: true })
                else
                    lecturerData = lecturer;
                return {
                    ...userData,
                    ...lecturerData,
                }
            }).then(async userData => {
                if (userData.majorId) {
                    return await majorService.getMajorByMajorId(userData.majorId)
                        .then(async major => {
                            delete userData.majorId;
                            delete major.createdAt;
                            delete major.updatedAt;
                            return {
                                ...userData,
                                // major
                                ...major
                            }
                        })
                        .then(async userData => {
                            if (userData.depId) {
                                const department = await departmentService.getDepartmentByDepId(userData.depId);
                                delete userData.depId;
                                delete department.createdAt;
                                delete department.updatedAt;
                                return {
                                    ...userData,
                                    // major: {
                                    //     ...userData.major,
                                    //     department
                                    // }
                                    ...department
                                }
                            }
                            return userData;
                        })
                }
                return userData;
            })
        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;
        return user;
    }
}

module.exports = new LecturerService();