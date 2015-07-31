import _ from 'lodash';
import fs from 'fs';
import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import swig from 'swig';
import swigMarked from 'swig-marked';
import through from 'through2';

// Get config from config.js
import config from '../config';

function swigTemplate(options) {

  let defaults = {
    templateDir: 'src/templates',
    templateExt: '.swig',
    swigOptions: {},
    useTemplate: false
  };

  options = _.assign(defaults, options);

  return through.obj((file, enc, cb) => {

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-swig-template', 'Streaming not supported'));
      return;
    }

    let globalData = file.globalData || {},
    localData = file.localData || {},
    localDataPath = gutil.replaceExtension(file.path, '.json'),
    template,
    templatePath,
    frontmatterData = file.frontmatter || {},
    markdownData,
    swigOptions,
    data,
    tpl;

    // Set markdown data
    markdownData = file.contents ? {
      body: file.contents.toString()
    } : {};

    // Gets Local data (if any)
    try {
      data = JSON.parse(fs.readFileSync(localDataPath));
      localData = _.assign(localData, data);
    } catch (e) {}

    /**
     * Gets templatePath for Swig
     * @param  {string} options.template [template name]
     * @return {string}                  Path to template 
     * ----
     * Priority 1 : options given by user 
     * Priority 2 : template in frontmatter
     * Fallback   : Use self 
     */
    
    if (options.template) {
      templatePath = path.join(process.cwd(), options.templateDir, options.template + options.templateExt);
      
      try {
        fs.openSync(templatePath, 'r');
      } catch (e) {
        cb(pluginError(`${options.template}${options.templateExt} not found in ${options.templateDir}`))
      }

    } else if (!_.isEmpty(frontmatterData) && frontmatterData.template) {
      templatePath = path.join(file.cwd, options.templateDir, frontmatterData.template + options.templateExt);

      try {
        fs.openSync(templatePath, 'r');
      } catch (e) {
        cb(pluginError(`${frontmatterData.template}${options.templateExt} not found in ${options.templateDir}`))
      }
      
    } else {
      // use self if no templates found 
      templatePath = file.path;
    }

    // Sets swig cache to false to
    swigOptions = _.assign(options.swigOptions, {cache: false});

    // Adds Marked tag & filter to Swig
    swigMarked.useTag(swig);
    swigMarked.useFilter(swig);
    swigMarked.configure(config.blog.markdownOptions);

    // Compiles Template 
    swig.setDefaults(options.swigOptions);
    try {
      template = swig.compileFile(templatePath);
    } catch (e) {
      console.log(e);
    }

    // Renders template with data
    data = _.assign(globalData, frontmatterData, markdownData, localData);

    file.contents = new Buffer(template(data));

    cb(null, file);
  });
}

function pluginError(message) {
  return new gutil.PluginError('gulp-swig-templates', message);
}

module.exports = swigTemplate;
