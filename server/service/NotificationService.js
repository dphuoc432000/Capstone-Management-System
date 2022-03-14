const { Notification } = require('../db/models/NotificationModel');
const fileStorageService = require('../service/FileStorageService');
const checkObject = require('../utils/checkObject');
const notificationFileService = require('../service/NotificationFileService');

class NotificationService {

    //thêm notification
    addNotification = async (notification, files) => {

        //Tạo notification
        return await Notification.create(notification, { raw: true })
            .then(async notiData => {
                notiData = notiData.get({plain: true});
                if (checkObject(notiData)) {
                    let fileStorageDataArray = [];
                    //Tạo fileStorage
                    if(  files !== undefined || files.length > 0){
                        console.log("vao");
                        fileStorageDataArray = await fileStorageService.addFile(files, notiData.userId);
                    }
                    return {
                        notification: notiData,
                        files: fileStorageDataArray
                    }
                }
                return null;
            }).then(async notiData => {
                //Thêm notification file
                if (checkObject(notiData)){
                    if(notiData.files.length > 0)
                        await notificationFileService.addNotificationFile(notiData.notification.notificationId, notiData.files)
                }
                return notiData;
            });
    }
}

module.exports = new NotificationService();