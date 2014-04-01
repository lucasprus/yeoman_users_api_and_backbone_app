define(['backbone', 'text!templates/home.html'], function (Backbone, homeTemplate) {
  'use strict';
  return Backbone.View.extend({
    template: _.template(homeTemplate),
    initialize: function () {
      console.log('Creating Home');
    },
    render: function () {
      console.log('Rendering Home');
      this.$el.html(this.template());
      return this;
    }
  });
});
