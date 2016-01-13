angular.module('taskManagerApp')
.controller('loginCtrl', function ($scope, $rootScope, $location, Users) {
	$rootScope.currentController = 'login';

	$scope.login = function(){
		var user = {};
		user.username = $scope.username;
		user.password = $scope.password;

		Users.login(user, function(res){
			if(res.error){
				alert(res.error);
			} else {
				//simulate logged user
				$rootScope.loggedUser = res;
				$location.url("/profile");
			}
		})
	};
});
