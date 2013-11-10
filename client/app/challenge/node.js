define([
  'backbone-accessorize'
],
function (Backbone) {
  var Node = Backbone.Model.extendAndAccessorize({
    urlRoot: '/nodes',
    accessors: ['connections'],
    defaults: function () {
      return {
        connections: new Node.Collection()
      };
    },
    parse: function (response) {
      this.connections().reset(response.connections);
      delete response.connections;
      return response;
    }
  });

  Node.Collection = Backbone.Collection.extend({
    model: Node
  });

  return Node;
});
