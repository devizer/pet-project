'use strict';

import todoListTmpl from './todo_list.html';

function todoListComponent($log){
    'ngInject';

    var directive = {
        restrict: 'E',
        templateUrl: todoListTmpl,
        controller: ['$scope', '$stateParams', '$filter', 'api', todoListController],
        controllerAs: '$ctrl',
        bindToController: true
    };

    return directive;

    function todoListController($scope, $stateParams, $filter, api){
        'use strict';

        var $ctrl = this;
        $ctrl.list = $scope.list;

        $ctrl.todos = $ctrl.list.Tasks.length > 0 ? $ctrl.list.Tasks : [];
        var todos = $ctrl.todos;

        $ctrl.newTodo = '';
        $ctrl.editedTodo = null;





        $scope.$watch('todos', function () {
            $scope.remainingCount = $filter('filter')(todos, {completed: false}).length;
            $scope.completedCount = todos.length - $scope.remainingCount;
            $scope.allChecked = !$scope.remainingCount;
        }, true);

        // Monitor the current route for changes and adjust the filter accordingly.
        $scope.$on('$stateChangeSuccess', function () {
            var status = $ctrl.status = $stateParams.status || '';

            if (status === 'active') {
                $ctrl.statusFilter = {completed: false};
            } 
            else if (status === 'completed') {
                $ctrl.statusFilter = {completed: true};
            }
            else {
                $ctrl.statusFilter = {};
            }
        });


        $ctrl.editTodo = function (todo){
            $ctrl.editedTodo = todo;
            // Clone the original todo to restore it on demand.
            $ctrl.originalTodo = angular.extend({}, todo);
        };

        $ctrl.revertEdits = function (todo) {
            todos[todos.indexOf(todo)] = $ctrl.originalTodo;
            $ctrl.editedTodo = null;
            $ctrl.originalTodo = null;
            $ctrl.reverted = true;
        };


        /*$ctrl.saveTodo = function (todo) {
            // store.put(todo);
        };*/
        $ctrl.toggleCompleted = function (todo, completed) {
            if (angular.isDefined(completed)) {
                todo.Completed = completed;
            }
            var query = {
                idList: todo.IdList,
                id:     todo.Id,
                completed:  todo.Completed
            };

            api.updateStatus(query, function(res){
            });
        };

        $ctrl.clearCompletedTodos = function () {
            // store.clearCompleted();
        };

        $ctrl.markAll = function (completed) {
            todos.forEach(function (todo) {
                if (todo.completed !== completed) {
                    $ctrl.toggleCompleted(todo, completed);
                }
            });
        };



        /* ========== rewrited methods ========== */

        // edit list title
        $ctrl.editListTitle = function(id, title){

            var query = {
                Id: id,
                Title: title
            };

            api.updateList(query, function(res){
                console.log(res);
                // $ctrl.list.Title = query.Title;
            });
        };

        // remove list
        $ctrl.removeList = function (list){
            api.deleteList(list.Id);
        };

        // add task
        $ctrl.addTodo = function (id, title){
            var newTodo = {
                IdList   : id,
                Title    : $ctrl.newTodo,
                Completed: false
            };

            if (!newTodo.Title || !id){
                return;
            }

            api.addTask(newTodo, function(res){
                $ctrl.saving = true;
                newTodo.Id = res.Id;
                todos.push(newTodo);
                $ctrl.newTodo = '';
            });
        };

        // remove task
        $ctrl.removeTodo = function (todo){
            if (!todo){
                return;
            }

            var query = {
                id:     todo.Id,
                idList: todo.IdList,
            };

            api.deleteTask(query, function(res){
                todos.splice(todos.indexOf(todo), 1);
            });
        };

        // update task title
        $ctrl.saveEdits = function (todo, event){
            // Blur events are automatically triggered after the form submit event.
            // This does some unfortunate logic handling to prevent saving twice.
            if (event === 'blur' && $ctrl.saveEvent === 'submit') {
                $ctrl.saveEvent = null;
                return;
            }

            $ctrl.saveEvent = event;

            if ($ctrl.reverted){
                // Todo edits were reverted-- don't save.
                $ctrl.reverted = null;
                return;
            }

            if (todo.Title === $ctrl.originalTodo.Title){
                $ctrl.editedTodo = null;
                return;
            }
            else {
                todo.Title = todo.Title.trim();
                var query = {
                    idList: todo.IdList,
                    id:     todo.Id,
                    title:  todo.Title
                };
                api.updateTitle(query, function(res){
                    $ctrl.editedTodo = null;
                    return;
                });
            }
        };

        // update task status
        
    }
}

export default todoListComponent;

/**
 * The controller:
 * - exposes the model to the template and provides event handlers
 */