Chat.ModuleListController = Ember.ObjectController.extend({
  actions: {
    clickBarChart: function() {
      Chat.ModulesContainerView.pushObject(Chat.firstView.create());
    }
  }
});