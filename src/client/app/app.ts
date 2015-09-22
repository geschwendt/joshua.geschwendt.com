'use strict';

import { Component, View, TEMPLATES } from './core/core';

import { Splash } from './main/splash/splash';
import { Header } from './main/header/header';
import { Banner } from './main/banner/banner';
import { Window } from './main/window/window';
import { Footer } from './main/footer/footer';

interface IApplication {}

const selector = 'application';

const template = TEMPLATES.APPLICATION;
const directives = [ Splash, Header, Banner, Window, Footer ];

@Component({ selector }) 
@View({ template, directives })
export class Application implements IApplication{
  constructor() {
	  
  }
}
