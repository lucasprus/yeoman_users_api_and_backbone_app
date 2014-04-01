define(['backbone', 'jquery-ui', 'text!templates/user_edit.html'], function (Backbone, jqueryUI, userEditTemplate) {
  'use strict';
  return Backbone.View.extend({
    template: _.template(userEditTemplate),
    initialize: function () {
      console.log('Creating UserEditView');
      // this.render();
      // this.listenTo(this.model, 'change', this.render);
    },
    render: function () {
      console.log('Rendering UserEditView');
      this.$el.html(this.template(this.model.attributes));
      jQuery('#datepicker').datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '-100:c',
        dateFormat: 'yy-mm-dd'
      });
      return this;
    },
    events: {
      'click button.save': function () {
        var form = this.el.getElementsByTagName('form')[0];
        this.trigger('user_edit_view:click:button.save', {
          name: form.name.value,
          email: form.email.value,
          password: form.password.value,
          birthday: form.birthday.value,
          gender: form.gender[0].checked ? 'M' : 'F',
          bio: form.bio.value
        });
      },
      'click button.cancel': function () {
        this.trigger('user_edit_view:click:button.cancel');
      }
    }
  });
});
