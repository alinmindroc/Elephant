angular.module('taskManagerApp')
.controller('usersCtrl', function ($scope, $uibModal, $rootScope, $routeParams, $location, Projects, Tasks, Users) {
	$rootScope.currentController = 'user';

	function cleanResponse(resp) {
		return JSON.parse(angular.toJson(resp));
	}

	Users.query(function(res){
		$scope.allUsers = cleanResponse(res);
		$scope.filteredUsers = $scope.allUsers;
	});

	if($routeParams.userId){
		Users.get({id: $routeParams.userId}, function(user){
			$scope.selectedUser = user;

			Projects.findMany(user.projects, function(projects){
				$scope.crtProjects = projects;
				//mapping from project id to project name to use in tasks table
				$scope.projectMap = {};
				for(var i in projects){
					$scope.projectMap[projects[i]._id] = projects[i].name;
				}
			});

			$scope.tasks = Tasks.findMany(user.tasks);
			$scope.filteredTasks = $scope.tasks;
		});
	}

	$scope.filterUsers = function(filter){
		if(!filter || filter.length == 0){
			$scope.filteredUsers = $scope.allUsers;
			return;
		}

		filter = filter.toLowerCase();
		$scope.filteredUsers = $scope.allUsers.filter(function(x){
			var fullName = x.fullName.toLowerCase();
			var userName = x.username.toLowerCase();
			return fullName.indexOf(filter) != -1 || userName.indexOf(filter) != -1;
		})
	};

	$scope.filterTasks = function(status){
		if(status == 'all'){
			$scope.filteredTasks = $scope.tasks;
			return;
		}
		$scope.filteredTasks = $scope.tasks.filter(function(x){
			return x.status.localeCompare(status) == 0;
		});
	};
});
