'use strict';
                  
import { Component, View, TEMPLATES } from '../../core/core';

interface IWindow {}

const selector = 'jlg-window'; 
const template = TEMPLATES.JLG_WINDOW;

@Component({ selector }) @View({ template })
export class Window implements IWindow {
  constructor() {
    	
  }
}