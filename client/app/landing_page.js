define([
  'jquery',
  'backbone.marionette',
  'landing_page/search_box_view',
  'es5-shim'
],
function ($, Marionette, SearchBoxView) {
  var application = new Marionette.Application();

  application.addRegions({
    mainRegion: '#cinema-fu'
  });

  application.addInitializer(function () {
    new SearchBoxView({ el: $('.from-node') }).render();
    new SearchBoxView({ el: $('.to-node') }).render();
  });

  $(application.start.bind(application));
});
