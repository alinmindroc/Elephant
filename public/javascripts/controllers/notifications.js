var myApp = angular.module('myApp', []);

myApp.controller('myAppCtrl', function ($scope) {
	$scope.fullName = "Adriana Ene";
	$scope.notNumber = 6;
	$scope.notifications = ['Deadline Task 2 from Project Pizza Shop Online is tomorrow'];
});
