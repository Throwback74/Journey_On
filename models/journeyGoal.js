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
  },
  thirdStep: {
    type: String,
    required: false,
    unique: true,
    trim: true,
  },
  fourthStep: {
    type: String,
    required: false,
    unique: true,
    trim: true,
  },
  fifthStep: {
    type: String,
    required: false,
    unique: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completeBy: {
      type: Date,
      default: Date.now
  },

});

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  let user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Goal', UserGoal);