const userService = require('../service/UserService');

//api: /api/user/
class UserController {

    //Thêm user
    //POST: /add
    addUser = async (req, res, next) => {
        console.log("chay");
        const user = req.body;
        await userService.addUser(user)
            .then(data =>{
                if(data){
                    if(data !== "EMAIL DUPPLICATE")
                        return res.status(200).json(data);
                    return res.status(400).json("Lỗi. Trùng email đăng nhập");
                }
                return res.status(400).json("Lỗi thêm user");
            })
            .catch(err=>{
                return res.status(400).json(err);
                // next(err);s
            })
    }
}

module.exports = new UserController();