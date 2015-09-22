'use strict';
                  
import { Component, View, TEMPLATES } from '../../core/core';

interface IBanner {}

const selector = 'jlg-banner'; 
const template = TEMPLATES.JLG_BANNER;

@Component({ selector }) @View({ template })
export class Banner implements IBanner {
  constructor() {
     
  }
}