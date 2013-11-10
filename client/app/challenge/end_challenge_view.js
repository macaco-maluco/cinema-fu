define([
  'tpl!challenge/end_challenge_view.jst',
  'backbone.marionette'
],
function (template, Marionette) {
  var EndChallengeView = Marionette.ItemView.extend({
    className: 'end-challenge',
    template: template,
    onRender: function () {
      console.log(template())
    }
  });

  return EndChallengeView;
});
