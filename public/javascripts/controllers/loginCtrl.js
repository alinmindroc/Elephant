angular.module('taskManagerApp')
.controller('loginCtrl', function ($scope, $rootScope) {
	$rootScope.currentController = 'login';	
	$scope.loginPressesd = function(){
		if($scope.username == '' || $scope.password == '')
			alert("Please insert all the credentials!");
	}
});
