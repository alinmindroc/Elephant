angular.module('taskManagerApp')
.controller('loginCtrl', function ($scope, $rootScope, $location) {
	$rootScope.currentController = 'login';

	$scope.login = function(){
		if($scope.username == 'adrianaene' && $scope.password == 'adrianaene'){
			$location.url("/profile");
		}
	}
});
