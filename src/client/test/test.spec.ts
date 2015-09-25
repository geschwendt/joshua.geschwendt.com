'use strict';

import { testFunction } from './test';

export function main() {
  describe('test function', function():void {
    it('should pass', function():void {	 
	   var test:boolean = testFunction(); 
	   expect(test).to.be.true; 
    });	
  });
}