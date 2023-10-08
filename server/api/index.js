const express = require('express')
const cors = require("cors")
const app = express();
const mongoose = require('mongoose')
const User = require('../model/singupModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const cookies = require('cookie-parser')

app.use(cors({credentials:true, origin:"http://localhost:3000"}))
app.use(express.json())
app.use(cookies())

async function dbConn() {
    await mongoose.connect(process.env.URI)
}
//connecting to db
dbConn().catch(console.error)

const saltRounds = 10;

app.post("/api/signup", async (req, res) => {
    const { fullname, username, password } = req.body;
    const date = new Date();

    const salt = bcrypt.genSaltSync(saltRounds);

    try {
        const userDoc = await User.create({
            fullname, 
            username, 
            password: bcrypt.hashSync(password, salt), 
            date
        })
        res.json(userDoc)
    } catch(err) {
        res.status(400).send(err)
    }
})

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({username})
        if(bcrypt.compareSync(password, userDoc.password)) {
            const data = { username, id:userDoc._id}
            jwt.sign(data, process.env.TOKEN_SECRET, (err, token) => {
                res.cookie('token', token).json({access: 'ok'})
            })
        } else {
            res.status(401).json({access: false})
        }
    } catch(err) {
        res.status(400).send(err)
    }
})

app.get('/profile', (req, res) => {
    try {
        const token = req.cookies.token;
        jwt.verify(token, process.env.TOKEN_SECRET, (err, info) => {
            if (err) throw err;
            res.json(info)
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.listen(process.env.PORT)