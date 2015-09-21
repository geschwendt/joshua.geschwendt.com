'use strict';
                  
import { Component, View, TEMPLATE_CACHE } from '../../core/core';

interface IBanner {}

const selector = 'jlg-banner'; 
const template = TEMPLATE_CACHE.JLG_BANNER;

@Component({ selector }) @View({ template })
export class Banner implements IBanner {
  constructor() {
     
  }
}