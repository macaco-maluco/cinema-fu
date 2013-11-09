define([
  'spec/spec_helper',
  'sinon',
  'spec/fixture/graph_fixture',
  'challenge/node',
  'challenge/challenge'
],
function (jasmine, sinon, fixture, Node, Challenge) {

  describe("Challenge", function() {
    var challenge, graph;

    beforeEach(function() {
      graph = fixture();

      challenge = new Challenge({
        start: graph.kevinBacon,
        goal: graph.spielberg
      });
    });

    it("should have its available nodes as all connections of the start node", function() {
      expect(challenge.availableNodes().pluck('id')).toEqual(graph.kevinBacon.connections().pluck('id'));
    });

    describe("once it is walked to a node", function() {
      beforeEach(function() {
        challenge.walkTo(challenge.availableNodes().first());
      });

      it("should update the list of available nodes", function() {
        expect(challenge.availableNodes().pluck('id')).toEqual(graph.apollo13.connections().pluck('id'));
      });
    });

    describe("once it is walked to a node an the connections are fetched assynchronously", function() {
      var nextNode;

      beforeEach(function() {
        nextNode = challenge.availableNodes().first();

        challenge.walkTo(nextNode);
      });

      it("should update the list of available nodes once a new node is add", function() {
        nextNode.connections().add(new Node({ id: 9001, name: 'new async node' }));
        expect(challenge.availableNodes().pluck('id')).toEqual(nextNode.connections().pluck('id'));
      });

      it("should update the list of available nodes once a new node is reset", function() {
        nextNode.connections().reset([new Node({ id: 9001, name: 'new async node' })]);
        expect(challenge.availableNodes().pluck('id')).toEqual(nextNode.connections().pluck('id'));
      });
    });

    describe("once it is walked up to a node that connects with the goal", function() {
      var observer;

      beforeEach(function() {
        observer = sinon.spy();

        challenge.walkTo(graph.apollo13);
        challenge.walkTo(graph.tomHanks);

        challenge.on('end', observer);

        challenge.walkTo(graph.privateRyan);
      });

      it("should trigger an 'end' event", function() {
        expect(observer).toHaveBeenCalled();
      });
    });

  });
});
