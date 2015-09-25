/* global __karma__ */

// Tun on full stack traces in errors to help debugging
Error.stackTraceLimit = Infinity;

// TODO(research):
mocha.DEFAULT_TIMEOUT_INTERVAL = 100;

__karma__.loaded = function() {};

System.config({
  baseURL: '/base/',
  defaultJSExtensions: true,
  paths: {}
});


/// Start the System Spec Module Loader
System
  .import('tmp/serve/test/test.spec.js')
  .then(karmaSpecs)
  .then(karmaStart)
  .catch(specError);

function karmaSpecs(module) {
    
  module.hasOwnProperty('main') ? module.main() : throwError(); 
  
  function throwError() {
    throw new Error('Module ' + 'tmp/serve/test/test.spec.js' + ' does not implement main() method.');
  }
}


/**
 * Start Karma Spec Runner
 */
function karmaStart() {
  __karma__.start();
}


/**
 * Throw Catchable Spec Error
 */
function specError(error) {
  __karma__.error(error.stack || error);
}