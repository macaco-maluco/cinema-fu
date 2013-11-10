define([
  'backbone',
  'backbone.marionette',
  'jquery',
  'spec/fixture/graph_fixture',
  'challenge/node',
  'challenge/challenge',
  'challenge/challenge_view',
  'es5-shim'
],
function (Backbone, Marionette, $, fixture, Node, Challenge, ChallengeView) {
  var application = new Marionette.Application();

  application.addRegions({
    mainRegion: '#cinema-fu'
  });

  application.addInitializer(function () {
    var graph = fixture();

    new Router().on("route:startChallenge", function (from, to) {
      var fromNode = new Node({ id: from }),
          toNode = new Node({ id: to }),
          challenge = new Challenge({ start: fromNode, goal: toNode });

      $.when(fromNode.fetch(), toNode.fetch()).then(function () {
        application.mainRegion.show(new ChallengeView({ model: challenge }));
      });
    });

    Backbone.history.start();
  });

  var Router = Backbone.Router.extend({
    routes: {
      'from/:from/to/:to': "startChallenge"
    }
  });

  $(application.start.bind(application));
});
