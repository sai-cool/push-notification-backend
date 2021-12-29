const controller =  require("../controllers/user.controller");

module.exports = (app) => {

    app.get('/api/users', controller.getAllUsers);

    app.post('/api/createUser', controller.createUser);
}