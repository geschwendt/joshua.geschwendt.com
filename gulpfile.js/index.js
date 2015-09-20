'use strict';

require('../tools/check_environment')({
  requiredNpmVersion: '>=2.11.3',
  requiredNodeVersion: '>=0.12.2'	
});

require('babel/register')({ stage: 1 });

require('./main');