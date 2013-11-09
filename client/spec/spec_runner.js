require([
  'jquery',
  'jasmine',
  'jasmine-html',

  'spec/challenge/challenge_spec',
  'spec/challenge/challenge_view_spec',
  'spec/challenge/node_selection_view_spec',
  'spec/challenge/node_view_spec'
],
function($, jasmine) {
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();
  jasmineEnv.addReporter(htmlReporter);
  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  $(function () {
    jasmineEnv.execute();
  });
});
