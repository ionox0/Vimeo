'use-strict';

var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('grunt-browserify');

  grunt.initConfig({
    // Configure dirs:
    app: {
      srcDir: 'channels-app',
      buildDir: 'build',
      testDir: 'test'
    },
    watch: {
      options: {
        livereload: true
      },
      files: ['<%= app.srcDir %>/**/*'],
      tasks: ['default']
    },
    browserify: {
      client: {
        src: '<%= app.srcDir %>/**/*.js',
        dest: 'build/bundle.js',
        options: {}
      }
    },
    connect: {
      server: {
        options: {
          hostname: '*',
          port: 3005,
          base: '<%= app.buildDir %>',
          middleware: function (connect) {
            return [
              mountFolder(connect, 'build')
            ];
          }
        }
      }
    },
    clean: {
      dev: ['<%= app.buildDir %>/**/*']
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'channels-app/**/*.js',
        'test/spec/**/*.js'
      ]
    },
    mocha: {
      all: {
        src: ['test/**/*.html'],
        options: {
          reporter: 'Nyan',
          run: true,
          log: true
        }
      }
    },
    // compass: {
    //   options: {
    //     sassDir: '<%= app.srcDir %>/styles',
    //     cssDir: '.tmp/styles',
    //     imagesDir: '<%= app.srcDir %>/images',
    //     javascriptsDir: '<%= app.srcDir %>/scripts',
    //     fontsDir: '<%= app.srcDir %>/assets/fonts',
    //     importPath: '<%= app.srcDir %>/components',
    //     relativeAssets: true
    //   },
    //   server: {
    //   }
    // },
    // useminPrepare: {
    //   html: '<%= app.srcDir %>/index.html',
    //   options: {
    //     dest: '<%= app.buildDir %>'
    //   }
    // },
    // usemin: {
    //   html: ['<%= app.srcDir %>/**/*.html'],
    //   css: ['<%= app.srcDir %>/styles/**/*.css'],
    //   options: {
    //     dirs: ['<%= app.srcDir %>']
    //   }
    // },
    sass: {
      options: {
        sourceMap: true
      },
      dev: {
        files: {
          '<%= app.buildDir %>/main.css': '<%= app.srcDir %>/styles/main.scss'
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= app.srcDir %>/styles/application.css': [
            '.tmp/styles/**/*.css',
            '<%= app.srcDir %>/styles/**/*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
            /*removeCommentsFromCDATA: true,
            // https://github.com/yeoman/grunt-usemin/issues/44
            //collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= app.srcDir %>',
          src: '*.html',
          dest: '<%= app.buildDir %>'
        }]
      }
    },
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: '<%= app.srcDir %>',
          dest: '<%= app.srcDir %>',
          src: ['**/*.js']
        }, {
          expand: true,
          cwd: '<%= app.srcDir %>',
          dest: '<%= app.srcDir %>',
          src: ['**/*.js']
        }]
      }
    },
    // rev: {
    //   options: {
    //     encoding: 'utf8',
    //     algorithm: 'md5',
    //     length: 8
    //   },
    //   files: {
    //     src: [
    //       '<%= app.srcDir %>/scripts/*.js',
    //       '<%= app.srcDir %>/styles/*.css',
    //       '<%= app.srcDir %>/assets/fonts/**/*.{eot,svg,ttf,woff,otf}'
    //     ]
    //   }
    // },
    // bower: {
    //   all: {
    //     rjsConfig: '<%= app.srcDir %>/scripts/main.js'
    //   }
    // },
    jst: {
      compile: {
        files: {
          'build/templates.js': '<%= app.srcDir %>/**/*.html'
        },
        options: {
          processName: function (filename) {
            return filename.replace(/.*\//, '').replace('.html', '');
          },
          processContent: function (src) {
            return src.replace(/<!--.*-->/g, '').
              replace(/\s{2,}/gm, ' '). // reduce source multiple spaces (2 or more)
              replace(/\n/g, '');       // strip source newlines
          }
        }
      }
    }
  });

  grunt.registerTask('default', [
    'clean:dev',
    'jshint',
    'mocha',
    'browserify',
    'sass',
    //'copy',
    'jst',
    //'cssmin',
    'htmlmin',
    //'bower',
    //'compass',
    //'usemin'
    //'uglify',
    //'concat',
    //'rev',
    'connect',
    'watch'
  ]);
};
