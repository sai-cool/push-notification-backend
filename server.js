const express = require("express"); // --- Express is for building the Rest apis
const bodyParser = require("body-parser"); // --- helps to parse the request and create the req.body object

const app = express();

const db = require("./models");
const dbConfig = require("./config/db.config");

let corsOptions = {
    origin: [
        "http://localhost:4200",
        "http://localhost:4300",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://127.0.0.1:8081",
        "http://192.168.1.5:8080",
        "https://push-backend-nodejs.herokuapp.com",
        "https://push-client-angular.herokuapp.com/"
    ],
    default: "http://localhost:4200",
};

app.all("*", function (req, res, next) {
    var origin =
        corsOptions.origin.indexOf(req.header("origin")) > -1 ?
        req.headers.origin :
        corsOptions.default;
        console.log(origin);
    res.header("Access-Control-Allow-Origin", '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to my application"
    });
});

db.mongoose.connect(
    dbConfig.dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.error("Connection error", err);
            process.exit();
        }
        console.log("Successfully connect to MongoDB.");
    }
);

//Routes

require("./routes/notifications.routes")(app);
require("./routes/push-notification.routes")(app);
require("./routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
