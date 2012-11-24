# grunt-eco-amd [![Build Status](https://secure.travis-ci.org/jgrund/grunt-eco-amd.png?branch=master)](http://travis-ci.org/jgrund/grunt-eco-amd)

Compiles Eco Templates with an AMD wrapper.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-eco-amd`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-eco-amd');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation
Inside your project's `grunt.js` gruntfile add a section named ```eco_amd```.

The ```eco_amd``` section has a ```compile``` property, inside which you list the files to be placed in an amd wrapper.
Additionally, an options property can be specified inside which an basePath can be configured.

```javascript
    eco_amd: {
      compile: {
        files: {
          'temp/templates/*.js': 'app/templates/**/*.eco'
        }
      },
      options: {
        basePath: 'app/templates'
      }
    }
```

When the task runs, the templates will be compiled with an AMD wrapper function and placed in the specified path
with the specified extension.
