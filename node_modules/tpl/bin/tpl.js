#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var optimist = require('optimist');
var usage = 'Usage:\n'
  + '  tpl init              Create a basic configuration directory\n'
  + '  tpl [options] [file]  Apply a template to a file\n'
  + '  tpl [-h|--help]       Show help';
var argv = optimist.argv;

// Show help
if (argv.h || argv._.length == 0)
  return console.log(usage);
// One file at a time
if (argv._.length > 1)
  return console.error('tpl can only translate one file at a time.');
if (argv._.length == 1 && argv._[0] == 'init') {
  var confdir = path.resolve(process.cwd(), '.conf');
  try {
    fs.mkdirSync(confdir);
    fs.writeFileSync(path.resolve(confdir, 'conf.json'));
    fs.mkdirSync(path.resolve(confdir, 'templates'));
    fs.mkdirSync(path.resolve(confdir, 'parsers'));
    console.log('Created the configuration directory \''+confdir+'\'.');
  } catch (e) {
    console.error('Could not create the configuration directory \''+confdir
        +'\'.');
  }
}
// Translate file
else {
  var file = require('path').resolve(process.cwd(), argv._[0]);

  delete argv._;
  delete argv['$0'];

  require('../tpl.js').apply(file, argv, function(err, result) {
    console.log(result);
  });
}
