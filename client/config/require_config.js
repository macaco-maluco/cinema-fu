var require = {
  baseUrl: '/',

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

    'foundation': {
      deps: ['jquery'],
      exports: 'Foundation'
    }
  }
};
