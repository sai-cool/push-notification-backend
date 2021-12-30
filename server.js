const express = require("express"); // --- Express is for building the Rest apis
const bodyParser = require("body-parser"); // --- helps to parse the request and create the req.body object
const cors =  require('cors');

const app = express();

const db = require("./models");
const dbConfig = require("./config/db.config");


// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(cors());

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
