Chat.Router.map(function() {
  this.resource('chat', { path: '/' });
});

Chat.ChatRoute = Ember.Route.extend({
  model: function() {
    return this.store.all('message');
  }
});