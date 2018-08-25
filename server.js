require("dotenv").config();
var cron = require('node-cron');
const axios = require('axios');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/appDB');
const db = require('./models');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const morgan = require('morgan'); // used to see requests
const app = express();
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3001;
console.log(process.env.USER)


cron.schedule('* * * * *', function(){
  console.log('running a task every minute');
});

// Setting CORS so that any website can
// Access our API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  next();
});

//log all requests to the console
app.use(morgan('dev'));

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Init the express-jwt middleware
const isAuthenticated = exjwt({
  secret: 'all sorts of code up in here'
});


app.post('/api/addgoal', (req, res) => {
  db.Journey.create(req.body)
    .then(function (dbGoals) {
      // If a Book was created successfully, find one library (there's only one) and push the new Book's _id to the Library's `books` array
      // { new: true } tells the query that we want it to return the updated Library -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.User.findOneAndUpdate({ email: req.body.email }, { $push: { goals: dbGoals._id } }, { new: true });
    })
    .then(function (dbUser) {
      // If the Library was updated successfully, send it back to the client
      res.json(dbUser);
    })
    .catch(function (err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

app.post('/api/addtask/:id', (req, res) => {
  db.userTasks.create(req.body)
    .then(function(dbTasks) {
      // If a Book was created successfully, find one library (there's only one) and push the new Book's _id to the Library's `books` array
      // { new: true } tells the query that we want it to return the updated Library -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      res.json(dbTasks);
      return db.journeyGoal.findOneAndUpdate({_id: req.params.id}, { $push: { tasks: dbTasks._id } }, { new: true });
    })
    .then(function(dbUser) {
      // If the Library was updated successfully, send it back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

app.get('/api/journeyCards/:id', (req, res) => {
  db.userTasks.find({journeyId: req.params.id}).then(dbTasks => {
    res.json(dbTasks);
  })
});

app.post('/api/videos', (req, res) => {
  db.Video.create(req.body) 
    .then(function(dbVideos) {
      res.json(dbVideos);
      // return db.Videos.findOneAndUpdate({})
    });
});

app.get('/api/videos/:id', (req, res) => {
  db.Video.find({journeyId: req.params.id}).then(dbVideos => {
    res.json(dbVideos);
  })
});




// LOGIN ROUTE
app.post('/api/login', (req, res) => {
  db.User.findOne({
    email: req.body.email
  }).then(user => {
    user.verifyPassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
        let token = jwt.sign({ id: user._id, email: user.email }, 'all sorts of code up in here', { expiresIn: 129600 }); // Sigining the token
        res.json({ success: true, message: "Token Issued!", token: token, user: user });
      } else {
        res.status(401).json({ success: false, message: "Authentication failed. Wrong password." });
      }
    });
  }).catch(err => res.status(404).json({ success: false, message: "User not found", error: err }));
});

// SIGNUP ROUTE
app.post('/api/signup', (req, res) => {
  db.User.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json({ success: false, message: "Username or Email Already in Use", error: err }));
});

// ADD GOAL ROUTE
app.post('/api/addgoal', (req, res) => {
  db.Journey.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json(err));
});

// Any route with isAuthenticated is protected and you need a valid token
// to access
app.get('/api/user/:id', isAuthenticated, (req, res) => {
  db.User.findById(req.params.id)
    .populate("goals")
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).send({ success: false, message: 'No user found' });
      }
    }).catch(err => res.status(400).send(err));
});

app.post('/api/deletejourney', isAuthenticated, (req, res) => {
  db.User.update({
    email: req.body.email
  },
    {
      $unset:
        { goals: 0 }
    }).then(user => {
      res.json(user)
      user.deleteOne({ goals })
    }).catch(err => res.status(400).send(err))
})

app.get('/api/username/:id', isAuthenticated, (req, res) => {
  db.User.findById(req.params.id).then(data => {
    if (data) {
      res.json(data);
    } else {
      res.status(404).send({ success: false, message: 'No user found' });
    }
  }).catch(err => res.status(400).send(err));
});

app.get('/api/test/:id', (req, res) => {
  db.User.findById(req.params.id).populate("goals").then(data => {
    if (data) {
      res.json(data);
    } else {
      res.status(404).send({ success: false, message: 'No user found' });
    }
  }).catch(err => res.status(400).send(err));
});

app.post('/api/send/email', (req, res) => {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });

  var mailOptions = {
    from: 'no_reply@journey_on-admin.com',
    to: 'corey.slade@gmail.com',
    subject: 'Sending Email using Node.js',
    html: `<h1>${req.body.message}</h1>`
  };

  // HTML version of Mail Options
  // var mailOptions = {
  //   from: 'youremail@gmail.com',
  //   to: 'myfriend@yahoo.com',
  //   subject: 'Sending Email using Node.js',
  //   html: '<h1>Welcome</h1><p>That was easy!</p>'
  // }
  
//   cron.schedule('* * * * *', function(){
//     console.log("----------------------");
//     console.log("Running Cron Job");
//     var mailOptions = {
//       from: 'no_reply@journey_on-admin.com',
//       to: 'corey.slade@gmail.com',
//       subject: 'Sending Email using Node.js',
//       html: `<h1>${req.body.message}</h1>`
//     };
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       res.send(error);
//     } else {
//       res.send('Email sent: ' + info.response);
//       console.log("success!");
//     }
//   });
// });
})

// var task = cron.schedule('* * 9 22 * * 0-7', function(){
//   console.log('running every day Sunday-Monday at 9');
//   axios.get('/api/users').then(res => {

//   })
// }, false);

// task.start();

cron.schedule("* * * * Wednesday", function() {
  console.log("---------------------");
  console.log("Running Cron Job");
  // let mailOptions = {
  //   from: "COMPANYEMAIL@gmail.com",
  //   to: "RECEPIENTEMAIL@gmail.com",
  //   subject: `Not a GDPR update ;)`,
  //   text: `Hi there, this email was automatically sent by us`
  // };
  var mailOptions = {
          from: 'no_reply@journey_on-admin.com',
          to: 'corey.slade@gmail.com',
          subject: 'Sending Email using Node.js',
          html: `<h1>TESTING EMAIL Scheduler</h1>`
        };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      throw error;
    } else {
      console.log("Email successfully sent!");
    }
  });
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/api/users", function (req, res) {
  // Using our Library model, "find" every library in our db
  db.User.find()
    .then(function (dbUser) {
      // If any Libraries are found, send them to the client
      res.json(dbUser);
    })
    .catch(function (err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});


app.get('/', isAuthenticated /* Using the express jwt MW here */, (req, res) => {
  res.send('You are authenticated'); //Sending some response when authenticated
});


// Error handling
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
    res.status(401).send(err);
  }
  else {
    next(err);
  }
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
