var myApp = angular.module('myApp', ['ngAnimate', 'ui.bootstrap']);

myApp.controller('myAppCtrl', function ($scope, $http, $uibModal) {

  $scope.notNumber = 6;

  $scope.username = "adriaene";
  $scope.fullName = "Adriana Ene";
  $scope.email = "adriana.ene93@gmail.com";
  $scope.group = "Front-End";
  
  $scope.language = "English";
  $scope.notifications = "On";
  $scope.sharing = "Public";

  $scope.showFilters = false;

  $scope.tasks = [{ type : 'bug', value : 'Data transfer not working'}, 
  { type : 'feature', value : 'Search Filter does not work when used above'},
  { type : 'bug', value : 'There is a spelling error on the products page'},
  { type : 'build', value : 'Source Build for 4.0 is broken'},
  { type : 'bug', value : 'Startup fails on Web Logic 10.3 with error'}];

  $scope.showTasks = $scope.tasks;

  $scope.openDetailsModal = function(){
    var modalInstance = $uibModal.open({      
      templateUrl: 'detailsModal.html',
      controller: 'detailsCtrl',
      resolve: {
        userData: function(){
          return {
            'username': $scope.username,
            'fullName': $scope.fullName,
            'email':    $scope.email,
            'group':    $scope.group
          }
        }
      }
    });

    modalInstance.result.then(function(result){
      $scope.username = result.username;
      $scope.fullName = result.fullName;
      $scope.email = result.email;
      $scope.group = result.group;
    });
  }

  $scope.openPreferencesModal = function(){
    var modalInstance = $uibModal.open({      
      templateUrl: 'preferencesModal.html',
      controller: 'preferencesCtrl',
      resolve: {
        preferencesData: function(){
          return {
            'language': $scope.language,
            'notifications': $scope.notifications,
            'sharing': $scope.sharing,
          }
        }
      }
    });

    modalInstance.result.then(function(result){
      $scope.language = result.language;
      $scope.notifications = result.notifications;
      $scope.sharing = result.sharing;
    });
  }

  $scope.filter = function(){
    $scope.showTasks = $scope.tasks.filter(function(x){
      return (x.type == $scope.filterType)
    });
  }
});
