var require = {
  baseUrl: '/app',

  paths: {
    'spec': '../spec',
    'jquery': '../vendor/js/jquery',
    'underscore': '../vendor/js/underscore',
    'backbone': '../vendor/js/backbone',
    'backbone.marionette': '../vendor/js/backbone.marionette',
    'backbone.babysitter': '../vendor/js/backbone.babysitter',
    'backbone.wreqr': '../vendor/js/backbone.wreqr',
    'hbs': '../vendor/js/hbs',
    'sinon': '../vendor/js/sinon',
    'jasmine': '../vendor/js/jasmine',
    'jasmine-html': '../vendor/js/jasmine-html',
    'jasmine-jquery': '../vendor/js/jasmine-jquery',
    'jasmine-sinon': '../vendor/js/jasmine-sinon',
    'foundation': '../vendor/js/foundation',
    'es5-shim': '../vendor/js/es5-shim'
  },

  shim: {
    'backbone': {
      exports: 'Backbone',
      deps: ['underscore', 'jquery']
    },

    'underscore': {
      exports: '_'
    },

    'sinon': {
      exports: 'sinon'
    },

    'jasmine-jquery': {
      deps: ['jquery'],
      exports: 'jasmine'
    },
    'jasmine-sinon': ['sinon'],
    'jasmine': {
      exports: 'jasmine'
    },
    'jasmine-html': ['jasmine'],

    'foundation': {
      deps: ['jquery'],
      exports: 'Foundation'
    }
  }
};
