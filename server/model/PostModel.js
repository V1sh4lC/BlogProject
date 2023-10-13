const mongoose = require('mongoose')
const { Schema } = mongoose;

const PostSchema = Schema({
    // title, description, imagePath, imageName, content, author, datePublished. 
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
        type: Schema.Types.ObjectId,
        ref: 'Login',
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