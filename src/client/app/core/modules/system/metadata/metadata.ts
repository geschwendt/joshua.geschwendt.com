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

////

export function Component(component) {
  return function decorator(target) {   
    if (!component && !component.selector) {
      throw new Error('@Component() must contains selector property!');
    }
   
    component = component ? component : {};
    component.viewBindings = component.viewBindings || [];
    
    target.$viewBindings = [];
    component.viewBindings.forEach(function(binding) {
      target.$viewBindings.push(binding.$injectable);  
    });
    
    if (target.$initView) {
      target.$initView(component.selector);
    }
    
    target.$isComponent = true;
  };
}

export function View(view) {
  if (!view.template && !view.templateUrl) {
    throw new Error('@View() must contain template of templateUrl property.')  
  }
  
  const defaults = {
    bindToController: true,
    controllerAs: '_', // should this be allowed to be overwritten?
    restrict: 'E',
    scope: {}
  };
  
  return function decorator(target) {  
    if (target.$isComponent) {
      throw new Error('@View() must be placed after @Component()!');
    }
    
    view = view ? view : {};
    target.$initView = function(componentSelector) {     
      target.$injectable = componentSelector; 
      view.directives = view.directives || [];
      
      target.$dependencies = []; 
      view.directives.forEach(function(directive) {
        target.$dependencies.push(directive.$injectable);
      });
      
      target.$injectable = pascalCaseToCamelCase(target.$injectable);
      target.$injectable = dashCaseToDotCase(target.$injectable);
      
      componentSelector = pascalCaseToCamelCase(componentSelector);
      componentSelector = dashCaseToCamelCase(componentSelector);

      view.bindToController = view.bindToController || view.bind || {};
      
      target.$inject = target.$viewBindings; 
      angular.module(target.$injectable, target.$dependencies)
        .directive(componentSelector, function () {
          return Object.assign(defaults, { controller: target }, view);
        });
    };

    target.$isView = true;
  };
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

/**
 * Convert dash case to camel case
 */
function dashCaseToDotCase(string) {
    return string.replace( /-([a-z])/ig, function(all, letter) {
        return `.${letter}`;
    });
}