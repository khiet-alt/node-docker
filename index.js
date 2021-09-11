const express = require("express");

const app = express();

const port = process.env.PORT || 2000;

app.get("/", (req, res) => {
    res.send("<h2>hello thanhkhiet</h2>")
});

app.listen(port, () => {
    console.log(`Server listens at port ${port}`);
});