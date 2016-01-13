angular.module('taskManagerApp')
.controller('signupCtrl', function ($scope, $rootScope) {
	$rootScope.currentController = 'signup';	

	$scope.joinPressed = function(){
		if($scope.password != $scope.confirmPassword){
			alert("Password Mismatch!");
		}
		
		else if($scope.firstName == '' || 
			$scope.lastName == '' || $scope.userName == '' || 
			$scope.email == '' || $scope.password == '' || $scope.confirmPassword == ''){
			alert("Please insert all fields!");
	}
}
});
