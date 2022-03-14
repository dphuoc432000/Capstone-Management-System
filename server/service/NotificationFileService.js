const {NotificationFile} = require('../db/models/NotificationFileModel');

class NotificationFileService {

    //Thêm notificationfile
    addNotificationFile = async (notificationId, files) => {

        if(files.length > 0) {
            const notificationFileArr = files.map(file =>{
                return {
                    notificationId,
                    fileId: file.fileId,
                }
            });
    
            //trả về mảng
            return await NotificationFile.bulkCreate(notificationFileArr)
        }
        return null;
    }
}

module.exports = new NotificationFileService();