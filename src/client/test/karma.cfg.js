'use strict';

module.exports = function(config) {
  config.set({
	autoWatch: false,  
	basePath: process.cwd(),
	browsers: ['PhantomJS'],
	
	files: [	
	  'node_modules/phantomjs-polyfill/bind-polyfill.js',	
	  
	  'node_modules/systemjs/dist/system.src.js',
	  'node_modules/systemjs/dist/system-polyfills.js',
	  
	  { pattern: 'tmp/serve/test/test.js',      included: false },
	  { pattern: 'tmp/serve/test/test.spec.js', included: false },
	  
	  'src/client/test/test_main.js'
	],
	
	frameworks: [ 'mocha', 'chai' ],
	
	plugins: [
	  'karma-chai',	
	  'karma-coverage',
	  'karma-mocha',
	  'karma-phantomjs-launcher'
	],
	
	preprocessors: {
//    'tmp/serve/test/test.js': ['coverage']	
	},
	
	reporters: [ 'progress', 'coverage' ],
	
	singleRun: true,
	
	// plugin settings
	
	coverageReporter: {
	  dir : 'reports/coverage/',
      reporters: [
        { type: 'html',      subdir: 'html' },
        { type: 'lcovonly',  subdir: 'lcov' }
      ]
    }
  })	
};