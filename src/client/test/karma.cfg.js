'use strict';

module.exports = function(config) {
  config.set({
	autoWatch: false,  
	basePath: process.cwd(),
	browsers: ['PhantomJS'],
	files: [
	  'src/client/test/test.js',
	  'src/client/test/test.spec.js'	
	],
	frameworks: ['mocha', 'chai'],
	plugins: [
	  'karma-chai',	
	  'karma-coverage',
	  'karma-mocha',
	  'karma-phantomjs-launcher'
	],
	preprocessors: {
	  'src/client/test/test.js': ['coverage']	
	},
	reporters: [
	  'coverage', 
	  'progress'
	],
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