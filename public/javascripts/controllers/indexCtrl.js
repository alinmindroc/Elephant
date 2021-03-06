'use strict';

angular
.module('taskManagerApp', [
	'ngRoute',
	'ngResource',
	'ngAnimate',
	'ui.bootstrap',
	'treeControl',
	'ngFileUpload',
	'LocalStorageModule'
	])

.factory('Projects', ['$resource', function($resource){
	return $resource('/projects/:id', {id: '@id'}, {
		'update': { method:'PUT' },
		'findMany': {
			url: '/projects/findMany/:id',
			method: 'GET',
			isArray: true
		},
		'addTask': {
			url: '/projects/addTask/:projectId/:taskId',
			method: 'POST',
			params: {
				projectId: '@projectId',
				taskId: '@taskId'
			}
		},
		'removeTask': {
			url: '/projects/removeTask/:projectId/:taskId',
			method: 'DELETE',
			params: {
				projectId: '@projectId',
				taskId: '@taskId'
			}
		}
	});
}])

.factory('Tasks', ['$resource', function($resource){
	return $resource('/tasks/:id', {id: '@id'}, {
		'query':  { method:'GET', isArray:true },
		'update': { method:'PUT' },
		'findMany': {
			url: '/tasks/findMany/:id',
			method: 'GET',
			isArray: true
		},
		'addSubTask': {
			url: '/tasks/addSubTask/:taskId/:subTaskId',
			method: 'POST',
			params: {
				taskId: '@taskId',
				subTaskId: '@subTaskId'
			}
		},
		'removeSubTask': {
			url: '/tasks/removeSubTask/:taskId/:subTaskId',
			method: 'DELETE',
			params: {
				taskId: '@taskId',
				subTaskId: '@subTaskId'
			}
		},
		'removeTaskTree': {
			url: '/tasks/removeTaskTree/:projectId',
			method: 'delete',
			params: {
				projectId: '@projectId',
			}
		},
		'getTree': {
			url: '/tasks/getTree/:projectId',
			method: 'GET',
			isArray: true
		}
	});
}])

.factory('Users', ['$resource', function($resource){
	return $resource('/users/:id', {id: '@id'}, {
		'signup': {
			url: '/users/signup',
			method: 'POST'
		},
		'login': {
			url: '/users/login',
			method: 'POST'
		},
		'findMany': {
			url: '/users/findMany/:id',
			method: 'GET',
			isArray: true
		},
		'query':  	{ method:'GET', isArray:true },
		'update': 	{ method:'PUT' },
		'uploadPhoto': {
			url: '/uploadPhoto',
			method: 'POST',
		},
		'addProject': {
			url: '/users/addProjectToSet/:userId/:projectId',
			method: 'POST',
			params: {
				userId: '@userId',
				projectId: '@projectId'
			}
		},
		'removeProject': {
			url: '/users/removeProject/:userId/:projectId',
			method: 'delete',
			params: {
				userId: '@userId',
				projectId: '@projectId'
			}
		},
		'addTask': {
			url: '/users/addTaskToSet/:userId/:taskId',
			method: 'POST',
			params: {
				userId: '@userId',
				taskId: '@taskId'
			}
		},
		'removeTask': {
			url: '/users/removeTask/:userId/:taskId',
			method: 'delete',
			params: {
				userId: '@userId',
				taskId: '@taskId'
			}
		},
		'removeProjectTaskTreeFromAllUsers': {
			url: '/users/removeProjectTaskTreeFromAllUsers/:projectId',
			method: 'delete',
			params: {
				projectId: '@projectId',
			}
		},
		'removeTaskTreeFromAllUsers': {
			url: '/users/removeTaskTreeFromAllUsers/:rootTaskId',
			method: 'delete',
			params: {
				rootTaskId: '@rootTaskId',
			}
		},
		'removeProjectFromAllUsers': {
			url: '/users/removeProjectFromAllUsers/:projectId',
			method: 'delete',
			params: {
				projectId: '@projectId'
			}
		}
	});
}])

.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.
		when('/projects', {templateUrl: 'views/projects.html', controller: 'projectsCtrl'}).
		when('/profile', {templateUrl: 'views/profile.html', controller: 'profileCtrl'}).
		when('/notifications', {templateUrl: 'views/notifications.html', controller: 'notificationsCtrl'}).
		when('/signup', {templateUrl: 'views/signup.html', controller: 'signupCtrl'}).
		when('/login', {templateUrl: 'views/login.html', controller: 'loginCtrl'}).
		when('/users', {templateUrl: 'views/user.html', controller: 'usersCtrl'}).
		when('/users/:userId', {templateUrl: 'views/user.html', controller: 'usersCtrl'}).
		
		when('/tasks/:projectId', {templateUrl: 'views/tasks.html', controller: 'tasksCtrl'}).
		when('/tasks/:projectId/:taskId', {templateUrl: 'views/tasks.html', controller: 'tasksCtrl'}).
		otherwise({redirectTo: '/login'});
	}])
.controller('indexCtrl', function($scope, $rootScope, $location, localStorageService){
	$rootScope.currentController = 'login';// hack to make sure header is not drawn for login and signup pages
	
	function getLoggedUser(imagePath){
		$scope.loggedUser = localStorageService.get('loggedUser');
		if(imagePath){
			$scope.loggedUser.picturePath = imagePath;
		}
	};

	$rootScope.$on("setHeaderUser", function(event, imagePath){
		getLoggedUser(imagePath);
	});

	getLoggedUser();

	$scope.logOut = function(){
		localStorageService.remove('loggedUser');
		$location.url('/login');
	};
});