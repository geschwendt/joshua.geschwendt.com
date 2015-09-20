'use strict';

import { Component, View } from './core/core';

import { Header } from './main/main';

import { IApplication } from './app.head';

const selector = 'application';

const directives = [ Header ];
const templateUrl = 'app/app.html';

@Component({ selector }) @View({ templateUrl, directives })
export class Application implements IApplication{}