window.Chat = Ember.Application.create({
  Socket: EmberSockets.extend({
    host: 'localhost',
    port: 3502,
    controllers: ['chat']
  })
});

Chat.ApplicationAdapter = DS.FixtureAdapter.extend();