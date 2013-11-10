define([
  'underscore',
  'backbone',
  'jquery.autocomplete'
],
function (_, Backbone) {
  var SearchBoxView = Backbone.View.extend({
    render: function () {
      var that = this;

      this.$('.search').autocomplete({
        serviceUrl: '/nodes/',
        offset: {
          top: 5
        },
        transformResult: function(response) {
          var data = JSON.parse(response);
          return {
            suggestions: _.map(data, function(dataItem) {
              return { value: dataItem.name, data: dataItem.id, pictureUrl: dataItem.pictureUrl };
            })
          };
        },
        onSelect: function (sugestion) {
          that.$('.selected-name').html(sugestion.value);
          that.$('.selected-picture').attr('src', sugestion.pictureUrl);
          that.$('.selected-id').val(sugestion.data);
        }
      });
    }
  });

  return SearchBoxView;
});
