Chat.Router.map(function() {
  this.resource('chat', { path: '/' });
});

Chat.ChatRoute = Ember.Route.extend({
  model: function() {
    console.log(this);
    return this.modelFor('message');
  }
});