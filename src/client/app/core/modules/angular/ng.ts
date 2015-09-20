'use strict';

import * as angular from 'angular';

/// vendor libraries
import 'angular-animate';
import 'angular-ui-router';

/// directive injectables
const ngAnimate = { $injectable: 'ngAnimate' }
const uiRouter  = { $injectable: 'ui.router' }

export { angular, ngAnimate, uiRouter };