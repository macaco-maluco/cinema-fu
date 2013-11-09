define([
  'backbone-accessorize'
],
function (Backbone) {
  var Node = Backbone.Model.extendAndAccessorize({
    accessors: ['connections']
  });

  Node.Collection = Backbone.Collection.extend({
    model: Node
  });

  return Node;
});
