const express = require("express");
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");

const app = express();
// we can use name of service instead of ipaddress (DNS helps you resolve host name --> ip)
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB successfully"))
    .catch((e) => console.log(e))

const port = process.env.PORT || 2000;

app.get("/", (req, res) => {
    res.send("<h2>hello mapden</h2>")
});

app.listen(port, () => {
    console.log(`Server listens at port ${port}`);
});