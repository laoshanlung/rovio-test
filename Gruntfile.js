module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-karma');
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochaTest: {
      options: {
        timeout: 5000,
        reporter: 'spec'
      },
      unit: {
        src: ['test.js']
      }
    },

    karma: {
      unit: {
        configFile: 'karma.config.js'
      }
    },

    env: {
      test: {
        NODE_ENV: 'test'
      }
    }
  });

  grunt.registerTask('test', ['env:test', 'mochaTest:unit', 'karma:unit']);
}