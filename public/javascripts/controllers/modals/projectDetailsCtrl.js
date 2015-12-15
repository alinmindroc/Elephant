angular.module('taskManagerApp')
.controller('projectDetailsCtrl', function ($scope, $uibModal, $uibModalInstance, Projects, Tasks, CRUD, projectId) {
    $scope.project = {};
    $scope.project.id = projectId;

    var project = Projects.get({id: projectId}, function(){
    	$scope.project = project;
    	$scope.project.date = new Date(project.start_date);

        var tasks = Tasks.query({id: project.task}, function(){
            $scope.tasks = tasks;
            console.log(tasks);
        })
    });

    $scope.cancel = function(){
    	$uibModalInstance.dismiss();
    }

    $scope.openTaskModal = function(){
        var modalInstance = $uibModal.open({      
            templateUrl: '/templates/addTaskModal.html',
            controller: 'addTaskCtrl',
            size: 'sm',
            resolve : {
                currentProject: function(){
                    return $scope.project;
                }
            }
        })
    };

    $scope.ok = function(){
        Projects.update(
            {id: projectId},
            {name: $scope.project.name, status: $scope.project.status, start_date: new Date($scope.project.date).toISOString()}
            );
        $uibModalInstance.close();
    }
})

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when('/:id/tasks/', {
    templateUrl: '../Tasks/tasks.html',
    controller: '../Tasks/tasks.js'
  });
}]);