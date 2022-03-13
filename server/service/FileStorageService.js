const {FileStorage} = require('../db/models/FileStorageModel');

class FileStorageService {

    //Thêm file vào database
    addFile = async (files, userId) =>{
        const fileMap = files.map(file =>{
            return  {
                fileName : file.filename,
                type: file.mimetype,
                path: file.path,
                userId: userId
            }
        })
        return await FileStorage.bulkCreate(fileMap);
    }

}

module.exports = new FileStorageService();