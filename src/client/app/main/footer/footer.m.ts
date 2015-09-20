'use strict';
                  
import { Component, View } from '../../core/core';
import { IFooter } from './footer.h';

const selector = 'jlg-footer'; 
const templateUrl = 'app/main/footer/_footer.html';

@Component({ selector }) @View({ templateUrl })
export class Footer implements IFooter {
  constructor() {
     
  }
}