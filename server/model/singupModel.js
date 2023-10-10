const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    username: { 
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
    date: {
        type: Date,
        default: () => {
            let date = new Date();
            date.setMinutes(date.getMinutes() + 330);
            return date;
        }
    },            
    }
)

module.exports = new mongoose.model('Login', UserSchema);