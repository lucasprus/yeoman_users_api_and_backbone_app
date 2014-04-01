define(['backbone', 'text!templates/users_detailed_list.html'], function (Backbone, usersDetailedListTemplate) {
  'use strict';
  return Backbone.View.extend({
    template: _.template(usersDetailedListTemplate),
    initialize: function () {
      console.log('Creating UsersDetailedList');
    },
    render: function () {
      console.log('Rendering UsersDetailedList');
      this.$el.html(this.template({
        users: this.collection.toJSON()
      }));
      // var ul = document.createElement('ul');
      /*      this.collection.each(function (user) {
        ul.appendChild(new UserView({
          model: user,
          no_edit: true
        }).render().el);
      });
      this.el.innerHTML = ul.innerHTML;*/
      return this;
    }
  });
});
