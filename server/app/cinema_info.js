var request = require('request'),
    Promise = require('rsvp').Promise,
    tmdb = require('tmdbv3').init(process.env.TMDB_API_KEY);

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
  }
}

function CinemaInfo () {}

CinemaInfo.prototype = {
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
