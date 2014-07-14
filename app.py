# -*- coding: utf-8 -*-

from gevent import monkey
monkey.patch_all()

import os
from sqlite3 import dbapi2 as sqlite3
from flask import Flask, g
from flask.ext.socketio import SocketIO, emit

app = Flask(__name__)

# app.config.update(dict(
#     DATABASE=os.path.join(app.root_path, 'chat.db'),
#     DEBUG=False,
#     SECRET_KEY='shhhh',
#     USERNAME='admin',
#     PASSWORD='default'
# ))
app.debug = True
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
thread = None

@socketio.on('connect')
def connection(message):
    emit('connected')

@app.route('/')
def index():
    return app.send_static_file('index.html')

# The following database methods are from the Flask tutorial

def connect_db():
    """Connects to the specific database."""
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv


def init_db():
    """Initializes the database."""
    db = get_db()
    with app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()


def initdb_command():
    """Creates the database tables."""
    init_db()
    print('Initialized the database.')


def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db


@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

if __name__ == '__main__':
    socketio.run(app)