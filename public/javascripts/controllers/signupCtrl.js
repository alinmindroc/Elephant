angular.module('taskManagerApp')
.controller('signupCtrl', function ($scope, $rootScope, Users, $location) {
	$rootScope.currentController = 'signup';	

	$scope.signup = function(){
		if($scope.fullName == '' || $scope.username == '' || $scope.email == ''
			|| $scope.password == '' || $scope.confirmPassword == ''
			|| !$scope.fullName || !$scope.username || !$scope.email
			|| !$scope.password || !$scope.confirmPassword){
			alert("Please complete all fields!");
			return;
		}

		if($scope.password != $scope.confirmPassword){
			alert("Password Mismatch!");
			return;
		}

		var newUser = {};
		newUser.fullName = $scope.fullName;
		newUser.username = $scope.username;
		newUser.email = $scope.email;
		newUser.password = $scope.password;

		Users.signup(newUser, function(res){
			if(res.error){
				alert(res.error);
			} else {
				//simulate logged user
				$rootScope.loggedUser = res;
				$location.url("/profile");
			}
		});
	}
});
