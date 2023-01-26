const express = require("express");
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/users');
const cors = require("cors");
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

        const { document } = new JSDOM(response.data).window;

        const scripts = document.getElementsByTagName("script");
        var htmlCode = scripts[16].innerHTML.toString();
        var index = 0;
        for(var i = 0; i < htmlCode.length; i++){
            if(htmlCode.charAt(i)+htmlCode.charAt(i+1)+htmlCode.charAt(i+2)+htmlCode.charAt(i+3)+htmlCode.charAt(i+4) == "model"){
                index = i;
                break;
            }
        }

        //console.log(htmlCode.substring(index + 7, htmlCode.length -3));
        res.json(JSON.parse(JSON.stringify(htmlCode.substring(index + 7, htmlCode.length -3))));

        
       
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
