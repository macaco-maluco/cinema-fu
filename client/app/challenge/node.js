define([
  'backbone-accessorize'
],
function (Backbone) {
  var Node = Backbone.Model.extendAndAccessorize({
    accessors: ['connections'],
    defaults: function () {
      return {
        connections: new Node.Collection()
      };
    }
  });

  Node.Collection = Backbone.Collection.extend({
    model: Node
  });

  return Node;
});
