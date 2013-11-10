define([
  'tpl!challenge/end_challenge_view.jst',
  'backbone.marionette'
],
function (template, Marionette) {
  var EndChallengeView = Marionette.ItemView.extend({
    className: 'end-challenge',
    template: template,
    events: {
      'click .retry': reload
    },
    serializeData: function () {
      return {
        fbUrl: encodeURIComponent(location.href),
        steps: this.model.path().length
      };
    }
  });

  function reload () {
    location.reload(true);
  }

  return EndChallengeView;
});
