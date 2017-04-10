'use strict';

import './todo.scss';

//import todoController from './todo.controller.js';

const todoModule = angular.module('TODO_MVC', [])
    .controller('todoController', function todoController($scope, $stateParams, $filter, api/*, store*/){
        'use strict';

        var $ctrl = this;

        api.create.get(function(s){
            console.log(s);
        }, function(er){
            console.log(er);
        });

        var todos = $ctrl.todos /*= store.todos*/;

        $ctrl.newTodo = '';
        $ctrl.editedTodo = null;

        // $scope.$watch('todos', function () {
        //     $ctrl.remainingCount = $filter('filter')(todos, {completed: false}).length;
        //     $ctrl.completedCount = todos.length - $ctrl.remainingCount;
        //     $ctrl.allChecked = !$ctrl.remainingCount;
        // }, true);

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

        $ctrl.addTodo = function () {
            var newTodo = {
                title    : $ctrl.newTodo.trim(),
                completed: false
            };

            if (!newTodo.title) {
                return;
            }

            $ctrl.saving = true;
            // store.insert(newTodo)
            //     .then(function success() {
            //         $ctrl.newTodo = '';
            //     })
            //     .finally(function () {
            //         $ctrl.saving = false;
            //     });
        };

        $ctrl.editTodo = function (todo) {
            $ctrl.editedTodo = todo;
            // Clone the original todo to restore it on demand.
            $ctrl.originalTodo = angular.extend({}, todo);
        };

        $ctrl.saveEdits = function (todo, event) {
            // Blur events are automatically triggered after the form submit event.
            // This does some unfortunate logic handling to prevent saving twice.
            if (event === 'blur' && $ctrl.saveEvent === 'submit') {
                $ctrl.saveEvent = null;
                return;
            }

            $ctrl.saveEvent = event;

            if ($ctrl.reverted) {
                // Todo edits were reverted-- don't save.
                $ctrl.reverted = null;
                return;
            }

            todo.title = todo.title.trim();

            if (todo.title === $ctrl.originalTodo.title) {
                $ctrl.editedTodo = null;
                return;
            }

            // store[todo.title ? 'put' : 'delete'](todo)
            //     .then(function success() {
            //     }, function error() {
            //         todo.title = $ctrl.originalTodo.title;
            //     })
            //     .finally(function () {
            //         $ctrl.editedTodo = null;
            //     });
        };

        $ctrl.revertEdits = function (todo) {
            todos[todos.indexOf(todo)] = $ctrl.originalTodo;
            $ctrl.editedTodo = null;
            $ctrl.originalTodo = null;
            $ctrl.reverted = true;
        };

        $ctrl.removeTodo = function (todo) {
            // store.delete(todo);
        };

        $ctrl.saveTodo = function (todo) {
            // store.put(todo);
        };

        $ctrl.toggleCompleted = function (todo, completed) {
            if (angular.isDefined(completed)) {
                todo.completed = completed;
            }

            // store.put(todo, todos.indexOf(todo))
            //     .then(function success() {
            //     }, function error() {
            //         todo.completed = !todo.completed;
            //     });
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
    });

//todoModule.controller('todoController', todoController);

export default todoModule;

/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */