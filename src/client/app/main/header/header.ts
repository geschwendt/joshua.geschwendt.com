'use strict';
                  
import { Component, View } from '../../core/core';

const templateUrl = 'app/main/header/_header.html';

interface IHeader {
    joshua: { geschwendt: { com: string } };
}

@Component({ selector: 'jlg-header' })
@View({ templateUrl })
export class Header implements IHeader {    
   
  constructor() {    
	var letters:string[] = '< / j o s h u a . g e s c h w e n d t . c o m >'.split(' ');    
    this.joshua.geschwendt.com = letters.join('');
  }
  
  // default properties;
  joshua = { geschwendt: { com: '' } };
    
}