const { Notification } = require('../db/models/NotificationModel');
const fileStorageService = require('../service/FileStorageService');
const checkObject = require('../utils/checkObject');
const notificationFileService = require('../service/NotificationFileService');
const { NotificationFile } = require('../db/models/NotificationFileModel');
const { FileStorage } = require('../db/models/FileStorageModel');

class NotificationService {

    //thêm notification
    addNotification = async (notification, files) => {
        let fileStorageDataArray = [];
        //Tạo fileStorage
        if (files !== undefined || files.length > 0) {
            console.log("vao");
            fileStorageDataArray = await fileStorageService.addFile(files, notification.userId);
        }
        const notificationInput = {
            ...notification,
            fileId1: fileStorageDataArray[0] ? fileStorageDataArray[0].fileId : null,
            fileId2: fileStorageDataArray[1] ? fileStorageDataArray[1].fileId : null,
            fileId3: fileStorageDataArray[2] ? fileStorageDataArray[2].fileId : null,
            fileId4: fileStorageDataArray[3] ? fileStorageDataArray[3].fileId : null,
        }
        // Tạo notification
        return await Notification.create(notificationInput, { raw: true })
            .then(async notiData => {
                notiData = notiData.get({ plain: true });
                if (checkObject(notiData)) {
                    return {
                        notification: notiData,
                    }
                }
                return null;
            })
        //Thêm vào notificationFile
        // .then(async notiData => {
        //     //Thêm notification file
        //     if (checkObject(notiData)){
        //         if(notiData.files.length > 0)
        //             await notificationFileService.addNotificationFile(notiData.notification.notificationId, notiData.files)
        //     }
        //     return notiData;
        // });
    }

    //Thông tin một notification
    getNotificationByNotificationId = async (notificationId) => {
        const notification = await Notification.findOne({
            where: {
                notificationId
            },
            raw: true
        }).then(async notificationData => {
            if (notificationData) {

                const fileId1 = notificationData.fileId1 ? notificationData.fileId1 : null;
                const fileId2 = notificationData.fileId2 ? notificationData.fileId2 : null;
                const fileId3 = notificationData.fileId3 ? notificationData.fileId3 : null;
                const fileId4 = notificationData.fileId4 ? notificationData.fileId4 : null;

                let file1Object = null, file2Object = null, file3Object = null, file4Object = null;
                if (fileId1)
                    file1Object = await fileStorageService.getFileByFileId(fileId1);
                if (fileId2)
                    file2Object = await fileStorageService.getFileByFileId(fileId2);
                if (fileId3)
                    file3Object = await fileStorageService.getFileByFileId(fileId3);
                if (fileId4)
                    file4Object = await fileStorageService.getFileByFileId(fileId4);
                console.log(file1Object, file2Object, file3Object, file4Object);
                
                delete notificationData.fileId1;
                delete notificationData.fileId2;
                delete notificationData.fileId3;
                delete notificationData.fileId4;
                return {
                    ...notificationData,
                    file1: file1Object,
                    file2: file2Object,
                    file3: file3Object,
                    file4: file4Object
                }
                //notificationData => mảng notification File
                //Xử lý trả về mảng file
                // const files = await NotificationFile.findAll({
                //     where: {
                //         notificationId
                //     },
                //     raw: true
                // }).then(async dataList =>{
                //     let fileList = [];
                //     if(dataList && dataList.length > 0){
                //         //Map mảng notificationFile thành mảng Files
                //         fileList = await Promise.all(dataList.map(async data =>{
                //             return await FileStorage.findOne({
                //                 where: {fileId: data.fileId},
                //                 raw: true

                //             })
                //         }))
                //     }
                //     return fileList;
                // })
                // return {
                //     ...notificationData,
                //     files
                // }
            }
            return null;
        })
        return notification;
    }

    //Danh sách notification
    getAllNotification = async () => {
        return await Notification.findAll({
            raw: true
        }).then(async dataList => {
            return await Promise.all(dataList.map(async data => {
                return await this.getNotificationByNotificationId(data.notificationId);
            }));
        })
    }

    //chuwa xong
    deleteNotificationByNotificationID = async (notificationId) => {
        // return await this.getNotificationByNotificationId(notificationId)
        //     .then(async notification =>{
        //         if(notification){
        //             const count = await Notification.destroy({
        //                 where: {notificationId}
        //             })
        //             if(count){

        //             }
        //         }
        //     })
        return await Notification.destroy({
            where: { notificationId },
        })
    }
}

module.exports = new NotificationService();