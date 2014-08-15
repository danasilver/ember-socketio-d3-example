Chat.Router.map(function() {
  this.resource('chat', { path: '/' });
});

Chat.ChatRoute = Ember.Route.extend({
  model: function() {
    return this.store.all('message')
  },
  setupController: function(controller, model) {
    controller.set('content', model);
    controller.set('modules', [{name: 'barChart'}])
  }
});