const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let UserGoal = new Schema({
  goal: {
    type: String,
    required: true,
    trim: true
  },
  firstStep: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  secondStep: {
    type: String,
    required: false,
    unique: true,
    trim: true,
    sparse: true
  },
  thirdStep: {
    type: String,
    required: false,
    unique: true,
    trim: true,
    sparse: true

  },
  fourthStep: {
    type: String,
    required: false,
    unique: true,
    trim: true,
    sparse: true

  },
  fifthStep: {
    type: String,
    required: false,
    unique: true,
    trim: true,
    sparse: true

  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completeBy: {
    type: Date,
    default: Date.now,
    required: true
  }
});


module.exports = mongoose.model('UserGoal', UserGoal);