const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


let Journey = new Schema({
  journeyName: {
    type: String,
    required: true,
    trim: true
  },
  journeySummary: {
    type: String,
    required: true,
    trim: true
  },
  completeBy: {
    type: Date,
    default: Date.now,
    required: true
  },
  userId: {
    type:String,
    required:true,
    trim: true
},
tasks: [
  {
    type: Schema.Types.ObjectId,
    ref: "Task"
  }
],
videos: [
  {
    type: Schema.Types.ObjectId,
    ref: "Video"
  }
]
},{
  timestamps: true
  });


module.exports = mongoose.model('Journey', Journey, 'tasks', 'videos');