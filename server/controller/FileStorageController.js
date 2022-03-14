const fileStorageService = require('../service/FileStorageService') 

//api: /api/fileStorage/
class FileStorageController {

    //Thêm file cho userId (Test)
    //POST: /upload/:userId
    addFile = async (req, res, next) =>{
        const files = req.files;
        const userId = req.params.userId;
        await fileStorageService.addFile(files,userId)
            .then(data =>{
                if(data) //data trả về mảng
                    return res.status(200).send("Lưu file thành công!");
                return res.status(400).send("Lưu file không thành công!");
            }).catch(err =>{
                return res.status(400).json(err);
            })
    }

    //get
    get = async (req, res, next) =>{
        res.send('../index.html')
    }
}

module.exports = new FileStorageController();