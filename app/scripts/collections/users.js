define(['backbone', 'models/user'], function (Backbone, User) {
  'use strict';
  return Backbone.Collection.extend({
    model: User,
    initialize: function () {
      console.log('Creating Users');
    },
    url: function () {
      return '/api/users?page=' + (this.page || 1);
    },
    parse: function (response) {
      this.count = response.count;
      this.maxUsersPerPage = response.maxUsersPerPage;
      this.lastPage = this.page * this.maxUsersPerPage >= this.count;
      return response.users;
    }
  });
});
