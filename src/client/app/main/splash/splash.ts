'use strict';
                  
import { Component, View, Timeout, TEMPLATES } from '../../core/core';

interface ISplash {}

const selector:string = 'jlg-splash'; 
const viewBindings:Array<any> = [ Timeout ];

const template:string = TEMPLATES.JLG_SPLASH;

@Component({ selector, viewBindings }) @View({ template })
export class Splash implements ISplash {
    
  showSplash:boolean = true;
  timeout:ng.ITimeoutService;  

  constructor(Timeout) {
    this.timeout = Timeout;
    this.hideSplash();
  }
  
  hideSplash() {
    this.timeout(() => this.showSplash = false, 1000);
    document.body.style.background = "#cddc39";    
  }
}