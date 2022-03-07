const lecturerService = require('../service/LecturerService');
const generalPassword = require( '../helper/GeneralPassword');
//api: /api/user_role/
class LecturerController {

    //Thêm lecture
    //POST: /add
    addLecturer = async (req, res, next) => {
        //{email}
        const user = req.body;
        user.password = generalPassword();
        await lecturerService.addLecturer(user)
            .then(data =>{
                if(data){
                    if(data !== "USERID DUPPLICATE")
                        return res.status(200).json(data);
                    return res.status(400).send("Lỗi. Đã có tài khoản cho người dùng này.");
                }
                return res.status(400).send("Lỗi thêm user");
            })
            .catch(err=>{
                return res.status(400).json(err);
            })
    }
}

module.exports = new LecturerController();