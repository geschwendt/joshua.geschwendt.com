#!/usr/bin/env node

var path = require('path');
var fs_e = require('fs-extra');

var NPM_SHRINKWRAP_FILE = 'npm-shrinkwrap.json';
var NPM_SHRINKWRAP_CACHED_FILE = 'node_modules/npm-shrinkwrap.cached.json';
var PROJECT_ROOT = path.join(__dirname, '..', '..');

process.chdir(PROJECT_ROOT);

fs_e.copySync(NPM_SHRINKWRAP_FILE, NPM_SHRINKWRAP_CACHED_FILE);
