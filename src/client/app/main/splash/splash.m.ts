'use strict';
                  
import { Component, View } from '../../core/core';
import { ISplash } from './splash.h';

const selector = 'jlg-splash'; 
const viewBindings = [{$injectable:'$timeout'}];

const templateUrl = 'app/main/splash/_splash.html';

@Component({ 
  selector, viewBindings 
}) 
@View({ templateUrl })
export class Splash implements ISplash {
  showSplash:boolean = true;
  $timeout:ng.ITimeoutService;  

  constructor($timeout) {
    this.$timeout = $timeout;
    this.hideSplash();
  }
  
  hideSplash() {
    this.$timeout(() => this.showSplash = false, 1000);
    document.body.style.background = "#cddc39";    
  }
}