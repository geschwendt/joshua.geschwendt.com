/* global process */

'use strict';

import gulp from 'gulp';
import path from 'path';
import load from 'gulp-load-plugins';

import merge from 'merge2';

const $$ = load({ lazy: true });

const TSCONFIG = require(path.join(process.cwd(), 'src/client/tsconfig.json')).compilerOptions;
const TSOPTIONS = { 
    typescript: require('typescript') 
}; 

const tsProject = $$.typescript.createProject(TSCONFIG, TSOPTIONS);  

export function build_js() {
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

export function bundle_js(done) {
   
  const Builder = require('systemjs-builder');
  const builder = new Builder();
  const system = {
    import: './tmp/serve/app/index.js',
    export: './tmp/build/app/index.js',
    config: {}
  }
     
  builder.loadConfig('src/client/system.cfg.js').then(() => {
    builder.buildStatic(
      system.import, 
      system.export, 
      system.config
    ).then(() => done());
  });
}

export function minify_js() {
  return gulp
    .src('tmp/build/**/*.js')
    .pipe($$.uglify())
    .pipe(gulp.dest('dist'));
}