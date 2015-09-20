'use strict';

import { angular } from '../modules';

const ngEventDirectives = {};
const forceAsyncEvents = { 'blur': true, 'focus': true };
const events:string[] = 'click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'.split(' ');

/**
 * Angular's event directives wrapped with Angular2's syntax
 */
function getAngular2EventDirectives() {
 
  angular.forEach(events, function(eventName) {
    const directiveName = directiveNormalize('(' + eventName + ')');
    ngEventDirectives[directiveName] = ['$parse', '$rootScope', ($parse, $rootScope) => {
      return {
        restrict: 'A',
        compile: ($element, attr) => {
          const fn = $parse(attr[directiveName], null, true);
          return (scope, element) => {
            element.on(eventName, (event) => {
              const callback = () => { fn(scope, { $event: event }); };
              if (forceAsyncEvents[eventName] && $rootScope.$$phase) {
                scope.$evalAsync(callback);
                return;
              } 
              scope.$apply(callback);
            });
          };
        }
      };
    }];
  });
  
  return ngEventDirectives;
}


/**
 * Angular's camelCase function
 */
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
 
function camelCase(name) {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    })
	.replace(MOZ_HACK_REGEXP, 'Moz$1');
}


/**
 * Angular's directiveNormalize function
 */
const PREFIX_REGEXP =  /^((?:x|data)[\:\-_])/i;
 
function directiveNormalize(name) {
  return camelCase(name.replace(PREFIX_REGEXP, ''));
}

const ng2 = angular
  .module('ng2', [])
  .config(['$compileProvider', ($compileProvider) => { 
    $compileProvider.directive(getAngular2EventDirectives()); 
  }]);
  
export { ng2 };  