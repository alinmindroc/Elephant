'use strict';

angular
.module('taskManagerApp', [
	'ngRoute',
	'ngResource',
	'ngAnimate',
	'ui.bootstrap'
	])
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