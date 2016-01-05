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
		var task = new Tasks({ name: $scope.taskName, description: $scope.taskDescription, users: ids });

		task.$save(function(){
			$scope.taskName = '';
			$scope.taskDescription = '';

			//add task to project
			Projects.addTask({
				projectId: $scope.project._id,
				taskId: task._id
			}, function(){
				$uibModalInstance.close();
			});

			//add task to users
			var allUsers = $scope.users;

			for(var i in allUsers){
				//if a user id is checked, add the project to that user
				if(allUsers[i].selected == true){
					Users.addTask({
						userId: allUsers[i]._id,
						taskId: task._id
					});
				}
			};
		});
	}
});