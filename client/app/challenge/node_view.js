define([
  'tpl!challenge/node_view.jst',
  'backbone.marionette'
],
function (template, Marionette) {
  var NodeView = Marionette.ItemView.extend({
    className: 'node',
    template: template,
    events: {
      'click': click
    },

    initialize: function (options) {
      this.selectable = options.selectable;
    },

    serializeData: function () {
      var data = this.model.toJSON();
      data.pictureLabel = data.name + ' picture';
      return data;
    }
  });

  function click () {
    if (this.selectable) { this.trigger('select', this.model); }
  }

  return NodeView;
});
