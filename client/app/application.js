define([
  'backbone.marionette',
  'spec/fixture/graph_fixture',
  'challenge/node',
  'challenge/challenge',
  'challenge/challenge_view'
],
function (Marionette, fixture, Node, Challenge, ChallengeView) {
  var application = new Marionette.Application();

  application.addRegions({
    mainRegion: '#cinema-fu'
  });

  application.addInitializer(function () {
    var graph = fixture();

    var challenge = new Challenge({
      start: graph.kevinBacon,
      goal: graph.spielberg
    });

    this.mainRegion.show(new ChallengeView({ model: challenge }));
  });

  return application;
});
