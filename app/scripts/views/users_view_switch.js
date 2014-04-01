define(['backbone', 'text!templates/users_view_switch.html', 'vendor/cookie'], function (Backbone, usersViewSwitchTemplate, cookieHelper) {
  'use strict';
  return Backbone.View.extend({
    initialize: function () {
      console.log('Creating UsersViewSwitch');
    },
    render: function () {
      console.log('Rendering UsersViewSwitch');
      this.el.innerHTML = _.template(usersViewSwitchTemplate)({
        view: cookieHelper.getItem('view')
      });
      return this;
    }
  });
});
