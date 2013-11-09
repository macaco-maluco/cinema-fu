define([
  'backbone.marionette',
  'challenge/node_view'
],
function (Marionette, NodeView) {
  var NodeSelectionView = Marionette.CollectionView.extend({
    itemView: NodeView,
    itemViewOptions: { selectable: true },
    initialize: function () {
      this.on('itemview:select', triggerSelection, this);
    }
  });

  function triggerSelection (view, model) {
    this.trigger('node:select', model);
  }

  return NodeSelectionView;
});
