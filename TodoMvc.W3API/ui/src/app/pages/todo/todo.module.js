'use strict';

import './todo.scss';

const todoModule = angular.module('TODO_MVC', [])
    .controller('todoController', function todoController($scope, api) {

        var $ctrl = this;
        $ctrl.lists = [];
        var lists = $ctrl.lists;

        var updateLists = function(arr){
            $ctrl.lists = arr;
        };

        api.createParent(updateLists);

        api.getList();





        $ctrl.newList = '';

        // add new list
        $ctrl.addList = function(){
            var newList = {
                title: $ctrl.newList.trim()
            };

            if (!newList.title) {
                return;
            }

            api.createList(newList);
            $ctrl.newList = '';
        };

    });

export default todoModule;
