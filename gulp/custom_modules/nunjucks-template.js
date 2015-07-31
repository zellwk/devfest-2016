import _ from 'lodash';
import fs from 'fs';
import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import through from 'through2';
import nunjucks from 'nunjucks';
import nunjucksMarkdown from 'nunjucks-markdown';
import consolidate from 'consolidate';
import marked from 'marked';

// Get config from config.js
import config from '../config';

function nunjuckTemplate(options) {

  let defaults = {
    templateDir: './src/templates',
    templateExt: '.nunjucks',
  };

  options = _.assign(defaults, options);

  return through.obj((file, enc, cb) => {

    if (file.isStream()) {
      cb(new gutil.PluginError('nunjucks-template', 'Streaming not supported'));
      return;
    }

    let globalData = file.globalData || {},
    localData = file.localData || {},
    localDataPath = gutil.replaceExtension(file.path, '.json'),
    frontmatterData = file.frontmatter || {},
    markdownData,
    templatePath,
    data;

    // Set markdown data
    markdownData = file.contents ? {
      body: file.contents.toString()
    } : {};

    // Gets Local data (if any)
    try {
      data = JSON.parse(fs.readFileSync(localDataPath));
      localData = _.assign(localData, data);
    } catch (e) {}

    // consolidates data
    data = _.assign(globalData, frontmatterData, markdownData, localData);

    /**
     * Figures out Template Path
     * Priority 1 : options given by user 
     * Priority 2 : template in frontmatter
     * Fallback   : Use self 
     */

    if (options.template) {
      templatePath = path.join(process.cwd(), options.templateDir, options.template + options.templateExt);

      try {
        fs.openSync(templatePath, 'r');
      } catch (e) {
        cb(pluginError(`${options.template}${options.templateExt} not found in ${options.templateDir}`));
      }

    } else if (!_.isEmpty(frontmatterData) && frontmatterData.template) {
      templatePath = path.join(file.cwd, options.templateDir, frontmatterData.template + options.templateExt);

      try {
        fs.openSync(templatePath, 'r');
      } catch (e) {
        cb(pluginError(`${frontmatterData.template}${options.templateExt} not found in ${options.templateDir}`));
      }

    } else {
      templatePath = file.path;
    }
    
    // Setting configuration defaults 
    // Note: Replace Nunjucks with another generator if you want to
    
    // nowatch, nocache
    let env = consolidate.requires.nunjucks = new nunjucks.Environment(new nunjucks.FileSystemLoader(options.templateDir, true, true));

    // Registers markdown tag
    marked.setOptions(config.blog.markdownOptions);
    nunjucksMarkdown.register(env, marked);

    // Renders Template
    consolidate.nunjucks(templatePath, data)
      .then((html)=> {
        file.contents = new Buffer(html);        
        cb(null, file);
      })
      .catch((err) => {
        // problems with using gulp.Util Plugin error, hence just logging.
        console.log(err);
      });

  });
}

function pluginError(message) {
  return new gutil.PluginError('gulp-swig-templates', message);
}

module.exports = nunjuckTemplate;
