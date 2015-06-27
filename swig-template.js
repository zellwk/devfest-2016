import _ from 'lodash';
import fs from 'fs';
import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import swig from 'swig';
import through from 'through2';

function swigTemplate(options) {

  return through.obj((file, enc, cb) => {

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-swig-template', 'Streaming not supported'));
      return;
    }
    // Practical defaults for options
    options = _.assign({
      template: file.frontmatter ? file.frontmatter.layout : 'post',
      templateFolder: 'src/templates',
      templateExt: '.html',
      swigOptions: {},
      useTemplate: false
    }, options);

    let dataPath = gutil.replaceExtension(file.path, '.json'),
      template = options.useTemplate ? path.join(file.cwd, options.templateFolder, options.template + options.templateExt) : file.path,
      data,
      tpl;

    if (options.useTemplate) {
      // throws error if no template found 
      if (!fs.existsSync(template)) {
        let err = {};
        err.templateFolder = path.join(file.cwd, options.templateFolder)
        cb(new gutil.PluginError('gulp-swig-template', `${options.template}${options.templateExt} is not found in ${err.templateFolder}`))
      }
    }

    // Reads data from json file with the same name

    if (fs.existsSync(dataPath)) {
      data = JSON.parse(fs.readFileSync(dataPath));
    }

    // Set Swig options
    swig.setDefaults(options.swigOptions);

    // Compile Swig template
    tpl = swig.compileFile(template, {
      'autoescape': false
    });

    // Render Swig template
    if (options.useTemplate) {
      data = _.assign(file.frontmatter, {
        body: file.contents.toString()
      }, data);
    } else {
      data = _.assign({
        body: file.contents.toString()
      }, data);
    }

    file.contents = new Buffer(tpl(data));

    cb(null, file);
  });
}

module.exports = swigTemplate;
