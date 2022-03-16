const {
    Lecturer
} = require("../db/models/LecturerModel")
const userService = require("./UserService");
const checkObject = require('../utils/checkObject');
const userRoleService = require('./UserRoleService');
const roleService = require('./RoleService');
const {
    sendEmailUser,
    LectureMail
} = require('../helper/SendEmail');
var validator = require("email-validator");
const majorService = require("./MajorService");
const departmentService = require('./DepartmentService')
const bcrypt = require('bcrypt');
const excelJS = require("exceljs");
const database = require("../db/postgresql/PostgreSQL");


class LecturerService {

    //Thêm lecturer[mentor]
    addLecturer = async ({
        email,
        password
    }) => {
        //validate email
        if (validator.validate(email)) {

            //Tạo user
            //mã hóa password
            let userId;
            const userData = await userService.addUser({
                    email,
                    password: bcrypt.hashSync(password, 10)
                })
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
                await userRoleService.addUserRole({
                    userId,
                    roleId
                })

                const lecturerData = await Lecturer.findOrCreate({
                    where: {
                        userId
                    },
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
                            const updateUserData = await userService.updateUser(userInfor, {
                                userId
                            })
                            //update data lecturer table
                            const updateLecturerData = await Lecturer.update(lecturerInfor, {
                                where: {
                                    userId
                                }
                            })
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

    //Danh sachs Lecturer
    getAllLecturer = async () => {
        return await Lecturer.findAll({
                raw: true
            })
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
                    lecturerData = await Lecturer.findOne({
                        where: {
                            userId
                        },
                        raw: true
                    })
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
                            delete major.createdAt;
                            delete major.updatedAt;
                            return {
                                ...userData,
                                major
                            }
                        })
                        .then(async userData => {
                            if (userData.major.depId) {
                                const department = await departmentService.getDepartmentByDepId(userData.major.depId);
                                const depCode = department.depCode;
                                const depName = department.depName;
                                delete userData.major.depId;
                                delete department.createdAt;
                                delete department.updatedAt;
                                return {
                                    ...userData,
                                    major: {
                                        ...userData.major,
                                        department
                                    },
                                    depCode,
                                    depName
                                }
                            }
                        })
                }
                delete userData.majorId;
                return {
                    ...userData,
                    major: null
                }
            })
        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;
        return user;
    }

    exportFile = async () => {

        const workbook = new excelJS.Workbook(); // Create a new workbook
        const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
        const path = "./files"; // Path to download excel
        // Column for data in excel. key must match data key
        worksheet.columns = [{
                header: "S no.",
                key: "s_no",
                width: 10
            },
            {
                header: "First Name",
                key: "firstName",
                width: 10
            },
            {
                header: "Last Name",
                key: "lastName",
                width: 10
            },
            {
                header: "Email",
                key: "email",
                width: 10
            },
            {
                header: "Phone Number",
                key: "phone",
                width: 10
            },
            {
                header: "Academic Level",
                key: "academicLevel",
                width: 10
            },
            {
                header: "Department Code",
                key: "depCode",
                width: 10
            },
            {
                header: "Department",
                key: "depName",
                width: 10
            },
        ];
        let counter = 1;
        const lectures = await this.getAllLecturer();
        lectures.forEach((user) => {
            user.s_no = counter;
            worksheet.addRow(user); // Add data in worksheet
            counter++;
        });
        // Making first line in excel bold
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = {
                bold: true
            };
        });
        try {
            let url = `${path}/users.xlsx`;
            let fileName = "users.xlsx";
            let type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            database.FileStorage.create({
                fileName: fileName,
                type:type,
                path: url
            });
            let data = await workbook.xlsx.writeFile(`${path}/users.xlsx`);
            return data;
        } catch (err) {
            return "ERROR EXPORT FILE"
        }
    }
}

module.exports = new LecturerService();