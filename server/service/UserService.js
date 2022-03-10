const { User } = require("../db/postgresql/PostgreSQL");

class UserService {

    //Thêm user
    addUser = async (user) => {
        const userdata = await User.findOrCreate({
            where: { email: user.email },
            defaults: user,
            raw: true
        })
        let check = userdata.find(userEle => {
            return typeof userEle === 'boolean';
        })
        return check ? userdata[0] : "EMAIL DUPPLICATE";
    }

    //Cập nhật user
    //- update email, passwword
    //- update thông tin bảng user
    updateUser = async (user, conditionObj) => {
        return await User.update(user, { where: conditionObj })
    }

    //Lấy user theo userId
    getUserByUserId = async (userId) => {
        return await User.findOne({ where: { userId: userId }, raw: true });
    }

    //Xóa user theo user Id
    removeUserById = async (userId) => {
        return await User.destroy({ where: { userId: userId } })
            .then(data => {
                return data;
            });
    }
}

module.exports = new UserService();