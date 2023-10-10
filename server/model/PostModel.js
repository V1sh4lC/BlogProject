const mongoose = require('mongoose')
const { Schema } = mongoose;

const PostSchema = Schema({
    // title, description, file, content 
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: true,
    },
    imageName: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    datePublished: {
        type: Date,
        default: () => {
            let date = new Date();
            date.setMinutes(date.getMinutes() + 330);
            return date;
        }
    }
})

module.exports = new mongoose.model('Posts', PostSchema)