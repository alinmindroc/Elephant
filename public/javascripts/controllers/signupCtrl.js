angular.module('taskManagerApp')
.controller('signupCtrl', function ($scope, $rootScope, localStorageService, Users, $location) {
	$rootScope.currentController = 'signup';	

	$scope.alerts = [];

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.signup = function(){
		if($scope.fullName == '' || $scope.username == '' || $scope.email == ''
			|| $scope.password == '' || $scope.confirmPassword == ''
			|| !$scope.fullName || !$scope.username || !$scope.email
			|| !$scope.password || !$scope.confirmPassword){
			$scope.alerts.push({ type: 'danger', msg: 'Please fill all fields' });
		return;
	}

	if($scope.password != $scope.confirmPassword){
		$scope.alerts.push({ type: 'danger', msg: 'Password mismatch!' });
		return;
	}

	var newUser = {};
	newUser.fullName = $scope.fullName;
	newUser.username = $scope.username;
	newUser.email = $scope.email;
	newUser.password = $scope.password;

	Users.signup(newUser, function(res){
		if(res.error){
			$scope.alerts.push({ type: 'danger', msg: res.error });
		} else {
			localStorageService.set('loggedUser', res);
			$location.url('/profile');
			$rootScope.$emit("setHeaderUser");
		}
	});
}
});
