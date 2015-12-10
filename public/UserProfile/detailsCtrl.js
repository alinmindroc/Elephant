angular.module('myApp').controller('detailsCtrl', function ($scope, $uibModalInstance, userData) {
	$scope.email = userData.email;
	$scope.username = userData.username;
	$scope.fullName = userData.fullName;
	$scope.group = userData.group;

	$scope.cancel = function(){
		$uibModalInstance.dismiss();
	}

	$scope.ok = function(){
		$uibModalInstance.close(
		{
			'username': $scope.username,
			'fullName': $scope.fullName,
			'email': $scope.email,
			'group': $scope.group
		}
		);
	}
});