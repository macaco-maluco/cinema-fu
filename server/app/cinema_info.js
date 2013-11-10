var request = require('request'),
    RSVP = require('rsvp'),
    Promise = RSVP.Promise,
    tmdb = require('tmdbv3').init(process.env.TMDB_API_KEY),
    _ = require('underscore');

var imageConfig = {
    baseUrl: "http://d3gtl9l2a4fn1j.cloudfront.net/t/p/",
    personSize: "w185",
    posterSize: "w185"
};

function parsePerson(person) {
  return {
    id: 'person_' + person.id,
    name: person.name,
    pictureUrl: imageConfig.baseUrl + imageConfig.personSize + person.profile_path
  };
}

function parseMovie (movie) {
  return {
    id: 'movie_' + movie.id,
    name: movie.title,
    pictureUrl: imageConfig.baseUrl + imageConfig.posterSize + movie.poster_path
  };
}

function CinemaInfo () {}

CinemaInfo.prototype = {
  find: function (query) {
    return RSVP.all([this.findActor(query), this.findMovie(query)]).then(function (results) {
      return _.flatten(results).slice(0, 10);
    });
  },

  findActor: function (query) {
    return new Promise(function(resolve, reject) {
      tmdb.search.person(query, function(err,res) {
        if (err) {
          reject(err);
        } else {
          resolve(res.results.map(parsePerson));
        }
      });
    });
  },

  findMovie: function(query) {
    return new Promise(function(resolve, reject) {
      tmdb.search.movie(query, function(err,res) {
        if (err) {
          reject(err);
        } else {
          resolve(res.results.map(parseMovie));
        }
      });
    });
  },

  movieConnections: function(id) {
    return new Promise(function(resolve, reject) {
      tmdb.movie.casts(id, function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res.cast.map(parsePerson));
        }
      });
    });
  },

  personConnections: function(id) {
    return new Promise(function(resolve, reject) {
      tmdb.person.credits(id, function(err,res) {
        if (err) {
          reject(err);
        } else {
          resolve(res.cast.map(parseMovie));
        }
      });
    });
  },

  getConnections: function(id) {
    var searchId = parseInt(id.slice(id.indexOf('_') + 1));
    if (id.indexOf('movie_') !== -1) {
      return this.movieConnections(searchId);
    } else {
      return this.personConnections(searchId);
    }
  }
};

module.exports = CinemaInfo;
