angular.module('taskManagerApp')
.controller('profileCtrl', function ($scope, $rootScope, $http, $uibModal, $location, Users, Tasks, Projects) {
	$rootScope.currentController = 'profile';

	console.log($rootScope.loggedUser);
	if($rootScope.loggedUser === undefined || $rootScope.loggedUser._id === undefined){
		$location.url('/login');
	};

	function updateData(cacheBuster){
		Users.get({id: $rootScope.loggedUser._id}, function(user){
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
	};

	updateData();

	$scope.openDetailsModal = function(){
		var modalInstance = $uibModal.open({      
			templateUrl: '/templates/profileDetailsModal.html',
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
