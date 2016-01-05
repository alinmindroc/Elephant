var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Task = require('../models/Task.js');
var Project = require('../models/Project.js');

router.get('/', function(req, res, next) {
	Task.find(function(err, tasks){
		if(err) return next(err);
		res.json(tasks);
	});
});

function dfs(nodeId, children, callback){
	Task.findById(nodeId, function(err, task){
		Task.find({
			'_id': { $in: task.subTasks }
		}).lean().exec(function(err, tasks){
			if(tasks.length == 0)
				callback();
			for(var i in tasks){
				children.push(tasks[i]);
				tasks[i].children = [];
				dfs(tasks[i]._id, tasks[i].children, callback);
			}
		});
	});
}

router.get('/getTree/:projectId', function(req, res){
	//get the root tasks of the tree
	Project.findById(req.params.projectId, function(err, proj){
		if(err) return next(err);
		Task.find({
			'_id': { $in: proj.tasks }
		}).lean().exec(function(err, tasks){
			if(err) return next(err);

			var rootsLeft = tasks.length;
			function ready(){
				rootsLeft--;
				if(rootsLeft == 0)
					res.send(tasks);
			}

			for(var i in tasks){
				tasks[i].children = [];
				dfs(tasks[i]._id, tasks[i].children, ready);
			}
		});
	});


});

router.get('/findMany', function(req, res){
	var ids = []

	for(key in req.query){
		ids.push(req.query[key]);
	}

	Task.find({
		'_id': { $in: ids }
	}, function(err, tasks){
		if(err) return next(err);
		res.json(tasks);
	});
});

router.get('/:id', function(req, res, next) {
	Task.findById(req.params.id, function(err, get){
		if(err) return next(err);
		res.json(get);
	});
});

router.post('/addSubTask/:taskId/:subTaskId', function(req, res, next){
	Task.findByIdAndUpdate(
		{_id: req.params.taskId},
		{$push: {subTasks: req.params.subTaskId}},
		{safe: true, upsert: true},
		function(err, post) {
			if(err) return next(err);
			res.json(post);
		}
		);
});

router.post('/', function(req, res, next) {
	Task.create(req.body, function(err, post){
		if(err) return next(err);
		res.json(post);
	});
});

router.put('/:id', function(req, res, next){
	Task.findByIdAndUpdate(req.params.id, req.body, function(err, put){
		if(err) return next(err);
		res.json(put);
	});
});

router.delete('/:id', function(req, res, next){
	Task.findByIdAndRemove(req.params.id, function(err, del){
		if(err) return next(err);
		res.json(del);
	});
});

module.exports = router;
