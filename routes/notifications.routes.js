const controller = require("../controllers/notification.controller");

module.exports =  (app) => {

    app.get('/api/notification', controller.getAllNotifications);

    app.post('/api/notification', controller.createNotification);

    app.put('/api/updateReadStatus', controller.updateReadStatus);

    app.put('/api/updateAllReadStatus', controller.updateAllNotificationReadStatus);
}