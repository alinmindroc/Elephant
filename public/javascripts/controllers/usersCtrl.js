angular.module('taskManagerApp')
.controller('usersCtrl', function ($scope, $uibModal, $rootScope, $routeParams, $location, Projects, Tasks, Users) {
	$rootScope.currentController = 'user';

	Users.get({id: $routeParams.userId}, function(user){
		$scope.user = user;

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
});
