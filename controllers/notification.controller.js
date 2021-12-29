const uuid = require('uuid');
const db = require('../models');
const Notifications = require('../models/notification.model');
const { notification: Notification } = db;

exports.getAllNotifications = (req, res) => {
    Notification.find().exec(async (err, notificationItem) => {
        if (err) {
            res.status(500).send({ message: 'Notifications  not found' });
        } else if (notification === null || notification.length === 0) {
            res.status(404).send({ message: 'Notifications  not found' });
        } else {
            let notificationList = [];
            notificationItem.forEach(item => {
                notificationList.push({
                    userid: item?.userid,
                    notificationMsg: item?.notificationMsg,
                    notificationId: item?.notificationId,
                    isRead: item?.isRead,
                    createDate: item?.createDate
                })
            });
            res.status(200).send(notificationList);
        }
    });
}


exports.createNotification = (req, res) => {
    const notification = new Notifications({
        userid: req.body.userid,
        notificationId: uuid.v4(),
        isRead: false,
        createDate: new Date(),
        notificationMsg: req.body.message
    });

    notification.save((err) => {
        if (err) {
            res.send(500).send({ message: err });
        } else {
            res.send(200).send({ message: 'Notifcation Successfully created!' });
        }
    })
}

exports.updateReadStatus = (req, res) => {
    Notifications.findByIdAndUpdate(req.body.notificationId, { isRead: req.body.isRead }).exec(async (err, notification) => {
        if (err) {
            res.send(500).send({ message: err });
        } else {
            res.send(200).send({ message: 'Update Readstatus Successfully!' });
        }
    })
}

exports.updateAllNotificationReadStatus = (req, res) => {
    Notification.updateMany(
        { isRead: req.body.isRead },
        { $set: { 'userid': req.body.userid, isRead: false } },
        { multi: true }).exec(async (err, notification) => {
            if (err) {
                res.send(500).send({ message: err });
            } else {
                res.send(200).send({ message: 'Update Readstatus Successfully!' });
            }
        })
}