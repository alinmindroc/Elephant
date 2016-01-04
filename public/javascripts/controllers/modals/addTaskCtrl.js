angular.module('taskManagerApp')
.controller('addTaskCtrl', function ($scope, $uibModalInstance, Projects, Users, Tasks, CRUD, currentProject) {
	$scope.project = currentProject;

	function cleanResponse(resp) {
		return JSON.parse(angular.toJson(resp));
	}

	var ids = $scope.project.users;
	Users.findMany(ids, function(res){
		$scope.users = cleanResponse(res);
	});

	$scope.cancel = function(){
		$uibModalInstance.dismiss();
	}

	$scope.ok = function(){
		var task = new Tasks({ name: $scope.taskName, description: $scope.taskDescription });

		task.$save(function(){
			$scope.taskName = '';
			$scope.taskDescription = '';

			Projects.addTask({
				projectId: $scope.project._id,
				taskId: task._id
			}, function(){
				$uibModalInstance.close();
			});
		});

		//todo: add task to user
	}
});