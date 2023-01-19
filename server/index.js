const express = require("express");
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/users');
const cors = require("cors");
const cheerio = require("cheerio");
const axios = require('axios');

const { JSDOM } = require('jsdom');


app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://Ayazzaman:AyAz1248@cluster0.bcfwkpv.mongodb.net/dhall-mern?retryWrites=true&w=majority"
);

app.get("/initData", (req, res) => {
    axios
    .get("https://mun.campusdish.com/en/locationsandmenus/gushuedininghall/")
    .then((response) => {
        ///console.log(response.data);
        const $ = cheerio.load(response.data);
        ///const htmlElement = $(".text/javascript");

        const { document } = new JSDOM(response.data).window;

        const scripts = document.getElementsByTagName("script");
        console.log(scripts[16].outerHTML);
        ///console.log(response.data);        
       
    })
    .catch((error) => {
        console.error(error);
    })
});

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    }) ;
});

app.post("/createUser", async (req, res) => {
    const user = req.body
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user)
});

app.delete("/deleteUser", async (req, res) => {
    const user = req.body
    UserModel.deleteOne({name:user.name}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

app.listen(3001, () => {
    console.log("SERVER RUNS PERFECTLY!");
});
