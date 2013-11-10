var request = require('request'),
    RSVP = require('rsvp'),
    Promise = RSVP.Promise,
    tmdb = require('tmdbv3').init(process.env.TMDB_API_KEY),
    _ = require('underscore');

function parseActor(actor) {
  return {
    id: actor.id,
    name: actor.name,
    image: actor.profile_path
  };
}

function parseMovie (movie) {
  return {
    id: movie.id,
    name: movie.title,
    image: movie.poster_path
  };
}

function CinemaInfo () {}

CinemaInfo.prototype = {
  find: function (query) {
    return RSVP.all([this.findActor(query), this.findMovie(query)]).then(function (results) {
      return _.flatten(results);
    });
  },

  findActor: function (query) {
    return new Promise(function(resolve, reject) {
      tmdb.search.person(query, function(err,res) {
        if (err) {
          reject(err);
        } else {
          resolve(res.results.map(parseActor));
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
  }
};

module.exports = CinemaInfo;
