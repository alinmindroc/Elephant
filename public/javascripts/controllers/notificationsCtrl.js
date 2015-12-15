angular.module('taskManagerApp')
.controller('notificationsCtrl', function ($scope, $rootScope) {
	$rootScope.currentController = 'notifications';

	$scope.fullName = "Adriana Ene";
	$scope.notNumber = 6;
	$scope.notifications = ['Deadline Task 2 from Project Pizza Shop Online is tomorrow'];
});
