/// <reference path="../../../../library/typings/tsd.d.ts" />

'use strict';

import { angular } from '../modules';

export function Bootstrap(appComponent:any, appBindings?:Array<any>) {
  angular.module('__auto__', [ appComponent.$injectable ]);  
  angular.element(document).ready(function() {
    angular.bootstrap(document, ['__auto__'], {
	  strictDi: true 
    });
  });
}