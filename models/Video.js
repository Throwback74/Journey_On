const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Video = new Schema({
    videoLink: {
        type: String,
        required: true,
        trim: true
    },

    journeyId: {
        type:String,
        required:true,
        trim: true
    }
})

module.exports = mongoose.model('Video', Video);