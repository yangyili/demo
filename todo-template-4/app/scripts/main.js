var Todo = (function () {
    'use strict';
    var ENTER_KEY = 13;
    var util = {
        store: function (namespace, data) {
            if (arguments.length > 1) {
                return localStorage.setItem(namespace, JSON.stringify(data));
            } else {
                var store = localStorage.getItem(namespace);
                return (store && JSON.parse(store)) || [];
            }
        }
    };
    var App = {
        init: function () {
            this.todos = util.store('todo_list');
            this.cacheElements();
            this.bindEvents();
        },
         cacheElements: function () {
             this.$todoApp = $('#todoapp');
             this.$header = this.$todoApp.find('#header');
             this.$main = this.$todoApp.find('#main');
             this.$foor = this.$todoApp.find('#main');
         }
    };
}());