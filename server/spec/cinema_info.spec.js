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

  describe("finding nodes", function() {
    it("should limit search result to 10 results", function(done) {
      cinemaInfo.find('Kevin').then(function(nodes) {
        expect(nodes.length).toEqual(10);
        done();
      });
    });
  });

  describe("finding movies", function() {
    it("should find movies by title", function(done) {
      cinemaInfo.findMovie('Pulp Fiction').then(function(movies) {
        expect(movies[0].name).toEqual('Pulp Fiction');
        done();
      });
    });
  });

  describe("finding movie connections", function() {
    it("should find actor connected to movie", function(done) {
      cinemaInfo.getInfo('movie_680').then(function(actors) {
        expect(actors.connections[0].name).toEqual('Bruce Willis');
        done();
      });
    });
  });

  describe("finding person connections", function() {
    it("should find movie person was an actor on", function(done) {
      cinemaInfo.getInfo('person_31').then(function(movies) {
        expect(movies.connections[0].name).toEqual('Forrest Gump');
        done();
      });
    });
  });
});