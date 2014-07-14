Chat.MessageController = Ember.ObjectController.extend({
  sentBySelf: function(key, value) {
    var model = this.get('model');

    return model.get('sender') === this.parentController.username;
  }.property('parentController.username')
});