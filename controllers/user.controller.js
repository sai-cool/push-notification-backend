const uuid = require('uuid');
const db =  require("../models");
const {user : User} = db;

exports.createUser = (req, res) => {
  const user = new User({
    userid : uuid.v4(),
    username : req.body.username,
    emailId : req.body.emailId
  })  
  user.save((err) => {
      if(err){
          res.status(500).send({message : err});
      } else {
          res.status(200).send({message : 'User Successfully created!'});
      } 
  });
}

exports.getAllUsers = (req, res) => {
    User.find().exec(async (err, users) => {
        if(err){
            res.status(500).send({message : err});
        } else if(users === null || users.length === 0){
            res.status(404).send({message : 'Users not found.'});
        } else {
            let usersList = [];
            users.forEach(user => {
                usersList.push({
                    username : user?.name,
                    userid : user?.userid,
                    createdDate : user?.createDate,
                    emailId : user?.emailId
                });
            })
            res.status(200).send(usersList);
        }
    })
}