'use strict';

import { 
  angular, 
  angular2, 
  ngAnimate,
  uiRouter,  
} from '../modules';

export function Bootstrap(appComponent:any, appBindings?:Array<any>) {
  
  let __auto__ = [ 
      appComponent.$injectable, 
      ngAnimate.$injectable,
      uiRouter.$injectable,
      angular2.name 
  ]
  
  appBindings.forEach(function(binding) {
    __auto__.push(binding)
  })
  
  //document.write(`<base href="${document.location}"/>`);
  
  angular.module('__auto__', __auto__);  
  angular.element(document).ready(function() {
    angular.bootstrap(document.querySelector('[jlg-app]'), ['__auto__'], {
	  strictDi: true 
    });
  });
}