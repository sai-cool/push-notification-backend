const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const Subscribes =  mongoose.model('subscribes', new mongoose.Schema({
    userId : String,
    subscriprion : Schema.Types.Mixed,
    createDate: {
        type : Date,
        default : Date.now
    }
}))
module.exports = Subscribes;
