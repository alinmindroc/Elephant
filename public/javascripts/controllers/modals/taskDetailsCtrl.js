angular.module('taskManagerApp')
.controller('taskDetailsCtrl', function ($scope, $uibModal, $uibModalInstance, Tasks, Users, Upload, taskId, userIds) {

    function cleanResponse(resp) {
        return JSON.parse(angular.toJson(resp));
    }

    Users.findMany(userIds, function(res){
        $scope.users = cleanResponse(res);
    });

    var task = Tasks.get({id: taskId}, function(){
        $scope.task = task;
        $scope.task.date = new Date(task.start_date);

        //mark users which are assigned (yeah O(n^2))
        var ids = $scope.task.users;
        Users.findMany(ids, function(res){
            $scope.assignedUsers = cleanResponse(res);
            for(var i in $scope.assignedUsers){
                for(var j in $scope.users){
                    if($scope.users[j]._id == $scope.assignedUsers[i]._id){
                        $scope.users[j].selected = true;
                    }
                }
            }
        });
    });

    // upload on file select or drop
    $scope.upload = function (file) {
        $scope.uploadSuccess = false;
        $scope.uploadFailed = false;
        Upload.upload({
            url: 'tasks/uploadFile/',
            data: {file: file, 'taskId': taskId}
        }).then(function (resp) {
            $scope.uploadSuccess = true;
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            $scope.uploadFailed = true;
            $scope.uploadStatus = resp.status;
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

    $scope.cancel = function(){
    	$uibModalInstance.dismiss();
    }

    $scope.ok = function(){
        var assignedUsers = $scope.users.filter(function(x){
            return x.selected == true;
        })

        var assignedUserIds = assignedUsers.map(function(x){
            return x._id;
        })
        
        //set users to tasks
        Tasks.update(
            {id: taskId},
            {
                name: $scope.task.name,
                status: $scope.task.status,
                description: $scope.task.description,
                start_date: new Date($scope.task.date).toISOString(),
                users: assignedUserIds
            }
            );

        //set tasks to users
        var users = cleanResponse($scope.users);

        for(var i in users){
            //if a user id is checked, add the task to that user; otherwise, delete it
            if(users[i].selected == true){
                Users.addTask({
                    userId: users[i]._id,
                    taskId: taskId
                });
            } else {
                Users.removeTask({
                    userId: users[i]._id,
                    taskId: taskId
                });
            }
        };

        $uibModalInstance.close();
    }
})
