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

//the horror
router.get('/getTree/:projectId', function(req, res){
	//puts the traversed nodes in the children array and calls the callback function when reaches a leaf
	function dfs(nodeId, children, callback){
		Task.findById(nodeId, function(err, task){
			Task.find({
				'_id': { $in: task.subTasks }
			}).lean().exec(function(err, subTasks){
				//a leaf has been reached
				if(subTasks.length == 0)
					callback();

				for(var i in subTasks){
					children.push(subTasks[i]);
					subTasks[i].children = [];

					dfs(subTasks[i]._id, subTasks[i].children, callback);
				}
			});
		});
	}

	//first, find the array of root tasks
	//then, for each root task, call dfs until all the leaves have been visited
	Project.findById(req.params.projectId, function(err, proj){
		if(err) return next(err);
		Task.find({
			'_id': { $in: proj.tasks }
		}).lean().exec(function(err, rootTasks){
			
			Task.find({
				'project': req.params.projectId,
				'subTasks': {$exists: true, $size: 0}
			}, function(err, leaves){

				var leafsLeft = leaves.length;
				function ready(){
					leafsLeft--;
					if(leafsLeft == 0){
						res.send(rootTasks);
					}
				}

				for(var i in rootTasks){
					rootTasks[i].children = [];
					dfs(rootTasks[i]._id, rootTasks[i].children, ready);
				}
			});
		});
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
