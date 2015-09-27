'use strict';
                  
import { Component, View, TEMPLATES } from '../../core/core';

interface IFooter {}

const selector:string = 'jlg-footer'; 
const template:string = TEMPLATES.JLG_FOOTER;

@Component({ selector }) @View({ template })
export class Footer implements IFooter {
  constructor() {
     
  }
}