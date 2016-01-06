angular.module('taskManagerApp')
.controller('projectDetailsCtrl', function ($scope, $uibModal, $uibModalInstance, Projects, Tasks, Users, projectId) {
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

    $scope.ok = function(){
        var assignedUsers = $scope.allUsers.filter(function(x){
            return x.selected == true;
        })

        var assignedUserIds = assignedUsers.map(function(x){
            return x._id;
        })
        
        //set users to projects
        Projects.update(
            {id: projectId},
            {
                name: $scope.project.name,
                status: $scope.project.status,
                start_date: new Date($scope.project.date).toISOString(),
                users: assignedUserIds
            }
            );

        //set projects to users
        var allUsers = cleanResponse($scope.allUsers);

        for(var i in allUsers){
            //if a user id is checked, add the project to that user; otherwise, delete it
            if(allUsers[i].selected == true){
                Users.addProject({
                    userId: allUsers[i]._id,
                    projectId: projectId
                });
            } else {
                Users.removeProject({
                    userId: allUsers[i]._id,
                    projectId: projectId
                });
            }
        };

        $uibModalInstance.close();
    }
})
