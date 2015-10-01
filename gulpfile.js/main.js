/* global process */

'use strict';

import gulp from 'gulp';
import load from 'gulp-load-plugins';

import path from 'path';
import { spawn } from 'child_process';

import del from 'del';
import karma from 'karma';

import { 
  clean_stage,
  clean_build, 
  clean_docs, 
  clean_reports 
} from './tasks/clean';

import { build_js, bundle_js, minify_js } from './tasks/scripts';
import { build_css, minify_css } from './tasks/styles';
import { serve_dist, serve_tmp } from './tasks/serve';
import { watch_tmp, watch_dist } from './tasks/watch';

const $$ = load({ lazy: true });


/// set the gulp enviornment 
process.env.GULP_ENV = !process.env.TRAVIS 
  ? 'development' 
  : 'production';

// ----------------
// default

gulp.task('default', () => { console.log(gulp.tree()); });


// ----------------
// clean

gulp.task('clean.all', 
  gulp.parallel(
    clean_docs, 
    clean_reports, 
    clean_stage,
    clean_build
  )
);


gulp.task('clean.docs',    clean_docs);
gulp.task('clean.reports', clean_reports);

gulp.task('clean.stage', clean_stage);
gulp.task('clean.build', clean_build);


// ----------------
// serve

gulp.task('serve', // broken
  gulp.series(
    clean_stage,  
    gulp.parallel(
      build_css,
      gulp.series(build_js, bundle_js)
    ),
    gulp.parallel(
      watch_tmp,
      serve_tmp  
    )
  )
);

gulp.task('serve:dist', 
  gulp.series(
    gulp.series(clean_stage, clean_build),  
    gulp.parallel(
      gulp.series(build_css, minify_css),
      gulp.series(build_js, bundle_js, minify_js),
      copy_html
    ),
    gulp.parallel(
      watch_dist,
      serve_dist
    )    
  )
);

gulp.task('build', 
  gulp.series(
    gulp.series(clean_stage, clean_build),  
    gulp.parallel(
      gulp.series(build_css, minify_css),
      gulp.series(build_js, bundle_js, minify_js),
      copy_html
    )
  )
);

// ----------------
// test

gulp.task('test', 
  gulp.series(  
    gulp.series(clean_stage, clean_reports),
    gulp.series(build_js), 
    run_karma, 
    end_karma
  )
);

gulp.task('test:dist', 
  gulp.series(  
    gulp.series(clean_stage, clean_reports),
    gulp.series(build_js), 
    run_karma, 
    end_karma
  )
);

function run_karma(done) {
  const configFile = path.join(process.cwd(), '/src/client/test/karma.cfg.js');
  new karma.Server({ configFile }, done).start();
}

function end_karma(done) {
  done();  
  // return process.env.TRAVIS 
    // ? gulp.src('reports/coverage/**/lcov.info').pipe($$.coveralls())
    // : spawn('open', ['reports/coverage/html/index.html']);
}


// ----------------
// html

function copy_html() {
  return gulp
    .src('src/client/index.html')
    .pipe(gulp.dest('dist'));
}

gulp.task('deploy', deploy);

function deploy() {
  if (!process.env.TRAVIS) {
    return gulp
      .src('dist/**/*')
      .pipe($$.ghPages());
  }
}


// register cleanup listener for ctrl+c/kill used to quit any persistent tasks (autotest or serve tasks)
process.on('SIGINT', function() { 
  console.log('\n\nstarting cleanup...');
  del(['dist', 'docs', 'reports','tmp']).then(() => {
    console.log('\nfinished cleanup')  
    process.exit();
  });
});