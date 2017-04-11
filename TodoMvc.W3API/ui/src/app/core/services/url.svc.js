'use strict';

export default function(app) {
    app.factory('url', urlSvc);

    var baseUrl = "http://localhost:9000/"

    function urlSvc($resource) {
        "ngInject";

        var apiUrls = {
            // Lists
            getList:    $resource( baseUrl + "api/v1/lists"                                             ),  // get / query, put | get all todo-lists and their tasks
            createList: $resource( baseUrl + "api/v1/lists",
                                {
                                    title:'@title'
                                },
                                {
                                    'update': {
                                        method:'PUT'
                                    }
                                }                                                                       ),  // get / query, put | get all todo-lists and their tasks
            delList:    $resource( baseUrl + "api/v1/lists/:id"                                         ),  // delete | delete list
            updList:    $resource( baseUrl + "api/v1/lists/:id/title", {title:'@title'}                 ),  // post | update list's item

            // System
            sysInfo:    $resource( baseUrl + "api/v1/system/build-info"                                 ),  // get, post | get system build info

            // Tasks
            createTask: $resource( baseUrl + "api/v1/lists/:idList/tasks",
                                {
                                    idList:    '@IdList',
                                    title:     '@Title',
                                    completed: '@Completed'
                                },
                                {
                                    'update': {
                                        method:'PUT'
                                    }
                                }                                                                       ),  // put | create new task
            delTask:    $resource( baseUrl + "api/v1/lists/:idList/tasks/:id"                           ),  // delete | delete task
            updTitle:   $resource( baseUrl + "api/v1/lists/:idList/tasks/:id/title",
                                {
                                    id:     '@id',
                                    idList: '@idList',
                                    title:  '@title'
                                }                                                                       ),  // post | update task's title
            updStatus:  $resource( baseUrl + "api/v1/lists/:idList/tasks/:id/completed",
                                {
                                    completed: '@Completed'
                                }                                                                       )   // post | update task's status
        };

        return apiUrls;
    }
};