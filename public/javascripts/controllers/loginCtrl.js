angular.module('taskManagerApp')
.controller('loginCtrl', function ($scope, localStorageService, $rootScope, $location, Users) {
	$rootScope.currentController = 'login';

	if(localStorageService.get('loggedUser') != undefined){
		$location.url('/profile');
	}

	$scope.alerts = [];

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.login = function(){
		if(!$scope.username || !$scope.password){
			$scope.alerts.push({ type: 'danger', msg: 'Please fill all fields' });
			return;
		}

		var user = {};
		user.username = $scope.username;
		user.password = $scope.password;

		Users.login(user, function(res){
			if(res.error){
				$scope.alerts.push({ type: 'danger', msg: res.error });
			} else {
				localStorageService.set('loggedUser', res);
				$location.url('/profile');
				$rootScope.$emit("setHeaderUser");
			}
		})
	};
});
