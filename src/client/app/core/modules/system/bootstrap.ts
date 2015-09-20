/// <reference path="../../../../library/typings/tsd.d.ts" />

'use strict';

import { angular } from '../modules';

export function Bootstrap(appComponent:any, appBindings?:Array<any>) {
  console.log(appComponent.name);  
  angular.module('__auto__', [ appComponent.name ]);  
  angular.element(document).ready(function() {
    angular.bootstrap(document, ['__auto__'], {
      // i dont think this is required as everything should be bundled with systemjs  
	  // strictDi: true 
    });
  });
}