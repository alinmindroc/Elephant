angular.module('taskManagerApp')
.controller('tasksCtrl', function ($scope, $uibModal, $rootScope, $routeParams, Projects, Tasks) {

	$rootScope.currentController = 'tasks';

	function updateTasks(){
		var project = Projects.get({id: $routeParams.id}, function(){
			$scope.project = project;

			Tasks.findMany(project.tasks, function(tasks){
				$scope.dataForTheTree = tasks;
			});

			Tasks.getTree({projectId: project._id}, function(taskTree){
				$scope.dataForTheTree = taskTree;
			})
		});
	};

	updateTasks();

	$scope.addTaskModal = function(parent, parentType){
		var modalInstance = $uibModal.open({      
			templateUrl: '/templates/addTaskModal.html',
			controller: 'addTaskCtrl',
			size: 'sm',
			resolve : {
				projectId: function(){
					return $scope.project._id;
				},
				parentType : function(){
					return parentType
				},
				parent: function(){
					return parent;
				}
			}
		});

		modalInstance.result.then(function(){
			updateTasks();
		});
	}

	$scope.addTask = function(){
		$scope.addTaskModal($scope.project, "project");
	}

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

	$scope.fullName = "Adriana Ene";
	$scope.notNumber = 6;
	$scope.search = {value : ''};
	$scope.notifications = [{ value : 'Deadline Task 2 from Project Pizza Shop Online is tomorrow'}
	];

	$scope.addSubTask = function($event, node){
		$scope.addTaskModal(node, "task");
		$event.stopPropagation();
	}

	$scope.showSelected = function(node){
		console.log(node);
	}
});
