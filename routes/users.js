'use strict';

var Firebase = require('firebase');
var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

var User = require('../model/usermodel');

var ref = new Firebase('https://thisozanne.firebaseio.com/');

router.get('/signed', function(req,res){
  var token = req.cookies.mytoken;
  if(!token) return res.send({token: false})
  res.send({token: true})

})
router.post('/register', function(req, res, next) {
	console.log('req.body', req.body)
  ref.createUser(req.body, function(err, userData) {
    if(err) return res.status(400).send(err);
    var firebaseId= userData.uid
    var email = req.body.email
    var username = req.body.username
    var image = req.body.image
    console.log("IMAGE!!", req.body.image);
 User.create({firebaseId: firebaseId, email: email, username: username, image:image}, function(err, newUser) {
   if(err) return res.status(400).send(err);
      res.send();
    });
  });
});

router.post('/login', function(req, res, next) {
	console.log("INNNNNNNN", req.body)
  ref.authWithPassword(req.body, function(err, authData) {
    console.log("authData",authData);
    if(err) return res.status(400).send(err);
    User.findOne({firebaseId: authData.uid}, function(err, user) {
    	if (err || !user) return cb(err || "User not found in database");
      var token = user.generateToken();
      console.log('token', token);

      res.cookie('mytoken', token).send();
    });
  });
});
router.post('/resetpass', function(req, res, next) {
  var email = req.body.email
  ref.resetPassword({
    email: email
  }, function(error) {
    if (error) {
      switch (error.code) {
        case "INVALID_USER":
          console.log("The specified user account does not exist.");
          break;
        default:
          console.log("Error resetting password:", error);
      }
    } else {
      console.log("Password reset email sent successfully!");
    }
  });
  res.send();
});
router.post('/changepass', function(req, res, next) {
  var email = req.body.email;
  var oldPassword = req.body.oldPassword;
  var newPassword = req.body.newPassword;
ref.changePassword({
  email: email,
  oldPassword: oldPassword,
  newPassword: newPassword
}, function(error) {
  if (error) {
    switch (error.code) {
      case "INVALID_PASSWORD":
        console.log("The specified user account password is incorrect.");
        break;
      case "INVALID_USER":
        console.log("The specified user account does not exist.");
        break;
      default:
        console.log("Error changing password:", error);
    }
  } else {
    console.log("User password changed successfully!");
  }
});
  res.send();
});


router.get('/logout', function(req, res, next) {
	console.log('Cookie be gone!!')

  res.clearCookie('mytoken').send('Success');
});

router.get('/islogged', User.isLoggedIn, function(req, res, next){

	console.log('req.token', req.token)
	// User.findById({req.token._id}, function(err, user){
		// console.log('user in find by id', user)
	res.send(user)
	// })

})
router.get('/all',  function(req, res, next){
console.log("INNNN")
	User.find({}, function(err, usersAll){
		console.log('all users', usersAll)
	res.send(usersAll)
	})

})


module.exports = router;