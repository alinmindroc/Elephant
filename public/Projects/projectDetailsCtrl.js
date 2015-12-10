angular.module('myApp')
.controller('projectDetailsCtrl', function ($scope, $uibModalInstance, Projects, CRUD, projectId) {
    var project = Projects.get({id: projectId}, function(){
    	$scope.projectName = project.name;
    	$scope.projectStatus = project.status;
    	$scope.projectDate = new Date(project.start_date);
    });

    $scope.cancel = function(){
    	$uibModalInstance.dismiss();
    }

    $scope.ok = function(){
    	Projects.update(
    		{id: projectId},
    		{name: $scope.projectName, status: $scope.projectStatus, start_date: new Date($scope.projectDate).toISOString()}
    	);
    	$uibModalInstance.close();
    }
});