/*
 * grunt-ng-annotate-analyze
 * https://github.com/asamulyak/grunt-ng-annotate-analyze
 *
 * Copyright (c) 2016 Andriy Samulyak
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    eslint: {
      src: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
          eslintrc: '.eslintrc'
      }
    },

    clean: {
      tests: ['tmp']
    },

    ng_annotate_analyze: {
      default_options: {
        options: {
          dest: "tmp/result.html",
          "single_quotes": true
        },
        src: ['test/source/source_warn.js']
      }
    },

    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['clean', 'ng_annotate_analyze', 'nodeunit']);
  grunt.registerTask('default', ['eslint', 'test']);

};
