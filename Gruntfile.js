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
  });

  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('dev', 'exec:watch_server_spec');
  grunt.registerTask('default', 'exec:server_spec');
};
