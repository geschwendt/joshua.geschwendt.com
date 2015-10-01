'use strict';

import del from 'del';

export function clean_dist(done) {
  del(['dist']).then(() => done());  
}

export function clean_docs(done) {
  del(['docs']).then(() => done());  
}

export function clean_reports(done) {
  del(['reports']).then(() => done());    
}

export function clean_tmp(done) {
  del(['tmp']).then(() => done());
}