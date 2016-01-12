angular.module('taskManagerApp').controller('profileDetailsCtrl', function ($scope, $uibModalInstance, Users, userData) {
	$scope.userData = userData;

	$scope.cancel = function(){
		$uibModalInstance.dismiss();
	}

	$scope.ok = function(){
		Users.update(
			{id: userData._id},
			{
				username: $scope.userData.username,
				fullName: $scope.userData.fullName,
				email: $scope.userData.email,
				group: $scope.userData.group
			}
			);
		$uibModalInstance.close();
	}
});