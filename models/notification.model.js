const mongoose = require('mongoose');
const Schema  =  mongoose.Schema;

const Notifications = mongoose.model('notification', new mongoose.Schema({
    userid : String,
    notificationMsg : Schema.Types.Mixed,
    notificationId : String,
    isRead : {
        type : Boolean,
        default : false
    },
    createDate: {
        type : Date,
        default : Date.now
    }
}));

module.exports =  Notifications;



