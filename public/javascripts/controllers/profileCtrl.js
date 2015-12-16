angular.module('taskManagerApp')
.controller('profileCtrl', function ($scope, $rootScope, $http, $uibModal, Users, Projects) {
  $rootScope.currentController = 'profile';

  $scope.crtUser = Users.get({id: '56703baed60f96def3880146'}, function(get){
    $scope.crtProjects = Projects.findMany(get.projects);
  });

  $scope.currentProject = "Online Shop Application";

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

  $scope.filter = function(){
    if($scope.filterType == 'all'){
      $scope.showTasks = $scope.tasks;
      return;
    }

    $scope.showTasks = $scope.tasks.filter(function(x){
      return (x.type == $scope.filterType)
    });
  }
});
