angular.module('taskManagerApp').controller('profileDetailsCtrl', function ($scope, $uibModalInstance, Users, Upload, userData) {
	$scope.userData = userData;

	// upload on file select or drop
	$scope.upload = function (file) {
		$scope.uploadSuccess = false;
		$scope.uploadFailed = false;
		Upload.upload({
			url: 'users/uploadPhoto/',
			data: {file: file, 'userId': $scope.userData._id}
		}).then(function (resp) {
			$scope.uploadSuccess = true;
			console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
		}, function (resp) {
			$scope.uploadFailed = true;
			$scope.uploadStatus = resp.status;
			console.log('Error status: ' + resp.status);
		}, function (evt) {
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		});
	};

	$scope.cancel = function(){
		$uibModalInstance.dismiss();
	}

	$scope.ok = function(){
		Users.update(
			{id: userData._id},
			{
				fullName: $scope.userData.fullName,
				email: $scope.userData.email,
				group: $scope.userData.group
			}
			);
		$uibModalInstance.close();
	}
});