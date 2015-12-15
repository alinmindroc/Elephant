angular.module('taskManagerApp')
.controller('addTaskCtrl', function ($scope, $uibModalInstance, Projects, Tasks, CRUD, currentProject) {
	var project = currentProject;

	$scope.cancel = function(){
		$uibModalInstance.dismiss();
	}

	$scope.ok = function(){
		$uibModalInstance.close();

		var task = new Tasks({ name: $scope.taskName, description: $scope.taskDescription });

		task.$save(function(){
			$scope.taskName = '';
			$scope.taskDescription = '';

			Projects.update(
				{id: project.id},
				{tasks: task._id}, function(){
					$uibModalInstance.close();
				})
		});
	}
});