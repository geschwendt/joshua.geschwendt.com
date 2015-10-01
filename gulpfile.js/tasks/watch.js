'use strict';

import gulp from 'gulp';

import { build_js, bundle_js, minify_js} from './scripts';
import { build_css, minify_css } from './styles';

export function watch_tmp() {
  gulp.watch(['src/client/**/*.ts'], gulp.series(build_js, bundle_js)); 
  gulp.watch(['src/client/**/*.scss'], build_css);  
}

export function watch_dist() {
  gulp.watch(['src/client/**/*.ts'], gulp.series(build_js, bundle_js, minify_js)); 
  gulp.watch(['src/client/**/*.scss'], gulp.series(build_css, minify_css));  
}