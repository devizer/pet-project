'use strict';

const shared = angular.module('core.shared', []);

import todoProvider from './todo.provider';
import apiSvc from './api.svc';
import urlSvc from './url.svc';

todoProvider(shared);
apiSvc(shared);
urlSvc(shared);

export default shared;
