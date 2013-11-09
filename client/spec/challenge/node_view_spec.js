define([
  'spec/spec_helper',
  'sinon',
  'challenge/node_view',
  'challenge/node'
],
function (jasmine, sinon, NodeView, Node) {

  describe("NodeView", function() {
    var view, node;

    beforeEach(function() {
      node = new Node({ name: 'Tom Hanks', pictureUrl: 'http://lol.jpeg' })
      view = new NodeView({ model: node, selectable: true }).render();
    });

    it("should accept selectable configuration", function() {
      expect(view.selectable).toEqual(true);
    });

    it("should render the picture", function() {
      expect(view.$('.node-picture')).toHaveAttr('src', 'http://lol.jpeg');
    });

    it("should render the name", function() {
      expect(view.$('.node-name')).toHaveHtml('Tom Hanks');
    });

    describe("select event", function() {
      var observer;
      beforeEach(function() {
        observer = sinon.spy();
        view.on('select', observer);
      });

      it("should trigger if selectable", function() {
        view.selectable = true;
        view.$el.click();
        expect(observer).toHaveBeenCalledWith(node);
      });

      it("should not trigger if not selectable", function() {
        view.selectable = false;
        view.$el.click();
        expect(observer).not.toHaveBeenCalled();
      });
    });
  });

});
