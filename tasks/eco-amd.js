/*
 * grunt-eco-amd
 * https://github.com/grundjoseph/grunt-eco-amd
 *
 * Copyright (c) 2012 Joe Grund
 * Licensed under the MIT license.
 */

/**
 * Compiles an eco template with an AMD compatible function wrapper.
 * @param {String} source The contents of the file to compile.
 * @param {Function} callback Function to call with the compiled template as an argument.
 * @return {undefined}
 */
function compileEco(source, callback) {
  'use strict';

  var indent = require('eco/lib/util').indent;
  var compiled = 'define(function () {\nreturn ' + indent(require('eco').precompile(source), 2).slice(2) + ' \n});\n';

  callback(compiled);
}

module.exports = function (grunt) {
  'use strict';

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  grunt.registerMultiTask('eco_amd', 'Compile Eco files into Define wrapped JS files', function () {
    this.requiresConfig('eco_amd');

    var path = require('path');
    var helpers = require('grunt-lib-contrib').init(grunt);

    var options = helpers.options(this, {
      basePath: false
    });

    var basePath;
    var srcFiles;
    var newFileDest;

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || helpers.normalizeMultiTaskFiles(this.data, this.target);

    this.files.forEach(function (file) {
      file.dest = path.normalize(file.dest);
      srcFiles = grunt.file.expand(file.src);

      basePath = helpers.findBasePath(srcFiles, options.basePath);

      srcFiles.forEach(function (srcFile) {
        var source = grunt.file.read(srcFile);
        newFileDest = helpers.buildIndividualDest(file.dest, srcFile, basePath);

        compileEco(source, function (compiled) {
          grunt.file.write(newFileDest, compiled);
          grunt.log.writeln('File ' + newFileDest + ' created.');
        });
      });
    });
  });
};
