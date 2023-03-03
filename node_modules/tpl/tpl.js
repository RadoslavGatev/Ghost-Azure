// tpl - a general purpose template cli
// (c) 2011 Paul Vorbach. Licensed under MIT.
;(function() {

var fs = require('fs');
var path = require('path');
var confdir = require('confdir');
var append = require('append');

// default configuration
var defaultConf = {
  parsers: {
    default: 'props-markdown'
  },
  templates: {
    default: {
      file: 'default.ejs',
      engine: 'ejs',
      ext: '.txt'
    }
  },
  properties: {}
};

function apply(file, opt, cb) {
  // look for configuration directory
  confdir(process.cwd(), 'conf', function(err, dir) {
    try {
      if (err)
        dir = path.resolve(__dirname, '.tpl');

      // read configuration file
      var json = fs.readFileSync(path.resolve(dir, 'conf.json'), 'utf8');
      var conf = JSON.parse(json);
      // set configuration
      conf = append(defaultConf, conf);

      var ext = path.extname(file);
      var parser;
      // determine parser
      if (typeof conf.parsers[ext] != 'undefined')
        parser = conf.parser[ext];
      else
        parser = conf.parsers.default;
      // require parser
      parser = require(path.resolve(dir, 'parsers', parser + '.js'));

      // overwrite global properties
      opt = append(conf.properties, opt);

      // parse file
      var doc = append(opt, parser(file));

      var tpl;
      // determine template and engine
      if (typeof doc.template != 'undefined')
        tpl = conf.templates[doc.template]
      else
        tpl = conf.templates.default;

      // resolve template file
      tpl.file = path.resolve(dir, 'templates', tpl.file);
      // require template engine
      tpl.engine = require(path.resolve(dir, 'templates', tpl.engine + '.js'));

      // render
      cb(null, tpl.engine(tpl.file, doc));
    } catch (err) {
      cb(err);
    }
  });
}

module.exports.apply = apply;

}).call(this);
