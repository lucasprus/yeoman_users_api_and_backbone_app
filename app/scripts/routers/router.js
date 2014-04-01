define([
    'models/user',
    'collections/users',
    'views/user_view',
    'views/user_edit_view',
    'views/user_new_view',
    'views/users_view',
    'views/home_view'
  ],
  function (User, Users, UserView, UserEditView, UserNewView, UsersView, HomeView) {
    'use strict';
    return Backbone.Router.extend({
      initialize: function () {
        console.log('Creating Router');
        var _this = this;
        this.El = document.getElementById('container');
        this.menuEl = document.getElementById('menu');
        this.saveUser = function (attributes) {
          console.log('Saving user');
          _this.user.save(attributes, {
            success: function () {
              console.info('Successfully saved user');
              _this.navigate('users/' + _this.user.get('username').toLowerCase(), {
                trigger: true
              });
              _this.userView.render();
            },
            error: function (model, xhr) {
              console.error('Failed to save user');
              var error = JSON.parse(xhr.responseText);
              alert(error.message);
            },
            wait: true
          });
        };
        this.deleteUser = function () {
          console.log('Deleting user');
          _this.user.destroy({
            success: function () {
              console.info('Successfully deleted user');
              _this.navigate('users', {
                trigger: true
              });
            },
            error: function (model, xhr) {
              console.error('Failed to save user');
              var error = JSON.parse(xhr.responseText);
              alert(error.message);
            },
            wait: true
          });
        };
        this.user = new User();
        this.userView = new UserView({
          model: this.user,
          el: this.El
        });
        this.userEditView = new UserEditView({
          model: this.user,
          el: this.El
        });
        this.userNewView = new UserNewView({
          el: this.El
        });
        this.users = new Users();
        this.usersView = new UsersView({
          collection: this.users,
          el: this.El
        });
        this.homeView = new HomeView({
          el: this.El
        });
        // Handle behaviour in views
        this.listenTo(this.userView, 'user_view:click:button.edit', function () {
          this.userEditView.render();
        });
        this.listenTo(this.userView, 'user_view:click:button.delete', function () {
          this.deleteUser();
        });
        this.listenTo(this.userEditView, 'user_edit_view:click:button.save', function (obj) {
          this.saveUser(obj);
        });
        this.listenTo(this.userEditView, 'user_edit_view:click:button.cancel', function () {
          this.userView.render();
        });
        this.listenTo(this.userNewView, 'user_new_view:click:button.save_new', function (obj) {
          this.saveUser(obj);
        });
        this.listenTo(this.userNewView, 'user_new_view:click:button.cancel_new', function () {
          this.navigate('users', {
            trigger: true
          });
        });
      },
      routes: {
        '': 'home',
        'users/new': 'newUser',
        'users(/page:page)': 'usersIndex',
        'users/:username': 'userProfile'
      },
      home: function () {
        this.homeView.render();
      },
      newUser: function () {
        this.userNewView.render();
        this.user.clear({
          'silent': true
        });
      },
      userProfile: function (username) {
        var _this = this;
        this.user.set({
          username: username
        }, {
          silent: true
        });
        this.user.fetch({
          success: function () {
            console.info('Successfully fetched user');
            _this.userView.render();
          },
          error: function () {
            console.error('Failed to fetch user');
          }
        });
      },
      usersIndex: function (page) {
        this.users.page = (page && parseInt(page, 10)) || 1;
        var _this = this;
        this.users.fetch({
          success: function () {
            console.info('Successfully fetched users');
            _this.usersView.render();
          },
          error: function () {
            console.error('Failed to fetch users');
          }
        });
      }
    });
  });
