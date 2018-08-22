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
  createdAt: {
    type: Date,
    default: Date.now
  },
  completeBy: {
      type: Date,
      default: Date.now,
      required: true
  },

});


module.exports = mongoose.model('Goal', UserGoal);