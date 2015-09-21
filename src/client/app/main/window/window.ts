'use strict';
                  
import { Component, View, TEMPLATE_CACHE } from '../../core/core';

interface IWindow {}

const selector = 'jlg-window'; 
const template = TEMPLATE_CACHE.JLG_WINDOW;

@Component({ selector }) @View({ template })
export class Window implements IWindow {
  constructor() {
    	
  }
}