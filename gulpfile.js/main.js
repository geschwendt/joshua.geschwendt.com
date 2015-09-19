import gulp from 'gulp';
import load from 'gulp-load-plugins';

import path from 'path';

import del from 'del';
import merge from 'merge2';

import browserSync from 'browser-sync';
import modrewrite from 'connect-modrewrite';

const $$ = load({ lazy: true });

process.env.GULP_ENV = 'development';

gulp.task('default', () => {
  console.log('default gulp task...');
});

gulp.task('serve', gulp.series(
  appClean,  
  gulp.parallel(
    appAssets,
    appHtml,
    appCSS,
    gulp.series(appJS, bundleJS, appJSPost)
  ),
  gulp.parallel(
    appWatch,
    appServe  
  )
));

function appClean(done) {
  del(['tmp']).then(() => done());
}

function appAssets(done) {
  done();
}

function appHtml(done) {
  done();  
}

function appCSS() {
  return gulp
    .src('src/client/**/*.scss')
    .pipe($$.sourcemaps.init())
    .pipe($$.sass().on('error', $$.sass.logError))
    .pipe($$.sourcemaps.write('.'))
    .pipe(gulp.dest('tmp/serve'))
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
      .pipe(gulp.dest('tmp/serve/dts')),
    tsResult.js
      .pipe($$.sourcemaps.write('.'))
      .pipe(gulp.dest('tmp/serve'))
  ]);   
}

function appJSPost() {
  return gulp
    .src('tmp/serve/index.js')
    .pipe($$.uglify())
    .pipe(gulp.dest('tmp/serve'));
}

function appWatch() {
  gulp.watch(['src/client/**/*.ts'], gulp.series(appJS, bundleJS)); 
  gulp.watch(['src/client/**/*.scss'], appCSS);  
}

function appServe() {
  const bsync = browserSync.create();
  bsync.init({
    files: ['tmp/build/**/*.{css,js}', 'tmp/serve/**/*.{css,js}', 'src/client/**/*.html'],
    server: {
      baseDir: [ 'tmp/serve', 'src/client' ],
      middleware: [ 
        /// this handles html5mode. 
        modrewrite(['!\\.\\w+$ /index.html [L]']) 
      ]
      //routes: { '/jspm_packages': 'jspm_packages' }
    }
  });    
}

gulp.task('bundle', bundleJS);
function bundleJS(done) {
  
  console.log(process.env.GULP_ENV)  
    
  const Builder = require('systemjs-builder');
  const builder = new Builder();
  const system = {
    import: './tmp/serve/app/index.js',
    export: './tmp/serve/index.js',
    config: {}
  }
     
  builder.loadConfigSync('src/client/config.js');
  builder.buildStatic(
    system.import, 
    system.export, 
    system.config
  ).then(() => done());
}