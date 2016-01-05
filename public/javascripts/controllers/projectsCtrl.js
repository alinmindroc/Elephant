angular.module('taskManagerApp')
.controller('projectsCtrl', ['$scope', '$rootScope', 'Projects', 'Users', 'CRUD', '$uibModal', function ($scope, $rootScope, Projects, Users, CRUD, $uibModal) {
  $rootScope.currentController = 'projects';

  $scope.fullName = "Adriana Ene";
  $scope.notNumber = 6;
  $scope.projectStatus = "in progress";

  function updateProjects(){
    $scope.projects = Projects.query(function(){
      $scope.projects.map(function(i){
        var date = new Date(i.start_date);
        i.start_date = date.toDateString();
      })
    });
    $scope.shownProjects = $scope.projects;
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
      )
  }

  $scope.delete = function(id){
    //delete the project from the database
    CRUD.deleteProject(id);
    //delete the project from each user
    Users.removeProjectFromAllUsers({projectId:id});
    //TODO: remove the project's tasks from each user
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
}]);
