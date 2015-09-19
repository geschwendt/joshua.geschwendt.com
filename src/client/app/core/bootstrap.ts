/// <reference path="../../library/typings/tsd.d.ts" />

'use strict';

import { angular } from './modules/angular/angular';

export function Bootstrap(appComponent:any, appBindings?:Array<any>) {
  angular.module('__auto__', [ appComponent.name ]);  
  angular.element(document).ready(function() {
    angular.bootstrap(document, ['__auto__'], {
	  strictDi: true // is this required?
    });
  });
  console.log(appComponent.name);
}