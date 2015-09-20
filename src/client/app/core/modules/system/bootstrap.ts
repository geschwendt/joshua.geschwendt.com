/// <reference path="../../../../library/typings/tsd.d.ts" />

'use strict';

import { angular, ng2 } from '../modules';

export function Bootstrap(appComponent:any, appBindings?:Array<any>) {
  
  let __auto__ = [ appComponent.$injectable, ng2.name ]
  
  appBindings.forEach(function(binding) {
    __auto__.push(binding)
  })
  
  angular.module('__auto__', __auto__);  
  angular.element(document).ready(function() {
    angular.bootstrap(document, ['__auto__'], {
	  strictDi: true 
    });
  });
}