var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Todo = require('../models/Todo.js');
var Project = require('../models/Project.js');

router.get('/', function(req, res, next) {
	Todo.find(function(err, todos){
		if(err) return next(err);
		res.json(todos);
	});
});

router.get('/:id', function(req, res, next) {
	Todo.findById(req.params.id, function(err, get){
		if(err) return next(err);
		res.json(get);
	});
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	Todo.create(req.body, function(err, post){
		if(err) return next(err);
		res.json(post);
	});
	Project.create({'name' : 'foo', 'todo' : '566606c75542aa7a4048c16a'}, function(){

	});
});

router.put('/:id', function(req, res, next){
	Todo.findByIdAndUpdate(req.params.id, req.body, function(err, put){
		if(err) return next(err);
		res.json(put);
	});
});

router.delete('/:id', function(req, res, next){
	Todo.findByIdAndRemove(req.params.id, function(err, del){
		if(err) return next(err);
		res.json(del);
	});
});

module.exports = router;
