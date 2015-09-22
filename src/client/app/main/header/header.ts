'use strict';
                  
import { Component, View, TEMPLATES } from '../../core/core';

interface IHeader {
  joshua: { geschwendt: { com: string } };
}

const selector:string = 'jlg-header'; 
const template:TEMPLATES = TEMPLATES.JLG_HEADER;

@Component({ selector }) @View({ template })
export class Header implements IHeader {    
   
  constructor() {    
	var letters:string[] = '< / j o s h u a . g e s c h w e n d t . c o m >'.split(' ');    
    this.joshua.geschwendt.com = letters.join('');
  }
  
  // default properties;
  joshua = { geschwendt: { com: '' } };
    
}