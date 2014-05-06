define(['backbone'], function (Backbone) {
  'use strict';
  return Backbone.Model.extend({
    initialize: function () {
      console.log('Creating User');
    },
    parse: function (response, options) {
      if (options.collection) {
        return response;
      }
      return response.user;
    },
    urlRoot: '/api/users',
    idAttribute: 'username'
  });
});
