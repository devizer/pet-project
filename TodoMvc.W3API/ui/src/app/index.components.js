'use strict';

import footerModule from './core/directives/footer/footer.module';
import todoDir from './core/directives/todo_list/todo_list.module.js';

export default angular.module('index.components', [
	footerModule.name,
	todoDir.name
]);
