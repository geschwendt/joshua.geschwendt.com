'use strict';

import gulp from 'gulp';
import typedoc from 'gulp-typedoc';

export function client_docs() {
  return gulp
    .src(['src/client/**/*.ts'])
    .pipe(typedoc({
      module: "system",
      target: "es5",
      out: "docs/client/",
	  name: "Joshua L Geschwendt User Interface"
    }));
}