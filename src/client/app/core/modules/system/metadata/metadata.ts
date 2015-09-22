/// <reference path="./polyfills.ts" />

'use strict';

import { angular } from '../../../modules/modules';
import { Object } from './polyfills';
import {
  dashCaseToCamelCase,
  dashCaseToDotCase,  
  pascalCaseToCamelCase,  
} from './utilites';

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