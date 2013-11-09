var request = require('request'),
    Promise = require('rsvp').Promise;

function CinemaInfo () {

}

CinemaInfo.prototype = {

  findActor: function (query) {
    return new Promise(function (resolve, reject) {
      request.get({
        url: 'https://www.googleapis.com/freebase/v1/search',
        qs: {
          type: '/film/actor',
          query: query
        }
      }, function (error, response, data) {
        var actors = JSON.parse(data);
        resolve(actors.result.map(function (actor) {
          return {
            id: actor.id,
            name: actor.name
          };
        }));
      });
    });
  }
};

module.exports = CinemaInfo;
