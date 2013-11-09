define([
  'spec/spec_helper',
  'sinon',
  'spec/fixture/graph_fixture',
  'challenge/challenge_view',
  'challenge/challenge',
  'challenge/node'
],
function (jasmine, sinon, fixture, ChallengeView, Challenge, Node) {

  describe("ChallengeView", function() {
    var challenge, view, graph;

    beforeEach(function() {
      graph = fixture();

      challenge = new Challenge({
        start: graph.kevinBacon,
        goal: graph.spielberg
      });

      view = new ChallengeView({ model: challenge }).render();
    });

    it("should render the start", function() {
      expect(view.$('.start')).toContainHtml('Kevin Bacon');
    });

    it("should render the goal", function() {
      expect(view.$('.goal')).toContainHtml('Steven Spielberg');
    });

    it("should have an empty path", function() {
      expect(view.$('.path > *').length).toEqual(0);
    });

    it("should render the available options", function() {
      expect(view.$('.available')).toContainHtml('Apollo 13');
    });

    describe("once a node is selected", function() {
      beforeEach(function() {
        view.$('.available .node').click();
      });

      it("should add the selected node to the path", function() {
        expect(view.$('.path')).toContainHtml('Apollo 13');
      });

      it("should render the next available nodes", function() {
        expect(view.$('.available')).toContainHtml('Tom Hanks');
      });
    });

    describe("once a challenge has ended", function() {
      var endChallengeObserver;

      beforeEach(function() {
        endChallengeObserver = sinon.spy();

        view.on('end', endChallengeObserver);

        challenge.trigger('end');
      });

      it("should trigger a end challenge event", function() {
        expect(endChallengeObserver).toHaveBeenCalled();
      });

      it("should not have any available nodes to select", function() {
        expect(view.$('.available > *').length).toEqual(0);
      });
    });

  });

});
