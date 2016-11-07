/*
 * grunt-ng-annotate-analyze
 * https://github.com/Andriy/grunt-ng-annotate-analyze
 *
 * Copyright (c) 2016 Andriy Samulyak
 * Licensed under the MIT license.
 */

'use strict';

var diff = require("diff");
var ngAnnotate = require('ng-annotate');
var extend = require("extend");

module.exports = function (grunt) {

    var reportTMPL = "<style>.ng-annotation-report .count {font-size: 12px; font-weight: normal; color: orangered;}.ng-annotation-report div.file-name{border: 1px solid #cccccc;background-color: #cccccc;padding: 5px 10px;font-style: italic;font-weight: bold;}.ng-annotation-report div.code{border: 1px solid #cccccc;padding: 2px 2px;word-break: break-word;margin-bottom: 15px;}.ng-annotation-report .ln {white-space: nowrap;text-align: right;vertical-align: top;padding: 0 10px;background: #e4e4e4;font-family: monospace;}.ng-annotation-report .code-l {vertical-align: top;padding: 0 10px;color: grey;font-family: monospace;}.ng-annotation-report .add {background-color: #bdffbd;color: green;font-weight: bold;}.ng-annotation-report .remove {background-color: #ffb3b7;color: red;font-weight: bold;}</style>"

    function addSpacers(shortReport, notStartOrEnd) {
        if (shortReport && notStartOrEnd) {
            return "<tr><td class='ln'>...</td><td class='code-l'>...</td></tr>";
        }
        return "";
    }

    function covertToLinedTable(sourceCode, shortReport) {
        var lines = sourceCode.split("~&~");
        var tableHTML = "<table>";
        var linesLength = lines.length;
        lines.forEach(function (line, index) {
            if ((line.indexOf("data-changed") != -1 && shortReport) || !shortReport) {
                tableHTML += addSpacers(shortReport, index > 0);
                tableHTML += "<tr><td class='ln'>" + (index + 1) + "</td><td class='code-l'>" + line + "</td></tr>";
                tableHTML += addSpacers(shortReport, index < linesLength);
            }
        })
        tableHTML += "</table>";
        return tableHTML;
    }

    grunt.registerMultiTask('ng_annotate_analyze', 'Grunt plugin to identify non annotated components', function () {
        var options = this.options({
            fail: false,
            dest: 'report.html',
            short: false
        });

        var fileWithMissingInjectionCount = 0;
        var filesToAnalyze = [];


        this.files.forEach(function (srcPath) {
            filesToAnalyze = filesToAnalyze.concat(srcPath.src);
        });

        var reportHTML = reportTMPL + "<div class='ng-annotation-report'>";
        filesToAnalyze.forEach(function (filePath) {
            var sourceCode = grunt.file.read(filePath);

            var res = ngAnnotate(
                sourceCode,
                extend(true, {
                    "add": true,
                    "remove": true
                }, options || {})
            );
            var fileDiff = diff.diffWords(sourceCode, res.src);

            var fileResHTML = "";
            if (fileDiff.length > 2) {
                var modificationsCount = 0;
                fileDiff.forEach(function (part) {
                    if (part.added) {
                        modificationsCount++;
                    }
                    var cssClass = part.added ? 'add' :
                        part.removed ? 'remove' : '';
                    var dataChange = part.added || part.removed;
                    fileResHTML += "<span " + (dataChange ? "data-changed" : "") + " class='" + cssClass + "'>" + part.value.replace(/\r?\n/g, "</span>~&~<span>").replace(/\s/g, "&nbsp;") + "</span>";
                });

                reportHTML +=
                    "<div class='file-name'>" + filePath +
                    "  <span class='count'>(added: " + modificationsCount  + " injections)</span>" +
                    "</div>" +
                    "<div class='code'>" + covertToLinedTable(fileResHTML, options.short) + "</div>";

                if (modificationsCount > 0) {
                    fileWithMissingInjectionCount++;
                }
            }
        });
        reportHTML += "</div>";

        if (!options.dest) {
            grunt.log.writeln(reportHTML);
        } else {
            grunt.file.write(options.dest, reportHTML);
        }

        if (fileWithMissingInjectionCount > 0 && options.fail) {
            grunt.fail.warn("Injections missing in " + fileWithMissingInjectionCount + " file/s", 3);
        }
    });
};