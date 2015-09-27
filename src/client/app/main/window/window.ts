'use strict';
                  
import { Component, View, TEMPLATES } from '../../core/core';

interface IWindow {}

const selector:string = 'jlg-window'; 
const template:string = TEMPLATES.JLG_WINDOW;

@Component({ selector }) @View({ template })
export class Window implements IWindow {
  constructor() {
    	
  }
}