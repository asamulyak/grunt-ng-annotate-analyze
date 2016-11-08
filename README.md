# grunt-ng-annotate-analyze

> Grunt plugin to identify non annotated components

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-ng-annotate-analyze --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ng-annotate-analyze');
```

## The "ng_annotate_analyze" task

### Overview
In your project's Gruntfile, add a section named `ng_annotate_analyze` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  ng_annotate_analyze: {
    options: {
      // Task-specific options go here.
    },
    src: {
      // File lists go here.
    },
  },
});
```

### Options

#### options.fail
Type: `Boolean`
Default value: `false`

A boolean value that is used to identify if task should fail with warn message in case if any annotation adding required.

#### options.dest
Type: `String`
Default value: `result.html`

A string value that is used to identify where report should b stored.

#### options.short
Type: `Boolean`
Default value: `false`

A boolean value that is used to identify if short report should be generated (only with lines of code that were modified).


Also you can add native ng-annotation [options](https://github.com/olov/ng-annotate/blob/master/OPTIONS.md)



### Usage Examples

#### Base configuration

```js
grunt.initConfig({
  ng_annotate_analyze: {
    options: {},
    src: ['app/**/*.js', '!app/**/*min.js'],
  },
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/) and [ESLint](http://eslint.org/).

## Release History
_(Nothing yet)_
