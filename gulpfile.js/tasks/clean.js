'use strict';

import del from 'del';

import { MANIFEST } from '../manifest';

export function clean_docs(done) {
  del([ MANIFEST.DOCS ]).then(() => done());  
}

export function clean_reports(done) {
  del([ MANIFEST.REPORTS ]).then(() => done());    
}

export function clean_stage(done) {
  del([ MANIFEST.DEST.STAGE ]).then(() => done());
}

export function clean_build(done) {
  del([ MANIFEST.DEST.BUILD ]).then(() => done());  
}