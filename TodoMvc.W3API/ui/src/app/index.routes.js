'use strict';


import todoTemplate from '!!file-loader?name=templates/[name].[ext]!./pages/todo/todo.html';


function routeConfig($urlRouterProvider, $stateProvider, todoProvider) {
    'ngInject';

    $stateProvider
        .state('todo', {
            url: '/',
            templateUrl: todoTemplate,
            controller: 'todoController',
            controllerAs: '$ctrl',
            resolve: {
                todoPreloading: todoProvider.todoPagePrealoading
            }
        })
        .state('filter', {
            url: '/:status',
            templateUrl: todoTemplate,
            controller: 'todoController',
            controllerAs: '$ctrl',
            resolve: {
                todoPreloading: todoProvider.todoPagePrealoading
            }
        });


    $urlRouterProvider.otherwise('/');

}

export default angular
    .module('index.routes', [])
    .config(routeConfig);
