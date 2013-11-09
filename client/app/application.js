define([
  'backbone.marionette',
  'game/game_session'
],
function (Marionette) {
  var application = new Marionette.Application();

  application.addRegions({
    mainRegion: '#cinema-fu'
  });

  application.addInitializer(function () {
    console.log('yay')
  });

  return application;
});
