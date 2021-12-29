const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.subscribes = require("./subscribes.model");
db.notification = require("./notification.model");

module.exports = db;
