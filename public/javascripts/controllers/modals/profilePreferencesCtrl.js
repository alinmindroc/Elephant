angular.module('taskManagerApp').controller('profilePreferencesCtrl', function ($scope, $uibModalInstance, preferencesData) {
	$scope.language = preferencesData.language;
	$scope.notifications = preferencesData.notifications;
	$scope.sharing = preferencesData.sharing;

	$scope.cancel = function(){
		$uibModalInstance.dismiss();
	}

	$scope.ok = function(){
		$uibModalInstance.close(
		{
			'language': $scope.language,
			'notifications': $scope.notifications,
			'sharing': $scope.sharing
		}
		);
	}
});