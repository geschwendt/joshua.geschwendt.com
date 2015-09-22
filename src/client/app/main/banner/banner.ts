'use strict';
                  
import { Component, View, TEMPLATES } from '../../core/core';

interface IBanner {}

const selector:string = 'jlg-banner'; 
const template:TEMPLATES = TEMPLATES.JLG_BANNER;

@Component({ selector }) @View({ template })
export class Banner implements IBanner {
  constructor() {
     
  }
}