var express = require('express'); 
var router = express.Router(); 
var Event = require('../models/event');
var mongoose = require('mongoose');

/* GET users listing. */ 
router.get('/', function(req, res, next) {
	/*var eventz = */Event.find({},function(err,events){
		if (err) throw err;
		console.log(events);
		res.render('event',{somedata: events,user: req.user});
	});
});

router.get('/create', function(req, res) {
    res.render('create', { });
});

router.post('/create',function(req,res) {
				var newevent = new Event({name : req.body.name,date: req.body.date, description: req.body.description, address: req.body.address});
				newevent.save(function(err) {
					if (err) {
						 res.render('error',{message:'Event already exists!',error:err}); 
						return res.render('event');
					}
					console.log("Event created successfully!");
					Event.find({},function(err,events){
						if (err) throw err;
						console.log(events);
						res.render('event',{somedata: events});
					});
				});
});

module.exports = router;
