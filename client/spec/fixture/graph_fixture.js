define([
  'challenge/node'
],
function (Node) {

  function build () {
    var kevinBacon = new Node({ id: 1, name: 'Kevin Bacon', pictureUrl: 'http://picture.jpeg' });
    var apollo13 = new Node({ id: 2, name: 'Apollo 13', pictureUrl: 'http://picture.jpeg' });
    var tomHanks = new Node({ id: 3, name: 'Tom Hanks', pictureUrl: 'http://picture.jpeg' });
    var privateRyan = new Node({ id: 4, name: 'Saving Private Ryan', pictureUrl: 'http://picture.jpeg' });
    var spielberg = new Node({ id: 5, name: 'Steven Spielberg', pictureUrl: 'http://picture.jpeg' });

    kevinBacon.connections(new Node.Collection([apollo13]));
    apollo13.connections(new Node.Collection([tomHanks]));
    tomHanks.connections(new Node.Collection([privateRyan]));
    privateRyan.connections(new Node.Collection([spielberg]));

    spielberg.connections(new Node.Collection([privateRyan]));

    return {
      kevinBacon: kevinBacon,
      apollo13: apollo13,
      tomHanks: tomHanks,
      privateRyan: privateRyan,
      spielberg: spielberg
    };
  }

  return build;

});
