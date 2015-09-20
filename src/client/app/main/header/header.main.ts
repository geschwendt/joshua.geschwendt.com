'use strict';
                  
import { Component, View } from '../../core/core';
import { IHeader } from './header.head';

const selector = 'jlg-header'; 
const templateUrl = 'app/main/header/_header.html';

@Component({ selector }) @View({ templateUrl })
export class Header implements IHeader {    
   
  constructor() {    
	var letters:string[] = '< / j o s h u a . g e s c h w e n d t . c o m >'.split(' ');    
    this.joshua.geschwendt.com = letters.join('');
  }
  
  // default properties;
  joshua = { geschwendt: { com: '' } };
    
}