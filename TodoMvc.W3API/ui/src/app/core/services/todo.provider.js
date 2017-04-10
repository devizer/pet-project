'use strict';

export default function(app) {
    app.provider('todo', todoProvider);

    function todoProvider() {
        this.todoPagePrealoading = todoPagePrealoading;
        this.$get = function() {
            return this;
        };
    }

    function todoPagePrealoading($q, $ocLazyLoad) {
        "ngInject";

        const deferred = $q.defer();
        require.ensure([], (require) => {
            const todoModule = require('../../pages/todo/todo.module');
            $ocLazyLoad.load({
                name: todoModule.default.name,
            });
            deferred.resolve(todoModule.default.controller);
        });
        return deferred.promise;
    }
}