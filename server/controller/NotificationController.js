const notificationService = require('../service/NotificationService');

//API: /api/notification
class NotificationController {

    //Theem notificatioin
    //POST: /add/:userId
    addNotification = async (req, res, next) =>{
        const notification = {
            ...req.body,
            userId: req.params.userId
        }
        const files = req.files;
        await notificationService.addNotification(notification, files)
            .then(data =>{
                if(data)
                    return res.status(200).send("Thêm thông báo thành công");
                return res.status(400).send("Thêm thông báo không thành công!")
            })
            .catch(err =>{
                return res.status(400).json(err);
            })
    }

}

module.exports = new NotificationController();