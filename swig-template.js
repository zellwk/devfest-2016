import _ from 'lodash';
import fs from 'fs';
import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import swig from 'swig';
import through from 'through2';

function swigTemplate(options) {

  let defaults = {
    template: 'layout',
    dirname: 'src/templates',
    extname: '.html',
    swigOptions: {},
    useTemplate: false
  };

  options = _.assign(defaults, options);

  return through.obj((file, enc, cb) => {

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-swig-template', 'Streaming not supported'));
      return;
    }

    let localData = {},
      localDataPath = gutil.replaceExtension(file.path, '.json'),
      template,
      templatePath,
      frontmatterData,
      markdownData,
      data,
      tpl;

    // Set fallback for data
    frontmatterData = file.frontmatter ? file.frontmatter : {};
    markdownData = file.contents ? {
      body: file.contents.toString()
    } : {};


    // Gets Local data (if any)
    if (fs.existsSync(localDataPath)) {
      localData = JSON.parse(fs.readFileSync(localDataPath));
    }

    // Gets Template (if any)
    if (!_.isEmpty(options.template)) {
      templatePath = path.join(file.cwd, options.dirname, options.template + options.extname);

      // Throws error if no template found 
      if (!fs.existsSync(templatePath)) {
        cb(new gutil.PluginError('gulp-swig-templates', `${options.template}${options.extname} not found in ${options.dirname}`));
      }
    }

    // // Compiles Template 
    swig.setDefaults(options.swigOptions);

    template = swig.compileFile(templatePath, {
      'autoescape': false
    });

    // Renders template with data
    data = _.assign(frontmatterData, markdownData, localData);

    file.contents = new Buffer(template(data));

    cb(null, file);
  });
}

module.exports = swigTemplate;
