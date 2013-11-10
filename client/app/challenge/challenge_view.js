define([
  'tpl!challenge/challenge_view.jst',
  'backbone.marionette',
  'challenge/end_challenge_view',
  'challenge/node_view',
  'challenge/node_selection_view'
],
function (template, Marionette, EndChallengeView, NodeView, NodeSelectionView) {
  var PathView = Marionette.CollectionView.extend({
    className: 'path',
    itemView: NodeView
  });

  var ChallengeView = Marionette.Layout.extend({
    template: template,

    regions: {
      start: '.start',
      goal: '.goal',
      path: '.path-container',
      available: '.available',
      result: '.result'
    },

    modelEvents: {
      'end': end
    },

    onRender: function () {
      this.start.show(new NodeView({ model: this.model.start() }));
      this.goal.show(new NodeView({ model: this.model.goal() }));
      this.path.show(new PathView({ collection: this.model.path() }));

      var selectionView = new NodeSelectionView({ collection: this.model.availableNodes() });
      selectionView.on('node:select', handleSelection, this);
      this.available.show(selectionView);
    }
  });

  function handleSelection (node) {
    this.model.walkTo(node);
    if (node.connections().length === 0) {
      node.fetch();
    }
  }

  function end () {
    this.result.show(new EndChallengeView());
    this.trigger('end');
    this.available.close();
    this.$('.available').remove();
  }

  return ChallengeView;
});
