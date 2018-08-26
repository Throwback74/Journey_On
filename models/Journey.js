const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let UserGoal = new Schema({
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


module.exports = mongoose.model('Journey', UserGoal, 'tasks', 'videos');