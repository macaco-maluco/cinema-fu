define([
  'spec/spec_helper',
  'sinon',
  'challenge/node_selection_view',
  'challenge/node'
],
function (jasmine, sinon, NodeSelectionView, Node) {

  describe("NodeSelectionView", function() {
    var view, collection, model;

    beforeEach(function() {
      model = new Node({ name: 'Tom Hanks', pictureUrl: 'http://lol.jpeg' });
      collection = new Node.Collection([model]);
      view = new NodeSelectionView({ collection: collection }).render();
    });

    it("should trigger a select event with the model once a node is selected", function() {
      var observer = sinon.spy();
      view.on('node:select', observer);
      view.$('.node').click();
      expect(observer).toHaveBeenCalledWith(model);
    });
  });

});
