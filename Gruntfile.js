module.exports = function(grunt) {
  grunt.initConfig({
    exec: {
      server_spec: {
        command: function() {
           return './node_modules/.bin/jasmine-node server --forceexit';
        }
      },
      watch_server_spec: {
        command: function() {
          return './node_modules/.bin/jasmine-node server --autotest --watch server --color';
        }
      },
    },

    jshint: {
      options: {
        jshintrc: true
      },
      all: ['client/**/*.js', 'server/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('dev', 'exec:watch_server_spec');
  grunt.registerTask('default', ['jshint', 'exec:server_spec']);
};
