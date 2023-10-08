const mongoose = require('mongoose');
const { Schema } = mongoose;

const data = new Schema({
    username: { type: String, required: true },
    password: { type: String, require: true }
})

module.exports = new mongoose.Model('Login', data);