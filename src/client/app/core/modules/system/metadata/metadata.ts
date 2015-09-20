'use strict';

import { angular } from '../../../modules/modules';

interface ObjectCtor extends ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
}

declare var Object: ObjectCtor;
export let assign = Object.assign ? Object.assign : function(target: any, ...sources: any[]): any {
  return;
};

if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }
        nextSource = Object(nextSource);

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}

export function Component(component) { console.log('[ COMPONENT ]:', component);  
  component = component ? component : {};
  return function decorator(target) { console.log('[ COMPONENT { target } ]:', target); 
	
    if (target.$initView) {
      target.$initView(component.selector);
    }
    
    if (!component.selector) {
      throw new Error('@Component() must contains selector property.');  
    }
    
	target.$isComponent = true;
  }
}

export function View(view) { console.log('[ VIEW ]:', view); 
  view ? view : {};
  const defaults = {
    bindToController: true,  
    controllerAs: '_', // should this be allowed to be overwritten?
    restrict: 'E',
    scope: {},
  };
  
  if (!view.template && !view.templateUrl) {
    throw new Error('@View() must contain template of templateUrl property.')  
  }
  
  return function decorator(target) { console.log('[ VIEW { target } ]:', target); 
    
    if (target.$isComponent) {
      throw new Error('@View() must be placed after @Component().');
    } 
    
    target.$initView = function(componentSelector) { 
    
      componentSelector = pascalCaseToCamelCase(componentSelector);
      componentSelector = dashCaseToCamelCase(componentSelector);
    
      view.bindToController = view.bindToController || view.bind || {};   
	  
      angular.module(target.name, []).directive(componentSelector, function() {
        return Object.assign(defaults, { controller: target }, view);
      });
    };
      
    target.$isView = true; 	
  }
}

/**
 * Lowercase the first char of a string
 */
function pascalCaseToCamelCase(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
}


/**
 * Convert dash case to camel case
 */
function dashCaseToCamelCase(string) {
    return string.replace( /-([a-z])/ig, function(all, letter) {
        return letter.toUpperCase();
    });
}