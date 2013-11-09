require([
  'jquery',
  'jasmine',
  'jasmine-html',

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
