var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username,email: req.body.email }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { account : account });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
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

module.exports = router;
