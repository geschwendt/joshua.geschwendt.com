'use strict';

var fs = require('fs');
var path = require('path');

var NPM_SHRINKWRAP_FILE = 'npm-shrinkwrap.json';
var NPM_SHRINKWRAP_CACHED_FILE = 'node_modules/npm-shrinkwrap.cached.json';

var FS_OPTS = { encoding: 'utf-8' };
var PROJECT_ROOT = path.join(__dirname, '../../../');

/**
 * Module Exports
 */
module.exports = checkNodeModules;


/**
 * Check Node Modules
 * 
 * @access public
 * @param purgeIfStale
 * @return boolean
 */
function checkNodeModules(purgeIfStale) {    
  var nodeModulesOK = _checkCache(NPM_SHRINKWRAP_FILE, NPM_SHRINKWRAP_CACHED_FILE);
  
  if (nodeModulesOK) {   
    process.stdout.write(':) npm dependencies are lookin\' good!');
    return nodeModulesOK;
  } 
   
  if (purgeIfStale) {
    process.stderr.write(':( npm dependencies are stale!\n');
    process.stderr.write('   purging...\n');

    var nodeModulesPath = path.join(PROJECT_ROOT, 'node_modules');

    if (fs.existsSync(nodeModulesPath)) {
      _deleteDir(nodeModulesPath);
    }
    
    return nodeModulesOK;
  }
  
  process.stderr.write(':( npm dependencies are in as unknown state!\n');
  process.stderr.write('   run `npm install`\n');
  return nodeModulesOK;
}

/**
 * Check Cache
 * 
 * @access private
 * @param markerFile
 * @param cachedMarkerFile
 * @return boolean
 */
function _checkCache(markerFile, cachedMarkerFile) {
  var absoluteMarkerFilePath = path.join(PROJECT_ROOT, markerFile);
  var absoluteCachedMarkerFilePath = path.join(PROJECT_ROOT, cachedMarkerFile);

  if (!fs.existsSync(absoluteCachedMarkerFilePath)) {
      return false;
  }
  
  var markerContent = fs.readFileSync(absoluteMarkerFilePath, FS_OPTS);
  var cacheMarkerContent = fs.readFileSync(absoluteCachedMarkerFilePath, FS_OPTS);

  return markerContent == cacheMarkerContent;
}


/**
 * Delete Directory - a recursive implementation
 * 
 * @access private
 * @param path
 */
function _deleteDir(path) {
  if (fs.existsSync(path)) {
    var subpaths = fs.readdirSync(path);
    
    subpaths.forEach(function(subpath) {
      var curPath = path + '/' + subpath;
      
      if (fs.lstatSync(curPath).isDirectory()) {
        _deleteDir(curPath);
        return;
      } 
      
      fs.unlinkSync(curPath);
    });
    
    fs.rmdirSync(path);
  }
}