const express = require('express')
const cors = require("cors")
const app = express();
const mongoose = require('mongoose')
const User = require('../model/singupModel')
const CreatePost = require('../model/PostModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const cookies = require('cookie-parser')
const multer = require('multer')
const upload = multer({dest: './uploads'})
const fs = require('fs');

app.use(cors({credentials:true, origin:"http://192.168.0.104:3000"}))
app.use(express.json())
app.use(cookies())
app.use('/uploads', express.static(__dirname + "/.." + "/uploads"))

async function dbConn() {
    await mongoose.connect(process.env.URI)
}
//connecting to db
dbConn().catch(console.error)

const saltRounds = 10;

app.post("/api/signup", async (req, res) => {
    const { fullname, username, password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);

    try {
        const userDoc = await User.create({
            fullname, 
            username, 
            password: bcrypt.hashSync(password, salt), 
        })
        res.json(userDoc)
    } catch(err) {
        res.status(400).json(err)
    }
})

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.findOne({username})
        if(bcrypt.compareSync(password, userDoc.password)) {
            const data = { username, id:userDoc._id}
            jwt.sign(data, process.env.TOKEN_SECRET, (err, token) => {
                res.cookie('token', token).json(data)
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

app.post('/api/post', upload.single('file') ,async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const reqImage = req.file;
        const { originalname, path } = reqImage;
        const ext = originalname.split('.')[1]
        fs.renameSync(path, path + '.' + ext);
        //posting to the db
        try {
            jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
                const postCreated = await CreatePost.create({
                    title: req.body.title,
                    description: req.body.description,
                    imagePath: reqImage.destination,
                    imageName: reqImage.filename + "." + ext,
                    content: req.body.content,
                    author: user.id
                })
                
                res.json({postCreationStatus: 'ok'})

            })
        } catch (err) {
            res.status(500).json(err)
        }
        
    } catch (err) {
        res.status(500).json("something went wrong")
    }
})

app.get('/api/posts', async (req, res) => {
    const info = await CreatePost.find(
        {}).populate('author', ['username'])
        .sort({datePublished: -1})
        .limit(20);
    
    res.json(info)
})

app.get('/article/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await CreatePost.findById(id).populate('author', ['username'])
    res.json(postDoc)
})

app.put('/api/post', upload.single('file') , (req, res, next) => {
    const newDoc = {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
    }

    if (req?.file) {
        const reqImage = req.file;
        const { originalname, path } = reqImage;
        const ext = originalname.split('.')[1];
        fs.renameSync(path, path + '.' + ext)
        newDoc.imageName = reqImage.filename + '.' + ext
    }

    const options = {
        returnDocument:'after',
    }

    try {
        const token = req.cookies.token;
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
            if (err) {
                res.json(err)
            } else {
                const doc = await CreatePost.findOneAndUpdate({_id: req.body._id}, newDoc, options)
                res.json({postUpdateStatus: 'ok'})
            }
            
        })
    } catch (err) {
        res.json({error: err})
    }
    // res.json({postUpdateStatus: "ok"})
    
}) 

// app.post('/api', async (req, res) => {
//     const { id } = req.body;
//     const info = await CreatePost.findByID(id);
//     res.json(info)
// })


app.listen(process.env.PORT, '192.168.0.104', () => {
    console.log(`server hosted on http://192.168.0.104:${process.env.PORT}`)
})