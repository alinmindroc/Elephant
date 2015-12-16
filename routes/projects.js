var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Project = require('../models/Project.js');

router.get('/', function(req, res) {
	Project.find(function(err, projects){
		if(err) return next(err);
		res.json(projects);
	});
});

router.get('/findMany', function(req, res){
	var ids = []

	for(key in req.query){
		ids.push(req.query[key]);
	}

	console.log(ids);

	Project.find({
		'_id': { $in: ids }
	}, function(err, users){
		if(err) return next(err);
		res.json(users);
	});
});

router.get('/:id', function(req, res, next) {
	Project.findById(req.params.id, function(err, get){
		if(err) return next(err);
		res.json(get);
	});
});

router.post('/', function(req, res, next) {
	Project.create(req.body, function(err, post){
		console.log(req.body);
		if(err) return next(err);
		res.json(post);
	});
});

router.put('/:id', function(req, res, next){
	Project.findByIdAndUpdate(req.params.id, req.body, function(err, put){
		if(err) return next(err);
		res.json(put);
	});
});

router.put('/deleteTask/:id', function(req, res, next){
	Project.update({_id: req.params.id}, {$unset: {task: ''}}, function(err, put){
		if(err) return next(err);
		res.json(put);
	})
})

router.delete('/:id', function(req, res, next){
	Project.findByIdAndRemove(req.params.id, function(err, del){
		if(err) return next(err);
		res.json(del);
	});
});

module.exports = router;
