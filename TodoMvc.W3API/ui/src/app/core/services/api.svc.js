'use strict';

export default function(app) {
    app.factory('api', apiSvc);

    var baseUrl = "http://localhost:9000/"

    function apiSvc($resource) {
        "ngInject";

        var apiUrls = {
            // 
            create: $resource(baseUrl + "api/v1/system/build-info"),
            update: $resource(baseUrl + "api/v1/system/"),
            get:    $resource(baseUrl + "api/v1/system/"),
            delete: $resource(baseUrl + "api/v1/system/")
        };

        return apiUrls;
    }
}
