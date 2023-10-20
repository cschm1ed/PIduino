const fs = require("fs")
const express = require("express")
const cors = require("cors")
const {SerialPort} = require("serialport");
const app = express()

// list serial ports:


app.use(cors())
app.use(express.json())

app.use(express.static(__dirname + "/static"));

app.get("/table", async (req, res) => {
    res.sendFile(__dirname + "/static/arduino_uno_config.json", err => {
        if (err) {
            res.status(500).send("Internal Server Error");
        }
    })
});

app.get("/", async(req, res) => {
    res.sendFile(__dirname + "/index.html", err => {
        if (err) {
            res.status(500).send("Internal Server Error");
        }
    })
})

app.get("/connect-board", async(req, res) => {
    SerialPort.list()
        .then((ports) => {
            console.log(ports);
            res.status(200).send(ports);
        })
        .catch(err => {
            console.log("ERROR: ", err);
            res.status(500).json("Failed to list ports");
        });
});


app.listen(3000, () => {
    console.log("App running on http://localhost:3000");
})

