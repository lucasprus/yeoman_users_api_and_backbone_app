requirejs.config({
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery',
    'backbone': '../bower_components/backbone/backbone',
    'underscore': '../bower_components/underscore/underscore',
    'bootstrap': '../bower_components/sass-bootstrap/dist/js/bootstrap',
    'jquery-ui': '../bower_components/jquery-ui/ui/jquery-ui',
    // 'json2': '../bower_components/json2/json2',
    'text': '../bower_components/requirejs-text/text'
  },
  //Remember: only use shim config for non-AMD scripts,
  //scripts that do not already call define(). The shim
  //config will not work correctly if used on AMD scripts,
  //in particular, the exports and init config will not
  //be triggered, and the deps config will be confusing
  //for those cases.
  shim: {
    'backbone': {
      //These script dependencies should be loaded before loading
      //backbone.js
      deps: ['underscore', 'jquery'],
      //Once loaded, use the global 'Backbone' as the
      //module value.
      exports: 'Backbone'
    },
    'jquery-ui': ['jquery']
  }
});
requirejs(['routers/router'],
  function (Router) {
    'use strict';
    // console.log(jQuery);
    // console.log(Backbone);
    jQuery(function () {
      // new Router();
      // app = new Router();
      window.APP = new Router({
        log: true
      });
      Backbone.history.start();
      // Backbone.history.start({pushState: true});
    });
  });
