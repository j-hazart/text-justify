require("dotenv").config();

const express = require("express");

const app = express();
const port = parseInt(process.env.APP_PORT ?? "5000");

app.get('/', (req,res) => {
    res.send("Express server");
});

app.listen(port, (err) => {
    if (err) console.error("Something bad happened");
    else console.log(`Server is listening on ${port}`);
});