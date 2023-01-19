const express = require("express")
const app = express()
const mongoose = require('mongoose')
const UserModel = require('./models/users')
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://Ayazzaman:AyAz1248@cluster0.bcfwkpv.mongodb.net/dhall-mern?retryWrites=true&w=majority"
);

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
