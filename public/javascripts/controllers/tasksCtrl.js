angular.module('taskManagerApp')
.controller('tasksCtrl', function ($scope, $uibModal, $rootScope, $routeParams, Projects, Tasks) {

  $rootScope.currentController = 'tasks';

  function updateTasks(){
    var project = Projects.get({id: $routeParams.id}, function(){
      $scope.project = project;
      $scope.project.date = new Date(project.start_date);

      Tasks.findMany(project.tasks, function(tasks){
        $scope.tasks = tasks;
        $scope.dataForTheTree = tasks;
      });
    });
  };

  updateTasks();

  $scope.addTask = function(){
    var modalInstance = $uibModal.open({      
      templateUrl: '/templates/addTaskModal.html',
      controller: 'addTaskCtrl',
      size: 'sm',
      resolve : {
        currentProject: function(){
          return $scope.project;
        }
      }
    });

    modalInstance.result.then(function(){
      updateTasks();
    });
  };


  $scope.treeOptions = {
    nodeChildren: "children",
    dirSelectable: true,
    injectClasses: {
      ul: "a1",
      li: "a2",
      liSelected: "a7",
      iExpanded: "a3",
      iCollapsed: "a4",
      iLeaf: "a5",
      label: "a6",
      labelSelected: "a8"
    }
  }
/*
  $scope.dataForTheTree =
  [
  { "name" : "Joe", "age" : "21", "children" : [
  { "name" : "Smith", "age" : "42", "children" : [] },
  { "name" : "Gary", "age" : "21", "children" : [
  { "name" : "Jenifer", "age" : "23", "children" : [
  { "name" : "Dani", "age" : "32", "children" : [] },
  { "name" : "Max", "age" : "34", "children" : [] }
  ]}
  ]}
  ]},
  { "name" : "Albert", "age" : "33", "children" : [] },
  { "name" : "Ron", "age" : "29", "children" : [] }
  ];
  */

  $scope.fullName = "Adriana Ene";
  $scope.notNumber = 6;
  $scope.search = {value : ''};
  $scope.notifications = [{ value : 'Deadline Task 2 from Project Pizza Shop Online is tomorrow'}
  ];

});
