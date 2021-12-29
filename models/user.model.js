const mongoose =  require('mongoose');


const User = mongoose.model('users', new mongoose.Schema({
    userid : String,
    username : String,
    emailId : String,
    createDate: {
        type : Date,
        default : Date.now
    }
}));

module.exports = User;