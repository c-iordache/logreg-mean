var express = require('express');
var router = express.Router();

var passport = require('passport');
var User = require('../models/user');
var https = require('https');

router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register',function(req,res) {
	verifyRecaptcha(req.body["g-recaptcha-response"],function(success){
		if (success) {
			    User.register(new User({ username : req.body.username,email: req.body.email, fname: req.body.fname, lname: req.body.lname }), req.body.password, function(err, user) {
					if (err) {
						if (err.code==11000) { res.render('error',{message:'Email already exists!',error:err}); }
						return res.render('register', { user : user });
					}
					passport.authenticate('local')(req, res, function () {
						res.redirect('/');
					});
				});
		} else {
			console.log("FAILURE");
			res.end("Captcha failed!");
			// go back, restore input
		}
	});
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login',function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { res.render('error',{message:'User problem',error:err}); }
    // Redirect if it fails
    if (!user) {
		if (info.message=="Incorrect password")
			return res.render('error',{message:'Incorrect password',error:info});
		else if (info.message="Incorrect username")
			return res.render('error',{message:'Incorrect username',error:info});
	}
    req.logIn(user, function(err) {
      if (err) { res.render('error',{message:'Userz problem',error:err}); }
      // Redirect if it succeeds
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

var SECRET = "6LfvKxoTAAAAAPWghP4MAGTVRyxtLfMDpI5l6khU";
// Helper function to make API call to recatpcha and check response
function verifyRecaptcha(key, callback) {
        https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + SECRET + "&response=" + key, function(res) {
                var data = "";
                res.on('data', function (chunk) {
                        data += chunk.toString();
                });
                res.on('end', function() {
                        try {
                                var parsedData = JSON.parse(data);
                                callback(parsedData.success);
                        } catch (e) {
                                callback(false);
                        }
                });
        });
}

module.exports = router;

