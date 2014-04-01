define(['backbone', './users_default_list', './users_detailed_list', './users_pagination', './users_view_switch', 'vendor/cookie'], function (Backbone, UsersDefaultList, UsersDetailedList, UsersPagination, UsersViewSwitch, cookieHelper) {
  'use strict';
  return Backbone.View.extend({
    initialize: function () {
      console.log('Creating UsersView');
      // this.listenTo(this.collection, "change", this.render);
      // this.listenTo(this.collection, "add", this.render);
      // this.render();
      // console.info(cookieHelper.getItem('view'));
      this.usersDefaultList = new UsersDefaultList({
        collection: this.collection
      });
      this.usersDetailedList = new UsersDetailedList({
        collection: this.collection,
        el: this.usersDefaultList.el
      });
      this.usersPagination = new UsersPagination({
        collection: this.collection
      });
      this.usersViewSwitch = new UsersViewSwitch();
    },
    render: function () {
      console.log('Rendering UsersView');
      this.el.innerHTML = '';
      var doc = document.createDocumentFragment(),
        paginationEl = this.usersPagination.render().el;
      doc.appendChild(this.usersViewSwitch.render().el);
      doc.appendChild(paginationEl);
      if (cookieHelper.getItem('view') === 'detailed') {
        doc.appendChild(this.usersDetailedList.render().el);
      } else {
        doc.appendChild(this.usersDefaultList.render().el);
      }
      doc.appendChild(paginationEl.cloneNode(true));
      this.el.appendChild(doc);
      return this;
    },
    events: {
      'change #view_switch :radio': function (event) {
        var v = event.target.value;
        cookieHelper.setItem('view', v, 150);
        if (v === 'detailed') {
          this.usersDetailedList.render();
        } else {
          this.usersDefaultList.render();
        }
      }
    }
  });
});
