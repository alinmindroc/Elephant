angular.module('taskManagerApp')
.controller('projectsCtrl', function ($scope, $rootScope, Projects, Users, Tasks, $uibModal) {
	$rootScope.currentController = 'projects';

	$scope.fullName = "Adriana Ene";
	$scope.notNumber = 6;
	$scope.projectStatus = "in progress";

	function cleanResponse(resp) {
		return JSON.parse(angular.toJson(resp));
	}

	function updateProjects(){
		Projects.query(function(res){
			$scope.projects = cleanResponse(res);
			$scope.shownProjects = $scope.projects;

			//set date string from object
			$scope.projects.map(function(i){
				var date = new Date(i.start_date);
				i.start_date = date.toDateString();
			})

			$scope.shownProjects.sort(function(x, y){
				return x.name.localeCompare(y.name)
			});
		});
	}

	updateProjects();

	$scope.filterTableData = function(){
		$scope.shownProjects = $scope.projects.filter(
			function(x){
				var name = x.name.toLowerCase();
				var status = x.status.toLowerCase();
				var filter = $scope.searchFilter.toLowerCase();
				return (name.indexOf(filter) > -1 || status.indexOf(filter) > -1);
			}
			).sort(function(x, y){return y.name.localeCompare(x.name)});
	}

	$scope.delete = function(projectId){
		//remove the project's tasks from each user
		Users.removeTaskTreeFromAllUsers({projectId: projectId});

		//remove the project from each user
		Users.removeProjectFromAllUsers({projectId:projectId});

		//delete the project from the database
		Projects.remove({id: projectId});

		//delete all the project's tasks
		Tasks.removeTaskTree({projectId: projectId});

		updateProjects();
	}

	$scope.searchPressed = function(){
		console.log($scope.search.value);
	};

	$scope.addProject = function(){
		if(!$scope.projectName || $scope.projectName.length < 1) return;
		if(!$scope.projectStatus || $scope.projectStatus.length < 1) return;
		if(!$scope.projectDate) return;

		var project = new Projects({
			name: $scope.projectName,
			status: $scope.projectStatus,
			start_date: new Date($scope.projectDate).toISOString()
		});

		project.$save(function(){
			updateProjects();
			$scope.projectName = '';
			$scope.projectStatus = "in progress";
			$scope.projectDate = '';
		})
	};

	$scope.openProjectModal = function(id){
		var modalInstance = $uibModal.open({      
			templateUrl: '/templates/projectDetailsModal.html',
			controller: 'projectDetailsCtrl',
			resolve: {
				projectId: function(){
					return id;
				}
			}
		});

		modalInstance.result.then(function(){
			updateProjects();
		});
	}
});
