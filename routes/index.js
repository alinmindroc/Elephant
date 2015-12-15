var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/projects', function(req, res, next){
	res.render('projects');
});

router.get('/profile', function(req, res, next){
	res.render('profile');
});

router.get('/login', function(req, res, next){
	res.render('login');
});

router.get('/signup', function(req, res, next){
	res.render('signup');
});

router.get('/notifications', function(req, res, next){
	res.render('notifications');
});

router.get('/tasks', function(req, res, next){
	res.render('tasks');
});

module.exports = router;
