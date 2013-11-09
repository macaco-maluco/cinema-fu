define([
  'backbone-accessorize',
  'challenge/node'
],
function (Backbone, Node) {

  var Challenge = Backbone.Model.extendAndAccessorize({
    accessors: ['start', 'goal', 'path', 'availableNodes'],
    defaults: function () {
      return {
        path: new Node.Collection(),
        availableNodes: new Node.Collection()
      };
    },

    initialize: function () {
      setAvailableNodes.call(this, this.start().connections());
    },

    walkTo: function (node) {
      if (this.goal().connections().findWhere({ id: node.id })) {
        endChallenge.call(this);
      }
      this.path().add(node);
      setAvailableNodes.call(this, node.connections());
    }
  });

  function setAvailableNodes (collection) {
    var availableNodes = this.availableNodes();

    availableNodes.reset(collection.models);

    this.listenTo(collection, "add", function (node) {
      availableNodes.add(node);
    });

    this.listenTo(collection, "reset", function () {
      availableNodes.reset(collection.models);
    });
  }

  function endChallenge () {
    this.trigger('end');
  }

  return Challenge;

});
