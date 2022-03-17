const {FileStorage} = require('../db/models/FileStorageModel');

class FileStorageService {

    //Thêm file vào database
    addFile = async (files, userId) =>{
        const fileMap = files.map(file =>{
            return file &&  {
                fileName : file.filename,
                type: file.mimetype,
                path: file.path,
                userId: userId
            }
        })
        const fileFilter = fileMap.filter(file =>{
            return file && file;
        })
        // console.log(fileFilter);
        return await FileStorage.bulkCreate(fileFilter);
    }

    //Lấy thông tin một file bằng fileId
    getFileByFileId = async (fileId) =>{
        return await FileStorage.findOne({where:{fileId},raw: true})
    }

    //Xóa file và fileStorage   
}

module.exports = new FileStorageService();