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
app.use(bodyParser.urlencoded({
  extended: true
}));



// Init the express-jwt middleware
const isAuthenticated = exjwt({
  secret: 'all sorts of code up in here'
});


app.post('/api/addJourney', (req, res) => {
  db.Journey.create(req.body)
    .then(function (dbJourneys) {
      console.log('added journey', dbJourneys)
      return db.User.findOneAndUpdate({
        email: req.body.email
      }, {
        $push: {
          journeys: dbJourneys._id
        }
      }, {
        new: true
      });
    })
    .then(function (dbUser) {
      // If the User was updated successfully, send it back to the client
      res.json(dbUser);
    })
    .catch(function (err) {
      // If an error occurs, send it back to the client
      res.status(400).json(err);
    });
});

app.post('/api/addtask', (req, res) => {
  db.Task.create(req.body)
    .then(function (dbTask) {
      if (dbTask) {
        return db.Journey.findByIdAndUpdate(req.body.journeyId, {
          $push: {
            tasks: dbTask._id
          }
        }, {
          new: true
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'No Journey found'
        });
      }
    }).then(dbJourney => {
      res.json(dbJourney);
    }).catch(function (err) {
      // If an error occurs, send it back to the client
      // res.json(err);
      res.status(400).send(err);
    });
});


app.post('/api/videos', (req, res) => {
  db.Video.create(req.body)
    .then(function (dbVideos) {
      if (dbVideos) {
        return db.Journey.findByIdAndUpdate(req.body.journeyId, {
          $push: {
            videos: dbVideos._id
          }
        }, {
          new: true
        });
      } else {
        console.log(err)
        return res.status(404).send({
          success: false,
          message: 'No Journey found'
        });
      }
    }).then(dbJourney => {
      res.json(dbJourney);
    }).catch(function (err) {
      // If an error occurs, send it back to the client
      // res.json(err);
      res.status(400).send(err);
    });
});

app.get('/api/getvideos/:journeyId', (req, res) => {
  db.Journey.findById(req.params.journeyId).then(data => {
    if (data) {
      res.json(data);
    } else {
      res.status(404).send({
        success: false,
        message: 'No Journey found'
      });
    }
  }).catch(err => res.status(400).send(err));
});



app.get('/api/gettasks/:journeyId', isAuthenticated, (req, res) => {
  db.Journey.findById(req.params.journeyId).then(data => {
    if (data) {
      res.json(data);
    } else {
      res.status(404).send({
        success: false,
        message: 'No Journey found'
      });
    }
  }).catch(err => res.status(400).send(err));
});


app.get('/api/journeyCards/:id', (req, res) => {
  db.Task.find({
    journeyId: req.params.id
  }).then(dbTasks => {
    res.json(dbTasks);
  })
});

app.get('/api/videos/:id', (req, res) => {
  db.Video.find({
    journeyId: req.params.id
  }).then(dbVideos => {
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
        let token = jwt.sign({
          id: user._id,
          email: user.email
        }, 'all sorts of code up in here', {
          expiresIn: 129600
        }); // Sigining the token
        res.json({
          success: true,
          message: "Token Issued!",
          token: token,
          user: user
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Authentication failed. Wrong password."
        });
      }
    });
  }).catch(err => res.status(404).json({
    success: false,
    message: "User not found",
    error: err
  }));
});

// SIGNUP ROUTE
app.post('/api/signup', (req, res) => {
  db.User.create(req.body)
    .then(data => res.json(data))
    .catch(err => res.status(400).json({
      success: false,
      message: "Username or Email Already in Use",
      error: err
    }));
});


app.post('/api/deletejourney', isAuthenticated, (req, res) => {
  db.User.update({
    email: req.body.email
  }, {
    $unset: {
      journeys: 0
    }
  }).then(user => {
    res.json(user)
    user.deleteOne({
      journeys
    })
  }).catch(err => res.status(400).send(err))
})

app.get('/api/username/:id', isAuthenticated, (req, res) => {
  db.User.findById(req.params.id).then(data => {
    if (data) {
      res.json(data);
    } else {
      res.status(404).send({
        success: false,
        message: 'No user found'
      });
    }
  }).catch(err => res.status(400).send(err));
});

app.get('/api/populate/:id', (req, res) => {
  db.User.findById(req.params.id)
    .populate({
      path: "journeys",
      populate: {
        path: "tasks videos"
      }
    }).then(dbUser => {
      if(dbUser){
      res.json(dbUser)
      }else {
        res.status(404).send({
          success: false,
          message: 'No user found'
        });
      }
    }).catch(err => res.status(400).send({
      success: false,
      message: err
    }));
});

app.get('/api/video/:taskId', (req, res) => {
  db.Task.findById(req.params.taskId).populate("videos").exec((err, videos) => {
    if (videos) {
      console.log("Populated Task ", videos)
    } else if (err) {
      res.status(500).send({
        success: false,
        message: err
      })
    } else {
      res.status(404).send({
        success: false,
        message: 'No Task found'
      });
    }
  }).catch(err => res.status(400).send(err));
});

app.get('/api/test/:id', isAuthenticated, (req, res) => {
  db.User.findById(req.params.id)
    .populate("journeys")
    .exec((err, journeys) => {
    if (journeys) {
      res.json(journeys);
    } else if (err) {
      res.status(500).send({
        success: false,
        message: err
      })
    } else {
      res.status(404).send({
        success: false,
        message: 'No user found'
      });
    }
  })
});


// TODO set up to customize future messages
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
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER,
    pass: process.env.PASS
  }
});

app.get("/api/users", function (req, res) {
  // Using our User model, "find" every User in our db
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

var email = "corey.slade@gmail.com";
var username = "Throwback74";



cron.schedule('00 5 * * *', function () {
  console.log("----------------------");
  console.log("Running Cron Job");
  var today = Date.now();
  db.User.find()
    .then(function (dbUser) {
      // dbUser.map(users => (
      //   console.log(users.updatedAt)
      //   var Users = users;
      // ))
      for(let i = 0; i < dbUser.length; i++) {
        var users = dbUser[i];
        console.log(users.updatedAt - today);
        console.log(users.email, users.username);
        if(users.updatedAt - today > 434636190) {
          var mailOptions = {
            from: 'no_reply@journey_on-admin.com',
            to: `${users.email}`,
            subject: 'Sending Email using Node.js',
            html: `<h2 style="text-align: center">Journey On <span> Journey Reminder Email</span></h2> 
            <br><br>
            <div>
              <h4>Hi ${users.username},</h4>
              <p>We miss you at <span style="font-weight: 700">Journey On</span>! It has been 5 days since you checked in on your Journey! Come see what you have coming up soon, and get some help meeting your goals!</p> 
              <a href="www.JourneyOn.com">JourneyOn</a>
            </div>
            <hr>
            <div style="text-align: center">
              <h6>Looking Forward to seeing you again soon!</h6>
              <p>Best Regards,</p>
              <p>JOURNEY ON TEAM</p>
            </div>`
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.send(error);
              console.log(error);
            } else {
              res.send('Email sent: ' + info.response);
              console.log("success!");
            }
          });
        }else {
          console.log("no users to email")
        }

  }})
  .catch(function (err) {
    console.log(err);
  });


});


app.post('/api/update', isAuthenticated, (req, res) => {
  id = req.body._id
  updatedAt = req.body.updatedAt
  console.log(updatedAt, "updatedAt");
  foo = new Date("2018-08-20T07:21:54+01:00")
  var altDate = `2019-08-27 00:00:00.000Z`;
  var test = foo - updatedAt;
  console.log(test);
  console.log("id", id);
  db.User.findByIdAndUpdate(id, {
    $set: {
      updatedAt: req.body.updatedAt
    }
  }, {
    new: true
  }, function (err, data) {
    if (err) return handleError(err);
    res.send(data);
  }).catch(err => res.status(400).json(err));
});




// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}




app.get('/', isAuthenticated /* Using the express jwt MW here */ , (req, res) => {
  res.send('You are authenticated'); //Sending some response when authenticated
});


// Error handling
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
    res.status(401).send(err);
  } else {
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