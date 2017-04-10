'use strict';

const shared = angular.module('core.shared', []);

import todoProvider from './services/todo.provider';
import apiSvc from './services/api.svc';

todoProvider(shared);
apiSvc(shared);

export default shared;
