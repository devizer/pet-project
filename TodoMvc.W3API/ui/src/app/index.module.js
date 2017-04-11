'use strict';

import components from './index.components';
import config from './index.config';
import run from './index.run';

import uiRouter from 'angular-ui-router';

import coreModule from './core/services/core.module';
import indexComponents from './index.components';
import indexRoutes from './index.routes';


const App = angular.module(
    "TODO_MVC", [
        // plugins
        uiRouter,
        "ngAnimate",
        "ngCookies",
        "ngTouch",
        "ngSanitize",
        "ngMessages",
        "ngAria",
        "ngResource",
        "oc.lazyLoad",

        // core
        coreModule.name,

        // components
        indexComponents.name,

        // routes
        indexRoutes.name,
    ]
);

App
    .config(config)
    .run(run);



export default App;
