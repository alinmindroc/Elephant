'use strict';

angular
.module('taskManagerApp', [
	'ngRoute',
	'ngResource',
	'ngAnimate',
	'ui.bootstrap'
	])

.factory('Projects', ['$resource', function($resource){
	return $resource('/api/projects/:id', {id: '@id'}, {
		'update': { method:'PUT' },
		'removeTask': {
			url: '/api/projects/deleteTask/:id',
			method: 'PUT'
		}
	});
}])

.factory('Tasks', ['$resource', function($resource){
	return $resource('/tasks/:id', {id: '@id'}, {
		'query':  { method:'GET', isArray:true }
	});
}])

.factory('Users', ['$resource', function($resource){
	return $resource('/users/:id', {id: '@id'}, {
		'findMany': {
			url: '/users/findMany/:id',
			method:'GET',
			isArray:true
		},
		'query':  	{ method:'GET', isArray:true },
		'update': 	{ method:'PUT' }
	});
}])

.factory('CRUD', ['Projects', function(Projects){
	return {
		deleteProject: function(id){
			Projects.remove({id: id});
		},
		addTaskToProject: function(projectId, taskId){
			Projects.update({id: projectId}, {task: taskId});
		},
		removeTaskFromProject: function(id){
			Projects.removeTask({id: id});
		} 
	};
}])
.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.
		when('/projects', {templateUrl: 'views/projects.html', controller: 'projectsCtrl'}).
		when('/profile', {templateUrl: 'views/profile.html', controller: 'profileCtrl'}).
		when('/notifications', {templateUrl: 'views/notifications.html', controller: 'notificationsCtrl'}).
		when('/signup', {templateUrl: 'views/signup.html', controller: 'signupCtrl'}).
		when('/login', {templateUrl: 'views/login.html', controller: 'loginCtrl'}).
		when('/tasks', {templateUrl: 'views/tasks.html', controller: 'tasksCtrl'}).
		otherwise({redirectTo: '/profile'});
	}])
.controller('indexCtrl', function($scope, $rootScope){
	$rootScope.currentController = 'login';// hack to make sure header is not drawn for login and signup pages

	$scope.fullName = "Adriana Ene";
	$scope.notificationsNumber = 6;
});