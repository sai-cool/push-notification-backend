const controller  = require("../controllers/push-notification.controller");

module.exports = (app) => {
    
    app.post('/api/createSubscriber', controller.createSubscribers);

    app.post('/api/sendNotification', controller.sendPushNotification);
}