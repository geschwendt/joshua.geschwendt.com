import gulp from 'gulp';
import load from 'gulp-load-plugins';

import path from 'path';
import { spawn } from 'child_process';

import del from 'del';
import merge from 'merge2';

import browserSync from 'browser-sync';
import modrewrite from 'connect-modrewrite';

import karma from 'karma';

const $$ = load({ lazy: true });

/// set the gulp enviornment 
process.env.GULP_ENV = !process.env.TRAVIS 
  ? 'development' 
  : 'production';

// ----------------
// default

gulp.task('default', () => {
  console.log(gulp.tree());
});


// ----------------
// clean

gulp.task('clean.all', gulp.series(clean_dist, clean_docs, clean_reports, clean_tmp));

gulp.task('clean.dist',    clean_dist);
gulp.task('clean.docs',    clean_docs);
gulp.task('clean.reports', clean_reports);
gulp.task('clean.tmp',     clean_tmp);

function clean_dist(done) {
  del(['dist']).then(() => done());  
}

function clean_docs(done) {
  del(['docs']).then(() => done());  
}

function clean_reports(done) {
  del(['reports']).then(() => done());    
}

function clean_tmp(done) {
  del(['tmp']).then(() => done());
}


// ----------------
// serve

gulp.task('serve', // broken
  gulp.series(
    clean_tmp,  
    gulp.parallel(
      build_css_tmp,
      gulp.series(build_js, bundle_js)
    ),
    gulp.parallel(
      watch_tmp,
      serve_tmp  
    )
));

gulp.task('serve:dist', 
  gulp.series(
    gulp.series(clean_tmp, clean_dist),  
    gulp.parallel(
      build_css_tmp,
      gulp.series(build_js, bundle_js, minify_js)
    ),
    gulp.parallel(
      watch_dist,
      serve_tmp   //FIXME
    )    
  )
);


// ----------------
// test

gulp.task('test', 
  gulp.series(  
    gulp.series(clean_tmp, clean_reports),
    gulp.series(build_js), 
    run_karma, 
    end_karma
  )
);

gulp.task('test:dist', 
  gulp.series(  
    gulp.series(clean_tmp, clean_reports),
    gulp.series(build_js), 
    run_karma, 
    end_karma
  )
);

function run_karma(done) {
  new karma.Server({ configFile: path.join(process.cwd(), '/src/client/test/karma.cfg.js') }, done).start();
}

function end_karma() {
  return process.env.TRAVIS 
    ? gulp.src('reports/coverage/**/lcov.info').pipe($$.coveralls())
    : spawn('open', ['reports/coverage/html/index.html']);
}


// ----------------
// watch

function watch_tmp() {
  gulp.watch(['src/client/**/*.ts'], gulp.series(build_js, bundle_js)); 
  gulp.watch(['src/client/**/*.scss'], build_css_tmp);  
}

function watch_dist() {
  gulp.watch(['src/client/**/*.ts'], gulp.series(build_js, bundle_js, minify_js)); 
  gulp.watch(['src/client/**/*.scss'], build_css_tmp);  
}


// ----------------
// servers

function serve_tmp() {
  const bsync = browserSync.create();
  bsync.init({
    files: ['tmp/build/**/*.{css,js}', 'tmp/serve/**/*.{css,js}', 'src/client/**/*.html'],
    server: {
      baseDir: [ 'tmp/serve', 'src/client' ],
      middleware: [ 
        modrewrite(['!\\.\\w+$ /index.html [L]']) 
      ]
    }
  });    
}

function serve_dist() {
  const bsync = browserSync.create();
  bsync.init({
    files: ['dist/**'],
    server: {
      baseDir:    ['dist'],
      middleware: [modrewrite(['!\\.\\w+$ /index.html [L]'])]
    }
  });    
}


// ----------------
// css

function build_css_tmp() {
  return gulp
    .src('src/client/**/*.scss')
    .pipe($$.sourcemaps.init())
    .pipe($$.sass().on('error', $$.sass.logError))
    .pipe($$.sourcemaps.write('.'))
    .pipe(gulp.dest('tmp/serve'))
}

function build_css_dist() {
    
}


// ----------------
// js

const TSCONFIG = require('../src/client/tsconfig.json').compilerOptions;
const TSOPTIONS = { 
    typescript: require('typescript') 
}; 

const tsProject = $$.typescript.createProject(TSCONFIG, TSOPTIONS);  

function build_js() {
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

function bundle_js(done) {
   
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

function minify_js() {
  return gulp
    .src('tmp/serve/index.js')
    .pipe($$.uglify())
    .pipe(gulp.dest('tmp/serve'));
}