var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    fs = require('fs'),
    sqlite3 = require('sqlite3').verbose();

var dbFile = 'default.db',
    db = new sqlite3.Database(dbFile);

db.run('CREATE TABLE IF NOT EXISTS chat (' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
        'message TEXT NOT NULL,' +
        'sender CHAR(30) NOT NULL);'
);

app.use('/static', express.static(__dirname + '/static'));
server.listen(3502);

io.sockets.on('connection', function(socket) {

  db.each('SELECT * FROM chat', function(err, row) {
    console.log(err,row);
    socket.emit('message', {
      message: row.message,
      sender: row.sender,
      id: row.id
    });
  });

  socket.on('new message', function(data) {
    db.serialize(function() {
      var stmt = db.prepare('INSERT INTO chat (message, sender) ' +
                              'VALUES (?, ?)');
      stmt.run(data.message, data.sender, function() {
        socket.broadcast.emit('message', {
          id: this.lastID,
          sender: data.sender,
          message: data.message
        });
      });

    });

  });
});

app.get('/', function(req, res) {
  res.sendfile('static/index.html');
});

app.get('/messages', function(req, res) {
  db.all('SELECT * FROM chat', function(err, rows) {
    res.send(rows);
  });
});