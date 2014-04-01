define(['backbone', 'text!templates/users_default_list.html'], function (Backbone, usersDefaultListTemplate) {
  'use strict';
  return Backbone.View.extend({
    template: _.template(usersDefaultListTemplate),
    initialize: function () {
      console.log('Creating UsersDefaultList');
    },
    render: function () {
      console.log('Rendering UsersDefaultList');
      this.$el.html(this.template({
        users: this.collection.toJSON()
      }));
      /*      var ul = document.createElement('ul');
      this.collection.each(function (user) {
        $('<li><a href="#users/' + encodeURIComponent(user.get('username')) + '">' + user.get('username') + '</a></li>').appendTo(ul);
      });
      this.el.innerHTML = '<ul>' + ul.innerHTML + '</ul>';*/
      return this;
    }
  });
});
