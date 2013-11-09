define([
  'jquery',
  'application',
  'es5-shim'
],
function ($, application) {
  $(application.start.bind(application));
});
