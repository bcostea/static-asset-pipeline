/*global module:false*/
'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    folders: {
      out: "public",
      src: "src"
    },
    clean: {
      build: ["<%= folders.out %>"]
    },
    copy: {
      main:{
        files: [
          {expand: true, cwd: 'assets/fonts/', src: ['**'], dest: 'public/fonts/'},
          {expand: true, cwd: 'assets/images/', src: ['**'], dest: 'public/img/'},
          {expand: true, cwd: 'assets/javascript/', src: ['**'], dest: 'public/js/'},
          {expand: true, cwd: 'assets/html/', src: ['**'], dest: 'public/'}
        ]
      }
    },
    requirejs: {
      almond :{
        options:{
          baseUrl: 'assets/javascript',
          mainConfigFile: 'assets/javascript/main.js',
          include: ['app/application'],
          out : 'public/js/main.almond.js',
          name:'almond',
          optimize:'none',
          almond:true,
          wrap:true
        }
      }
    },
    replace: {
      test: {
        src: 'public/index.html',
        dest: 'public/index.html',
        replacements: [{
          from: './js/lib/require.js',
          to: './js/main.almond.js'
        },
        {
          from:'data-main =\'js/main\'',
          to: ''
        }]
      },
      prod: {
        src: 'public/index.html',
        dest: 'public/index.html',
        replacements: [{
          from: './js/lib/require.js',
          to: './js/main.min.js'
        },
        {
          from:'data-main =\'js/main\'',
          to: ''
        },
        {
          from:'href="app.css"',
          to:'href="app.min.css"'
        }]
      }

    },
    uglify: {
      build: {
        src: 'public/js/main.almond.js',
        dest: 'public/js/main.min.js'
      }
    },
    watch: {
      scripts: {
        files: ['assets/javascripts/*.js'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['assets/sass/*.sass'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      },
      html: {
        files: ['assets/html/*.html'],
        tasks: ['copy'],
        options: {
          spawn: false,
        }
      }
    },
    sass: {
      dist: {
        files: {
          'public/app.css': 'assets/sass/app.sass'
        }
      }
    },
    concat_css: {
      all: {
        src: ["assets/css/*.css", "public/app.css"],
        dest: "public/app.css"
      },
    },
    csslint: {
      default: {
        options: {
          'adjoining-classes': false,
          'important': false,
          'outline-none': false,
          'overqualified-elements': false
        },
        src: '<%= folders.out %>/app.css'
      }
    },
    cssmin: {
      default: {
        options: {
          report: 'min'
        },
        files: {
          '<%= folders.out %>/app.min.css': ['<%= folders.out %>/app.css']
        }
      }
    },
    htmlmin: {
      release: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'public/index.html': 'public/index.html'
        }
      }
    }});

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');  // Concatenate JS
    grunt.loadNpmTasks('grunt-contrib-watch');   // Watch those files
    grunt.loadNpmTasks('grunt-contrib-sass');    // Preprocess that CSS
    grunt.loadNpmTasks('grunt-concat-css');      // Concatenate lib CSSs
    grunt.loadNpmTasks('grunt-contrib-copy');    // Copy assets (img, fonts)
    grunt.loadNpmTasks('grunt-contrib-clean');   // duh..
    grunt.loadNpmTasks('grunt-contrib-cssmin');   // duh..
    grunt.loadNpmTasks('grunt-contrib-requirejs'); // duh..
    grunt.loadNpmTasks('grunt-contrib-uglify'); // duh..
    grunt.loadNpmTasks('grunt-text-replace'); // duh..
    grunt.loadNpmTasks('grunt-contrib-htmlmin'); // duh..

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['build']);

    grunt.registerTask('build', ['clean:build', 'copy', 'sass', 'concat_css']);
    grunt.registerTask('debug', ['build', 'requirejs', 'replace:test' ]);
    grunt.registerTask('release', ['build', 'requirejs', 'replace:prod', 'uglify', 'cssmin', 'htmlmin:release' ]);

};
