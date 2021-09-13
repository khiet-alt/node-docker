const express = require("express");
const mongoose = require('mongoose');
const redis = require('redis');
const session = require('express-session');
const connectRedis = require('connect-redis');
const cors = require("cors");

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, SESSION_SECRET, REDIS_URL, REDIS_PORT } = require("./config/config");
//route
const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");
/* -------- Code ----------- */
const app = express();

let RedisStore = connectRedis(session);
// Configure redis client
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

redisClient.on('error', (err) => console.log('Could not establish a connection with redis. ' + err));
redisClient.on('connect', (err) => console.log('Connected to redis successfully'));

app.enable("trust proxy");
app.use(cors({}));

// Configure middleware, which simply doing ST before controller,
app.use(express.json());
app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 5 // session max age in miliseconds
      }
    })
)

// we can use name of service instead of ipaddress (DNS helps you resolve host name --> ip)
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB successfully"))
    .catch((e) => console.log(e))

const port = process.env.PORT || 2000;

app.use("/api/v1/posts", postRoute);
app.use("/api/v1/users", userRoute);

app.get("/api/v1", (req, res) => {
    res.send("<h2>hello mapden</h2>")
});

app.listen(port, () => {
    console.log(`Server listens at port ${port}`);
});