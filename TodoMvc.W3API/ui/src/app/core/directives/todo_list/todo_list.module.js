'use strict';

import todoListDirective from './todo_list.directive';

const todoListModule = angular.module('todo_list-module', []);

todoListModule
    .directive('todoList', todoListDirective)
    .directive('todoEscape', function () {
        'use strict';

        var ESCAPE_KEY = 27;

        return function (scope, elem, attrs) {
            elem.bind('keydown', function (event) {
                if (event.keyCode === ESCAPE_KEY) {
                    scope.$apply(attrs.todoEscape);
                }
            });

            scope.$on('$destroy', function () {
                elem.unbind('keydown');
            });
        };
    });

export default todoListModule;
