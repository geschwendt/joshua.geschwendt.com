'use strict';

import { Component, View } from './core/core';
import { IApplication } from './app.h';

import { Splash } from './main/splash/splash.m';
import { Header } from './main/header/header.m';
import { Banner } from './main/banner/banner.m';
import { Window } from './main/window/window.m';
import { Footer } from './main/footer/footer.m';

const selector = 'application';

const directives = [ 
	Splash,
	Header, 
	Banner,
	Window,
	Footer
];
const templateUrl = 'app/_app.html';

@Component({ selector }) 
@View({ templateUrl, directives })
export class Application implements IApplication{
  constructor() {
	  
  }
}