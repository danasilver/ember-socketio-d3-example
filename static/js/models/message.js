Chat.Message = DS.Model.extend({
  message: DS.attr('string'),
  sentBySelf: DS.attr('boolean')
});

Chat.Message.FIXTURES = [
  {
    id: 1,
    message: "I'm a test message",
    sentBySelf: true
  }
];