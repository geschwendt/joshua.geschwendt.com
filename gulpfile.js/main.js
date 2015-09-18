import gulp from 'gulp';
import load from 'gulp-load-plugins';

import path from 'path';
import merge from 'merge2';

import browserSync from 'browser-sync';
import modrewrite from 'connect-modrewrite';

const $$ = load({ lazy: true });

gulp.task('default', () => {
  console.log('default gulp task...');
});

gulp.task('serve', gulp.series(
  gulp.parallel(
    appAssets,
    appCSS,
    appJS
  ),
  gulp.parallel(
    appWatch,
    appServe  
  )
));

function appAssets(done) {
  done();
}

function appCSS(done) {
  done();  
}


/**
 * 
 * 
 * 
 * 
 * 
 */

const TSCONFIG = require('../src/client/tsconfig.json').compilerOptions;
const TSOPTIONS = { 
    typescript: require('typescript') 
}; 

const tsProject = $$.typescript.createProject(TSCONFIG, TSOPTIONS);  

function appJS() {
  const tsResult = gulp
    .src(path.join('src/client', '**/*.ts'))
    .pipe($$.sourcemaps.init())
    .pipe($$.typescript(tsProject))
 
  return merge([
    tsResult.dts
      .pipe($$.sourcemaps.write('.'))
      .pipe(gulp.dest('.tmp/serve/dts')),
    tsResult.js
      .pipe($$.sourcemaps.write('.'))
      .pipe(gulp.dest('.tmp/serve'))
  ]);   
}

function appWatch() {
  gulp.watch(['src/client/**/*.ts'], appJS); 
  gulp.watch(['src/client/**/*.scss'], appCSS);  
}

function appServe() {
  const bsync = browserSync.create();
  bsync.init({
    files: ['.staging/serve/**/*.{css,js}', 'src/client/**/*.html'],
    server: {
      baseDir: [ './tmp/serve', 'src/client' ],
      middleware: [ 
        modrewrite(['!\\.\\w+$ /index.html [L]']) 
      ],
      routes: { '/jspm_packages': 'jspm_packages' }
    }
  });    
}

function bundleJS() {
    
}