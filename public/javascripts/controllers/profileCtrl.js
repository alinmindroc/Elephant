angular.module('taskManagerApp')
.controller('profileCtrl', function ($scope, $rootScope, $http, $uibModal, Users, Tasks, Projects) {
  $rootScope.currentController = 'profile';

  $scope.crtUser = Users.get({id: '568c455545c7d4dc4277bbb6'}, function(user){
    $scope.crtProjects = Projects.findMany(user.projects);
    $scope.crtTasks = Tasks.findMany(user.tasks);
  });

  $scope.currentProject = "Online Shop Application";

  $scope.language = "English";
  $scope.notifications = "On";
  $scope.sharing = "Public";

  $scope.showFilters = false;

  $scope.openDetailsModal = function(){
    var modalInstance = $uibModal.open({      
      templateUrl: '/templates/userDetailsModal.html',
      controller: 'profileDetailsCtrl',
      resolve: {
        userData: function(){
          return {
            'username': $scope.crtUser.username,
            'fullName': $scope.crtUser.fullName,
            'email':    $scope.crtUser.email,
            'group':    $scope.crtUser.group
          }
        }
      }
    });

    modalInstance.result.then(function(result){
      $scope.crtUser.username = result.username;
      $scope.crtUser.fullName = result.fullName;
      $scope.crtUser.email = result.email;
      $scope.crtUser.group = result.group;
    });
  }

  $scope.openPreferencesModal = function(){
    var modalInstance = $uibModal.open({      
      templateUrl: '/templates/userPreferencesModal.html',
      controller: 'profilePreferencesCtrl',
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
});
