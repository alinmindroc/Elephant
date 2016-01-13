angular.module('taskManagerApp')
.controller('profileCtrl', function ($scope, $rootScope, $http, $uibModal, Users, Tasks, Projects) {
	$rootScope.currentController = 'profile';

	function updateData(cacheBuster){
		Users.get({id: '569621a02a29e2c92db82628'}, function(user){
			$scope.crtUser = user;
			if(cacheBuster)
				$scope.crtUser.picturePath += cacheBuster;

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
			//cache bust for the profile picture
			updateData("?" + new Date().getTime());
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
