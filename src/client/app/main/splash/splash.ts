'use strict';
                  
import { Component, View, TEMPLATE_CACHE } from '../../core/core';

interface ISplash {}

const selector = 'jlg-splash'; 
const viewBindings = [{$injectable:'$timeout'}];

const template = TEMPLATE_CACHE.JLG_SPLASH;

@Component({ selector, viewBindings }) @View({ template })
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