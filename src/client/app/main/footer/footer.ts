'use strict';
                  
import { Component, View, TEMPLATE_CACHE } from '../../core/core';

interface IFooter {}

const selector = 'jlg-footer'; 
const template = TEMPLATE_CACHE.JLG_FOOTER;

@Component({ selector }) @View({ template })
export class Footer implements IFooter {
  constructor() {
     
  }
}