const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Task = new Schema({
    taskTitle: {
        type: String,
        required: true,
        trim: true
    },
    taskDescription: {
        type: String,
        required: true,
        trim: true
    },
    taskLabel: {
        default: "TODO",
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        trim: true
    }
});


module.exports = mongoose.model('Task', Task);