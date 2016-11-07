'use strict';

var grunt = require('grunt');

exports.ng_annotate_analyze = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    var expected = grunt.file.read("test/source/result_warn.html");
    var actual = grunt.file.read("tmp/result.html");
    test.equal(actual, expected, 'should describe what the default behavior is.');
    test.done();
  }
};
