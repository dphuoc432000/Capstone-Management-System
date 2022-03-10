const lecturerService = require('../service/LecturerService');
const generalPassword = require('../helper/GeneralPassword');
//api: /api/user_role/
class LecturerController {

    //Thêm lecture
    //POST: /add
    addLecturer = async (req, res, next) => {
        //{email}
        const email = req.body.email.trim();
        const password = generalPassword();
        await lecturerService.addLecturer({ email, password })
            .then(data => {
                if (data) {
                    if (data !== "USERID DUPPLICATE")
                        return res.status(200).json(data);
                    return res.status(400).send("Lỗi. Đã có tài khoản cho người dùng này.");
                }
                return res.status(400).send("Lỗi thêm user");
            })
            .catch(err => {
                return res.status(400).json(err);
            })
    }

    //Cập nhật lecture
    //Post: /update/:userId
    updateLecturerAndUser = async (req, res, next) => {
        const dataUpdate = req.body;
        await lecturerService.updateLecturerAndUser(dataUpdate)
            .then(data => {
                if (data !== "USER NOT FOUND")
                    return res.status(200).send("Cập nhật thành công");
                return res.status(404).send("Không tìm thấy người dùng");
            })
            .catch(err => {
                return res.status(400).json(err);
            })
    }

    //Danh sách lecture 
    //GET: /list
    getAllLecturer = async (req, res, next) => {
        await lecturerService.getAllLecturer()
            .then(data => {
                if (data)
                    return res.status(200).json(data);
                return res.status(404).send("Không có data");
            })
            .catch(err => {
                return res.status(400).json(err);
            })
    }

    //GET: /get/:userId
    //Lỗi
    getLecturerByUserId = async (req, res, next) => {
        await lecturerService.getLecturerByUserId(req.params.userId)
            .then(data => {
                if (data)
                    return res.status(200).json(data);
                return res.status(404).send("Không tìm thấy data.");
            })
            .catch(err => {
                return res.status(400).json(err);
            })
    }

}

module.exports = new LecturerController();