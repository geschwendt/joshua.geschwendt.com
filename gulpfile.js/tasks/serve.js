'use strict';

import browserSync from 'browser-sync';
import modrewrite from 'connect-modrewrite';

export function serve_tmp() {
  const bsync = browserSync.create();
  bsync.init({
    files: [
      'tmp/build/**/*.js', 
      'tmp/serve/**/*.css', 
      'src/client/**/*.html'
    ],
    server: {
      baseDir: [ 'tmp/build', 'tmp/serve', 'src/client' ],
      middleware: [ 
        modrewrite(['!\\.\\w+$ /index.html [L]']) 
      ]
    }
  });    
}

export function serve_dist() {
  const bsync = browserSync.create();
  bsync.init({
    files: ['dist/**'],
    server: {
      baseDir:    ['dist'],
      middleware: [modrewrite(['!\\.\\w+$ /index.html [L]'])]
    }
  });    
}