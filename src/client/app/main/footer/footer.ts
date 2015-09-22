'use strict';
                  
import { Component, View, TEMPLATES } from '../../core/core';

interface IFooter {}

const selector = 'jlg-footer'; 
const template = TEMPLATES.JLG_FOOTER;

@Component({ selector }) @View({ template })
export class Footer implements IFooter {
  constructor() {
     
  }
}