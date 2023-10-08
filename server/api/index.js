const express = require('express')
const cors = require("cors")
const app = express();

app.use(cors())
app.use(express.json())

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    res.json({username, password})
})

app.listen(4000)