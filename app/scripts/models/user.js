define(['backbone'], function (Backbone) {
  'use strict';
  return Backbone.Model.extend({
    initialize: function () {
      console.log('Creating User');
    },
    urlRoot: '/api/users',
    idAttribute: 'username'
  });
});
