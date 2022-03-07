const {User} = require("../db/postgresql/PostgreSQL");

class UserService {

    //Thêm user
    addUser = async (user) => {
        const userdata = await User.findOrCreate({
            where: {email: user.email},
            defaults: user
        })
        let check =  userdata.find(userEle =>{
            return typeof userEle === 'boolean';
        })
        return check?userdata[0]:"EMAIL DUPPLICATE";
    }

    //Cập nhật user
    updateUser = async (user, conditionObj) =>{
        return await User.update(user, {where: conditionObj})
    }
    
}

module.exports = new UserService();