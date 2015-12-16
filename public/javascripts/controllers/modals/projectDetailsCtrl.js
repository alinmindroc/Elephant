angular.module('taskManagerApp')
.controller('projectDetailsCtrl', function ($scope, $uibModal, $uibModalInstance, Projects, Tasks, Users, CRUD, projectId) {
    $scope.project = {};
    $scope.project.id = projectId;

    $scope.allUsers = Users.query();

    function cleanResponse(resp) {
        return JSON.parse(angular.toJson(resp));
    }

    var project = Projects.get({id: projectId}, function(){
    	$scope.project = project;
    	$scope.project.date = new Date(project.start_date);

        var tasks = Tasks.query({id: project.task}, function(){
            $scope.tasks = tasks;
        })

        //mark users which are assigned (yeah O(n^2))
        var ids = $scope.project.users;
        Users.findMany(ids, function(res){
            $scope.assignedUsers = cleanResponse(res);
            for(var i in $scope.assignedUsers){
                for(var j in $scope.allUsers){
                    if($scope.allUsers[j]._id == $scope.assignedUsers[i]._id){
                        $scope.allUsers[j].selected = true;
                    }
                }
            }
        });
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
        var assignedUsers = $scope.allUsers.filter(function(x){
            return x.selected == true;
        })

        var assignedUserIds = assignedUsers.map(function(x){
            return x._id;
        })
        
        Projects.update(
            {id: projectId},
            {
                name: $scope.project.name,
                status: $scope.project.status,
                start_date: new Date($scope.project.date).toISOString(),
                users: assignedUserIds
            }
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