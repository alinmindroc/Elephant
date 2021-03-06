angular.module('taskManagerApp')
.controller('tasksCtrl', function ($scope, $uibModal, $rootScope, $routeParams, $location, Projects, Tasks, Users) {
	$rootScope.currentController = 'tasks';

	Projects.get({id: $routeParams.projectId}, function(res){
		$scope.project = res;
	});

	function cleanResponse(resp) {
		return JSON.parse(angular.toJson(resp));
	}

	//return an array containing the path from root to a node
	//with a specific id in a tree
	function getNodePath(tree, nodeId){
		function dfs(node, nodeId){
			if(node._id == nodeId){
				$scope.selectedNode = node;
				$scope.setSelected(node);
				return true;
			} else {
				for(var i in node.children){
					path.push(node.children[i]);

					//return result only if the searched node has been found
					var res = dfs(node.children[i], nodeId);
					if(res == true)
						return res;
				}
			}
		}

		tree = cleanResponse(tree);
		var path = [];

		for(var i in tree){
			var res = undefined;
			path = [tree[i]];

			res = dfs(tree[i], nodeId);
			if(res)
				return path;
		}
	}

	function dfsSetStringDate(node){
		function dfs(node){
			node.stringDate = new Date(node.start_date).toDateString();
			for(var i in node.children){
				dfs(node.children[i]);
			}
		}

		for(var i in node){
			dfs(node[i]);
		}
	}

	function updateTasks(){
		Tasks.getTree({projectId: $routeParams.projectId}, function(taskTree){
			$scope.dataForTheTree = taskTree;
			dfsSetStringDate($scope.dataForTheTree);
			if($routeParams.taskId != undefined){
				$scope.expandedNodes = getNodePath(taskTree, $routeParams.taskId);
			}
		});
	};

	updateTasks();

	$scope.addTaskModal = function(parent, parentType){
		var modalInstance = $uibModal.open({      
			templateUrl: '/templates/addTaskModal.html',
			controller: 'addTaskCtrl',
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

		modalInstance.result.then(function(addedTaskId){
			updateTasks();
			$location.url('/tasks/' + $scope.project._id + '/' + addedTaskId);
		});
	}

	$scope.addTask = function(){
		$scope.addTaskModal($scope.project, "project");
	}

	$scope.treeOptions = {
		nodeChildren: "children",
		dirSelectable: true,
		injectClasses: {
			ul: "task_tree_ul",
			li: "task_tree_li",
			liSelected: "a7",
			iExpanded: "a3",
			iCollapsed: "a4",
			iLeaf: "a5",
			label: "a6",
			labelSelected: "a8"
		}
	}

	$scope.addSubTask = function($event, node){
		$scope.addTaskModal(node, "task");
		$event.stopPropagation();
	}

	$scope.setSelected = function(node){
		var userIds = node.users;
		Users.findMany(userIds, function(res){
			$scope.assignedUsers = cleanResponse(res);
		});
		$location.url('/tasks/' + $scope.project._id + '/' + node._id);
	}

	$scope.openTaskDetailsModal = function(){
		var modalInstance = $uibModal.open({
			templateUrl: '/templates/taskDetailsModal.html',
			controller: 'taskDetailsCtrl',
			resolve: {
				taskId: function(){
					return $scope.selectedNode._id;
				},
				userIds: function(){
					return $scope.project.users;
				}
			}
		});

		modalInstance.result.then(function(){
			updateTasks();
		});
	}

	/*
	abandoned
	$scope.delete = function(){
		var task = $scope.selectedNode;

		Users.removeTaskTreeFromAllUsers({rootTaskId:task._id});
		//for every child of the task:
		//       remove child from every user
		//       delete child
		// remove the task reference from every user
		
		// remove the task from the parent
		if(task.project == task.parent){
			// if it is a root task, delete it from the project
			Projects.removeTask({taskId: task._id, projectId: $scope.project._id});
		} else {
			// else, delete it from its parent task
			Tasks.removeSubTask({taskId: task.parent, subTaskId: task._id})
		}

		// delete the task object
		Tasks.remove({id: task._id});

		updateTasks();
		$scope.selectedNode = undefined;
	}
	*/
});
