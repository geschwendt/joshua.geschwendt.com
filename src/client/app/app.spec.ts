/// <reference path="../library/typings/tsd.d.ts" />
'use strict';

import { angular } from './core/modules/angular/angular';
import { Application } from './app';

console.log('starting task');

describe('test suite', function() { 
    
  it('should pass', function(done) {
      console.log(Application);
      done();
  });
});