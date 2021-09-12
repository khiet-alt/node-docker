const express = require("express");
const mongoose = require('mongoose');
const app = express();

// mongodb://username:password@ipaddress:port (ipaddress of database)
// we can use name of service instead of ipaddress (DNS helps you resolve host name --> ip)
mongoose.connect("mongodb://thanhkhiet:thanhkhiet@mongoDb:27017/?authSource=admin")
//
    .then(() => console.log("Connected to DB successfully"))
    .catch((e) => console.log(e))

const port = process.env.PORT || 2000;

app.get("/", (req, res) => {
    res.send("<h2>hello thanhkhiet</h2>")
});

app.listen(port, () => {
    console.log(`Server listens at port ${port}`);
});