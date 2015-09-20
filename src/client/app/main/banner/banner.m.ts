'use strict';
                  
import { Component, View } from '../../core/core';
import { IBanner } from './banner.h';

const selector = 'jlg-banner'; 
const templateUrl = 'app/main/banner/_banner.html';

@Component({ selector }) @View({ templateUrl })
export class Banner implements IBanner {
  constructor() {
     
  }
}