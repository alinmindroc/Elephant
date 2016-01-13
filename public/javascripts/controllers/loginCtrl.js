angular.module('taskManagerApp')
.controller('loginCtrl', function ($scope, localStorageService, $rootScope, $location, Users) {
	$rootScope.currentController = 'login';

	if(localStorageService.get('loggedUser') != undefined){
		$location.url('/profile');
	}

	$scope.login = function(){
		var user = {};
		user.username = $scope.username;
		user.password = $scope.password;

		Users.login(user, function(res){
			if(res.error){
				alert(res.error);
			} else {
				localStorageService.set('loggedUser', res);
				$location.url('/profile');
				$rootScope.$emit("setHeaderUser");
			}
		})
	};
});
