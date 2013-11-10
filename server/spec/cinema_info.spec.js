require('./spec_helper');

var CinemaInfo = require("../app/cinema_info");

describe("CinemaInfo", function() {
  var cinemaInfo;

  beforeEach(function() {
    cinemaInfo = new CinemaInfo({ apiKey: "AIzaSyCv3iG-safcVm4DVTTw9QasCnamIETAQg0" });
  });

  describe("finding people", function() {
    it("should be able to find only people and movies related to the film indurstry", function(done) {
      cinemaInfo.findActor('Tom Hanks').then(function(actors) {
        expect(actors[0].name).toEqual('Tom Hanks');
        done();
      });
    });
  });

describe("finding movies", function() {
    it("should find movies by title", function(done) {
      cinemaInfo.findMovie('Pulp Fiction').then(function(actors) {
        expect(actors[0].name).toEqual('Pulp Fiction');
        done();
      });
    });
  });
});
