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

    $('.try-to-find').click(function () {
      var from = $('.from-node .selected-id').val(),
          to = $('.to-node .selected-id').val();

      if (from && to) {
        window.location = "/challenge.html#/from/"+from+"/to/"+to;
      }
    });
  });

  $(application.start.bind(application));
});
