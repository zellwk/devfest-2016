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
import stripJSONComments from 'strip-json-comments';

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

    let 
    // globalData = file.globalData || {},
    data = {},
    localData = file.localData || {},
    frontmatterData = file.frontmatter || {},
    markdownData,
    templatePath;

    // Set markdown data to (if any)
    markdownData = file.contents ? {
      body: file.contents.toString()
    } : {};

    // Gets data from data (if any)
    
    if (options.data) {
      data = getDataFromSource(options.data, data);
    }

    // Gets data from additional sources (if any)
    if (file.frontmatter) {
      let sources = file.frontmatter.data || file.frontmatter.sources;
      if (_.isString(sources)) {
        localData = getDataFromSource(sources, localData);
      } else if (_.isArray(sources)) {
        _.forEach(sources, (source) => {
          localData = getDataFromSource(source, localData);
        });
      }
    }

    // consolidates data
    data = _.assign(data, frontmatterData, markdownData, localData);

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
    let env = consolidate.requires.nunjucks = new nunjucks.Environment(new nunjucks.FileSystemLoader(options.templateDir, {
        watch: false,
        nocache: true
      }));

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
      cb(pluginError(err));
    });

  });
}

function pluginError(message) {
  return new gutil.PluginError('templator', message);
}

// Gets JSON data from file path and assign to given data object
function getDataFromSource(filepath, returnedData = {}) {
  try {
    let data = JSON.parse(stripJSONComments(fs.readFileSync(filepath).toString()));
    returnedData = _.assign(returnedData, data);
  } catch (e) {
    gutil.log(gutil.colors.red(`Data in ${filepath} is not valid JSON`));
  };

  return returnedData;
}

module.exports = nunjuckTemplate;
