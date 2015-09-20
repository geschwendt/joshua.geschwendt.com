'use strict';
                  
import { Component, View } from '../../core/core';
import { ISplash } from './splash.h';

const selector = 'jlg-splash'; 
const templateUrl = 'app/main/splash/_splash.html';

@Component({ selector }) 
@View({ templateUrl })
export class Splash implements ISplash {
	constructor() {
		
	}
}