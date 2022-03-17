const fileStorageService = require('../service/FileStorageService') 

//api: /api/fileStorage/
class FileStorageController {

    //Thêm file cho userId (Test)
    //POST: /upload/:userId
    addFile = async (req, res, next) =>{
        
        const file1 = req.files.file1 ? req.files.file1[0]: null;
        const file2 = req.files.file2 ? req.files.file2[0]: null;
        const file3 = req.files.file3 ? req.files.file3[0]: null;
        const file4 = req.files.file4 ? req.files.file4[0]: null;
        const files = [file1, file2, file3, file4];
        // console.log(files.file1)
        // console.log(files)
        const userId = req.params.userId;
        await fileStorageService.addFile(files,userId)
            .then(data =>{
                if(data) //data trả về mảng
                    // return res.status(200).send("Lưu file thành công!");
                    
                    return res.status(200).json(data);
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