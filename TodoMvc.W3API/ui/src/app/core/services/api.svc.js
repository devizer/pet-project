'use strict';

export default function(app){
    app.factory('api', apiSvc);

    function apiSvc($resource, url){
        "ngInject";

        var parent = {};
        var listHandlers = [];

        // parent cb
        function createParent(fn){
            parent.handler = fn;
        };


        // todo cb
        function createList(){
            listHandlers = [];
        };

        function getList(){
            return listHandlers;
        };

        function subscribe(fn){
            listHandlers.push(fn);
        };

        function unsubscribe(fn){
            listHandlers = listHandlers.filter(
                function(item) {
                    if (item !== fn) {
                        return item;
                    }
                }
            );
        };

        function fire(e){
            listHandlers.forEach(function(item){
                item();
            });
        };




        // API methods

        // Lists
        // get list of todos
        function getList(){
            url.getList.query(
                function(s){
                    // console.log(s);
                    parent.handler(s);
                },
                function(er) {
                    console.log(er);
                }
            );
        };

        // create new todo's list
        function createList(query){
            if (!query){
                return;
            }

            url.createList.update(
                query,
                function(s){
                    getList(s);
                },
                function(er){
                    console.log(er);
                }
            );
        };

        // delete todo's list
        function deleteList(id){
            if (!id){
                return;
            }
            url.delList.delete(
                {id: id},
                function(s){
                    getList(s);
                },
                function(er){
                    console.log(er);
                }
            );
        };

        // update task
        function updateList(query, fn){
            if (!query){
                return;
            }
            url.updList.save(
                query,
                function(s){
                    // getList(s);
                    fn && fn(s);
                },
                function(er){
                    console.log(er);
                }
            );
        };



        // Tasks
        // add task
        function addTask(query, fn){
            if (!query) {
                return;
            }

            url.createTask.update(
                query,
                function(s){
                    fn && fn(s);
                },
                function(er){
                    console.log(er);
                }
            );
        };

        // delete task
        function deleteTask(query, fn){
            if (!query) {
                return;
            }

            url.delTask.delete(
                query,
                function(s){
                    fn && fn(s);
                },
                function(er){
                    console.log(er);
                }
            );
        };

        // update title
        function updateTitle(query, fn){
            if (!query) {
                return;
            }

            url.updTitle.save(
                query,
                function(s){
                    fn && fn(s);
                },
                function(er){
                    console.log(er);
                }
            );
        };

        // update status
        function updateStatus(query, fn){
            if (!query) {
                return;
            }

            url.updStatus.save(
                query,
                function(s){
                    fn && fn(s);
                },
                function(er){
                    console.log(er);
                }
            );
        };




        // api function links
        var api = {
            // parent
            createParent: createParent,
            // events
            subscribe:    subscribe,
            unsubscribe:  unsubscribe,
            fire:         fire,
            // list
            getList:      getList,
            createList:   createList,
            deleteList:   deleteList,
            updateList:   updateList,
            // task
            addTask:      addTask,
            deleteTask:   deleteTask,
            updateTitle:  updateTitle,
            updateStatus: updateStatus
        };

        return api;
    }
};