Chat.Message = DS.Model.extend({
  message: DS.attr('string'),
  sender: DS.attr('string')
});

Chat.Message.FIXTURES = [];