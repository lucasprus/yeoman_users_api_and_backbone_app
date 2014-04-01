define(['backbone', 'jquery-ui', 'text!templates/user.html'], function (Backbone, jqueryUI, userTemplate) {
  'use strict';
  return Backbone.View.extend({
    tagName: 'p',
    template: _.template(userTemplate),
    initialize: function (options) {
      console.log('Creating UserView');
      if (options && options.no_edit) {
        this.no_edit = options.no_edit;
      }
      // this.listenTo(this.model, 'change', this.render);
      // this.render();
    },
    render: function () {
      console.log('Rendering UserView');
      this.$el.html(this.template({
        user: this.model.attributes,
        options: {
          noEdit: this.no_edit
        }
      }));
      return this;
    },
    events: {
      'click button.edit': function () {
        this.trigger('user_view:click:button.edit');
      },
      'click button.delete': function () {
        this.trigger('user_view:click:button.delete');
      }
    }
  });
});
