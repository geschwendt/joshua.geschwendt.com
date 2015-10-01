'use strict';

import gulp from 'gulp';
import load from 'gulp-load-plugins';

const $$ = load({ lazy: true });

export function build_css() {
  return gulp
    .src('src/client/**/*.scss')
    .pipe($$.sourcemaps.init())
    .pipe($$.sass().on('error', $$.sass.logError))
    .pipe($$.sourcemaps.write('.'))
    .pipe(gulp.dest('tmp/serve'))
}

export function minify_css() {
  return gulp
    .src('tmp/serve/**/*.css')
    .pipe($$.csso())
    .pipe(gulp.dest('dist'));
}