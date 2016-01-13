angular.module('taskManagerApp')
.controller('profileCtrl', function ($scope, $rootScope, $http, $uibModal, Users, Tasks, Projects) {
	$rootScope.currentController = 'profile';

	function updateData(){
		Users.get({id: '5696136d1b047ebe607b5a1b'}, function(user){
			$scope.crtUser = user;

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

	updateData();

	$scope.openDetailsModal = function(){
		var modalInstance = $uibModal.open({      
			templateUrl: '/templates/userDetailsModal.html',
			controller: 'profileDetailsCtrl',
			resolve: {
				userData: function(){
					return angular.copy($scope.crtUser);
				}
			}
		});

		modalInstance.result.then(function(result){
			updateData();
		});
	}

	$scope.filterTasks = function(status){
		if(status == 'all'){
			$scope.filteredTasks = $scope.tasks;
			return;
		}
		$scope.filteredTasks = $scope.tasks.filter(function(x){
			return x.status.localeCompare(status) == 0;
		});
	}
});
