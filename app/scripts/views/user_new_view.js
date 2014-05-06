define(['backbone', 'jquery-ui', 'text!templates/user_new.html'], function (Backbone, jqueryUI, userNewTemplate) {
  'use strict';
  return Backbone.View.extend({
    template: _.template(userNewTemplate),
    initialize: function () {
      console.log('Creating UserNewView');
      // this.render();
    },
    render: function () {
      console.log('Rendering UserNewView');
      this.$el.html(this.template());
      jQuery('#datepicker').datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '-100:c',
        dateFormat: 'yy-mm-dd'
      });
      return this;
    },
    events: {
      'click button.save_new': function () {
        var form = this.el.getElementsByTagName('form')[0];
        this.trigger('user_new_view:click:button.save_new', {
          clientUsername: form.clientUsername.value,
          name: form.name.value,
          email: form.email.value,
          password: form.password.value,
          birthday: form.birthday.value,
          gender: form.gender[1].checked ? 'F' : 'M',
          bio: form.bio.value
        });
      },
      'click button.cancel_new': function () {
        this.trigger('user_new_view:click:button.cancel_new');
      }
    }
  });
});
