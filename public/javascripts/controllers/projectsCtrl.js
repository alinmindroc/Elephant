angular.module('taskManagerApp')
.controller('projectsCtrl', function ($scope, $rootScope, Projects, Users, Tasks, $uibModal) {
	$rootScope.currentController = 'projects';

	$scope.projectStatus = "in progress";
	$scope.sortField = "name";
	$scope.sortAsc = true;

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
				i.start_date = date;
				i.dateString = date.toDateString();
			})

			$scope.shownProjects.sort(function(x, y){
				return x.name.localeCompare(y.name);
			});
			
			$scope.sortField = "name";
			$scope.sortAsc = true;
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
			);
	}

	$scope.sortBy = function(field){
		$scope.sortAsc = !$scope.sortAsc;
		$scope.sortField = field;
		switch(field){
			case "name":{
				$scope.shownProjects.sort(function(x, y){
					if($scope.sortAsc)
						return x.name.localeCompare(y.name);
					else
						return y.name.localeCompare(x.name);
				});
				break;
			}
			case "status":{
				$scope.shownProjects.sort(function(x, y){
					if($scope.sortAsc)
						return x.status.localeCompare(y.status);
					else
						return y.status.localeCompare(x.status);
				});
				break;
			}
			case "date":{
				$scope.shownProjects.sort(function(x, y){
					if($scope.sortAsc)
						return x.start_date > y.start_date;
					else
						return y.start_date > x.start_date;
				});
			}
		}
	}

	$scope.delete = function(projectId){
		//remove the project's tasks from each user
		Users.removeProjectTaskTreeFromAllUsers({projectId: projectId});

		//remove the project from each user
		Users.removeProjectFromAllUsers({projectId:projectId});

		//delete the project from the database
		Projects.remove({id: projectId});

		//delete all the project's tasks
		Tasks.removeTaskTree({projectId: projectId});

		updateProjects();
	}

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
