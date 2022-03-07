const { Lecturer } = require("../db/models/LecturerModel")
const userService = require("./UserService");
const checkObject = require('../utils/checkObject');
const userRoleService = require('./UserRoleService');
const roleService = require('./RoleService');
const { sendEmailUser, LectureMail } = require('../helper/SendEmail');
var validator = require("email-validator");

class LecturerService {

    //Thêm lecturer[mentor]
    addLecturer = async ({ email, password }) => {
        //validate email
        if (validator.validate(email)) {

            //Tạo user
            let userId;
            const userData = await userService.addUser({ email, password })
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
    updateLecturerAndUser = async (dataUpdate) => {
        if (checkObject(dataUpdate)) {
            return await userService.getUserByUserId(dataUpdate.userId)
                .then(async (data) => {
                    if (data) {
                        const userId = data.userId;
                        if (userId) {
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
                    }
                    return "USER NOT FOUND";
                });
        }
        return null;
    }

}

module.exports = new LecturerService();