var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/User.js');

router.get('/', function(req, res, next) {
	User.find(function(err, users){
		if(err) return next(err);
		res.json(users);
	});
});

router.get('/:id', function(req, res, next) {
	User.findById(req.params.id, function(err, get){
		if(err) return next(err);
		res.json(get);
	});
});

router.post('/', function(req, res, next) {
	User.create(req.body, function(err, post){
		console.log(req.body);
		if(err) return next(err);
		res.json(post);
	});
});

router.put('/:id', function(req, res, next){
	User.findByIdAndUpdate(req.params.id, req.body, function(err, put){
		if(err) return next(err);
		res.json(put);
	});
});

router.delete('/:id', function(req, res, next){
	User.findByIdAndRemove(req.params.id, function(err, del){
		if(err) return next(err);
		res.json(del);
	});
});

module.exports = router;
