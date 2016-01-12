angular.module('taskManagerApp')
.controller('profileCtrl', function ($scope, $rootScope, $http, $uibModal, Users, Tasks, Projects) {
	$rootScope.currentController = 'profile';

	Users.get({id: '56955e3a1f8727630b873a25'}, function(user){
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

	$scope.language = "English";
	$scope.notifications = "On";
	$scope.sharing = "Public";

	$scope.openDetailsModal = function(){
		var modalInstance = $uibModal.open({      
			templateUrl: '/templates/userDetailsModal.html',
			controller: 'profileDetailsCtrl',
			resolve: {
				userData: function(){
					return {
						'username': $scope.crtUser.username,
						'fullName': $scope.crtUser.fullName,
						'email':    $scope.crtUser.email,
						'group':    $scope.crtUser.group
					}
				}
			}
		});

		modalInstance.result.then(function(result){
			$scope.crtUser.username = result.username;
			$scope.crtUser.fullName = result.fullName;
			$scope.crtUser.email = result.email;
			$scope.crtUser.group = result.group;
		});
	}

	$scope.openPreferencesModal = function(){
		var modalInstance = $uibModal.open({      
			templateUrl: '/templates/userPreferencesModal.html',
			controller: 'profilePreferencesCtrl',
			resolve: {
				preferencesData: function(){
					return {
						'language': $scope.language,
						'sharing': $scope.sharing,
					}
				}
			}
		});

		modalInstance.result.then(function(result){
			$scope.language = result.language;
			$scope.sharing = result.sharing;
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
