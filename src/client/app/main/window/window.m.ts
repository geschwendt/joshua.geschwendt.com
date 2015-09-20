'use strict';
                  
import { Component, View } from '../../core/core';
import { IWindow } from './window.h';

const selector = 'jlg-window'; 
const templateUrl = 'app/main/window/_window.html';

@Component({ selector }) 
@View({ templateUrl })
export class Window implements IWindow {
  constructor() {
    	
  }
}