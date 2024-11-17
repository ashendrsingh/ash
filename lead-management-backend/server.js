require('dotenv').config()
const express = require("express")
const cors = require("cors")
const bobyParse = require('body-parser')
const mongoDBConnection = require("./connection")
mongoDBConnection()
const routes = require("./routes/middleware")
const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true,
}));

app.use(bobyParse.json());

app.use(bobyParse.urlencoded({ extended: true }))
app.use("/api", routes)
app.listen(PORT, () => {
    console.log("server is running " + PORT)
})