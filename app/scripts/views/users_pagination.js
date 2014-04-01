define(['backbone', 'text!templates/users_pagination.html'], function (Backbone, usersPaginationTemplate) {
  'use strict';
  return Backbone.View.extend({
    template: _.template(usersPaginationTemplate),
    initialize: function () {
      console.log('Creating UsersPagination');
    },
    render: function () {
      console.log('Rendering UsersPagination');
      this.$el.html(this.template({
        count: this.collection.count,
        maxUsersPerPage: this.collection.maxUsersPerPage,
        page: this.collection.page
      }));
      return this;
    }
  });
});
