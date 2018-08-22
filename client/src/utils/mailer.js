'use strict';
const nodemailer = require('nodemailer');
// const creds = require('../config/config');
const creds = require('../../../keys');

console.log(creds);

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
});

var mailOptions = {
  from: 'no_reply@journey_on-admin.com',
  to: 'corey.slade@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

// HTML version of Mail Options
// var mailOptions = {
//   from: 'youremail@gmail.com',
//   to: 'myfriend@yahoo.com',
//   subject: 'Sending Email using Node.js',
//   html: '<h1>Welcome</h1><p>That was easy!</p>'
// }

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});