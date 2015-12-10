var myApp = angular.module('myApp', []);

myApp.controller('myAppCtrl', function ($scope) {
  $scope.loginPressesd = function(){
    if($scope.username == '' || $scope.password == '')
    	alert("Please insert all the credentials!");
  }
});
