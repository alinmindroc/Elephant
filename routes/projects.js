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

	Project.find({
		'_id': { $in: ids }
	}, function(err, projects){
		if(err) return next(err);
		res.json(projects);
	});
});

router.get('/:id', function(req, res, next) {
	Project.findById(req.params.id, function(err, get){
		if(err) return next(err);
		res.json(get);
	});
});

router.post('/addTask/:projectId/:taskId', function(req, res, next){
	Project.findByIdAndUpdate(
		{_id: req.params.projectId},
		{$push: {tasks: req.params.taskId}},
		{safe: true, upsert: true},
		function(err, post) {
			if(err) return next(err);
			res.json(post);
		}
		);
});

router.post('/', function(req, res, next) {
	Project.create(req.body, function(err, post){
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

router.delete('/removeTask/:projectId/:taskId', function(req, res, next){
	Project.findByIdAndUpdate(
		{_id: req.params.projectId},
		{$pull: {tasks: req.params.taskId}},
		{safe: true, upsert: true},
		function(err, del) {
			if(err) return next(err);
			res.json(del);
		}
		);
})

router.delete('/:id', function(req, res, next){
	Project.findByIdAndRemove(req.params.id, function(err, del){
		if(err) return next(err);
		res.json(del);
	});
});

module.exports = router;
