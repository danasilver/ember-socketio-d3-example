Chat.ChatController = Ember.ArrayController.extend({
  username: '',
  actions: {
    createMessage: function() {
      var message = this.get('newMessage');
      var username = this.username;
      if (!message) return false;
      if (!message.trim()) return;

      var newMessage = this.store.createRecord('message', {
        message: message,
        sender: username
      });

      this.set('newMessage', '');

      this.socket.emit('new message', {
        message: message,
        sender: username
      });
    }
  },
  stats: function() {
    var messages = this.store.all('message'),
        counts = {};
    this.store.all('message').forEach(function(message) {
      var sender = message.get('sender');
      if (counts.hasOwnProperty(sender)) counts[sender]++;
      else counts[sender] = 1;
    });
    return d3.entries(counts);
  }.property('@each'),
  sockets: {
    connect: function() {
      console.log("Connected");
    },
    disconnect: function() {
      console.log("Disconnected");
    },
    message: function(data) {
      var newMessage = this.store.push('message', {
        id: data.id,
        message: data.message,
        sender: data.sender
      });
    }
  }
});