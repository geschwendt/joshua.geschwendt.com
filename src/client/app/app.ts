'use strict';

import { Component, View } from './core/core';

import { Header } from './main/main';

@Component({ selector: 'application' })
@View({ 
  templateUrl: 'app/app.html',
  directives: [Header]
})
export class Application {}

// 728 x 264