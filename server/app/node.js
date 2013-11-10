var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    CinemaInfo = require('./cinema_info'),
    RSVP = require('rsvp'),
    Promise = RSVP.Promise;

var cinemaInfo = new CinemaInfo();

mongoose.connect('mongodb://localhost/cinemafu');

var nodeSchema = new Schema({
  id: String,
  name: String,
  pictureUrl: String,
  connections: [{ type: Schema.Types.ObjectId, ref: 'Node' }]
});

function findAndUpdate (nodeInfo) {
  return promissedFind({ id: nodeInfo.id }).then(function (models) {
    if (models.length === 0) {
      return Node.create(nodeInfo);
    } else {
      return models[0];
    }
  });
}

function fetchAndCreate (id) {
  return cinemaInfo.getInfo(id).then(function (nodeInfo) {
    var promisses = nodeInfo.connections.map(findAndUpdate);

    return RSVP.all(promisses).then(function (connections) {
      nodeInfo.connections = connections;
      return Node.create(nodeInfo);
    });
  });
}

function fetchAndUpdate (model) {
  return cinemaInfo.getInfo(model.id).then(function (nodeInfo) {
    var promisses = nodeInfo.connections.map(findAndUpdate);

    return RSVP.all(promisses).then(function (connections) {
      model.connections = connections;

      return new Promise(function (resolve, reject) {
        model.save(function (err) {
          if (err) { 
            reject(err);
          } else {
            resolve(model);
          }
        });
      });
    });
  });
}


function promissedFind (query) {
  return new Promise(function (resolve, reject) {
    Node.find(query, function (err, models) {
      if (err) {
        reject(err);
      } else {
        resolve(models);
      }
    });
  });
}


nodeSchema.statics.findOrFetch = function (id) {
  return promissedFind({ id: id }).then(function (models) {
    if (models.length === 0) {
      return fetchAndCreate(id);
    } else if (models[0].connections.length === 0) {
      return fetchAndUpdate(models[0]);
    } else {
      return models[0];
    }
  }).then(function (model) {
    return new Promise(function (resolve, reject) {
      model.populate({ path: 'connections', select: 'id name pictureUrl'}, function (err, res) {
        if (err) {
          reject(err);
        } else  {
          resolve(res);
        }
      });
    });
  });
};

var Node = mongoose.model('Node', nodeSchema);



module.exports = Node;