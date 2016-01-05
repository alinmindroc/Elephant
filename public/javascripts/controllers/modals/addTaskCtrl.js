angular.module('taskManagerApp')
.controller('addTaskCtrl', function ($scope, $uibModalInstance, Projects, Users, Tasks, CRUD, parent, parentType) {
	$scope.parent = parent;
	$scope.parentType = parentType;

	function cleanResponse(resp) {
		return JSON.parse(angular.toJson(resp));
	}

	var userIds = $scope.parent.users;
	Users.findMany(userIds, function(res){
		$scope.users = cleanResponse(res);
	});

	$scope.cancel = function(){
		$uibModalInstance.dismiss();
	}

	function addTaskToProject(taskId){
		//add task to project
		Projects.addTask({
			projectId: $scope.parent._id,
			taskId: taskId
		}, function(){
			$uibModalInstance.close();
		});
	}

	function addSubTaskToTask(){

	}

	$scope.ok = function(){
		var selectedUserIds = $scope.users
		.filter(function(x){return x.selected == true})
		.map(function(y){return y._id});

		var task = new Tasks({
			name: $scope.taskName,
			description: $scope.taskDescription,
			users: selectedUserIds
		});

		task.$save(function(){
			$scope.taskName = '';
			$scope.taskDescription = '';

			if($scope.parentType == "project"){
				addTaskToProject(task._id);
			} else if ($scope.parentType == "task"){
				addSubTaskToTask(task._id);
			}

			//add task to users
			var allUsers = $scope.users;

			for(var i in allUsers){
				//if a user id is checked, add the task to that user
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