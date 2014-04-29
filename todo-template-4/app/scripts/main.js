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
             this.$footer = this.$todoApp.find('#footer');
             this.$newTodo = this.$header.find('#new-todo');
             this.$toggleAll = this.$header.find('#toggle-all');
             this.$todoList = this.$main.find('#todo-list');
             this.$count = this.$footer.find('#todo-count');
             this.$clearBtn = this.$footer.find('#clear-completed');
         },
        bindEvents: function () {
            var list = this.$todoList;
            this.$newTodo.on('keyup', this.create.bind(this));
            this.$toggleAll.on('change', this.toggleAll.bind(this));
            this.$clearBtn.on('click', this.destroyCompleted.bind(this));
            list.on('change', '.toggle', this.toggle.bind(this));
            list.on('click', '.destroy', this.destroy.bind(this));
        },
        render: function () {
            var todos = this.getFilteredTodos();
            this.$todoList.html(this.todoTemplate(todos));
            this.$main.toggle(todos.length > 0);
            this.$toggleAll.prop('checked', this.getActiveTodos().length === 0);
            this.renderFooter();
            this.$newTodo.focus();
            util.store('todo-jquery', this.todos);
        },
        renderFooter: function () {
            var todoCount = this.todos.length;
            var activeTodoCount = this.getActiveTodos().length;
            var template = this.footerTemplate({
                activeTodoCount: activeTodoCount,
                completedTodos: todoCount - activeTodoCount
            });
            this.$footer.toggle(todoCount > 0).html(template);
        },
        toggleAll: function (e) {
            var isChecked = $(e.target).prop('checked');
            this.todos.forEach(function(todo) {
                todo.completed = isChecked;
            });
        },
        getActiveTodos: function () {
            return this.todos.filter(function (todo) {
                return !todo.completed;
            });
        },
        getCompletedTodos: function () {
            return this.todos.filter(function (todo) {
                return todo.completed;
            });
        },
        getFilteredTodos: function () {
            if (this.filter === 'active') {
                return this.getActiveTodos();
            }
            if (this.filter === 'completed') {
                return this.getCompletedTodos();
            }
            return this.todos;
        },
        destroyCompleted: function () {
            this.todos = this.getActiveTodos();
            this.filter = 'all';
            this.render();
        },
        indexFromEl: function (el) {
            var id = $(el).closest('li').data('id');
            var todos = this.todos;
            var i = todos.length;

            while (i--) {
                if (todos[i].id === id) {
                    return i;
                }
            }
        },
        create: function (e) {
            var $input = $(e.target);
            var val = $input.val().trim();

            if (e.which !== ENTER_KEY || !val) {
                return;
            }
            this.todos.push({
                id: util.uuid(),
                title: val,
                completed: false
            });
            $input.val('');
            this.render();
        },
        toggle: function (e) {
            var i = this.indexFromEl(e.target);
            this.todos[i].completed = !this.todos[i].completed;
            this.render();
        },
        destroy: function (e) {
            this.todos.splice(this.indexFromEl(e.target), 1);
            this.render();
        }
    };
    App.init();
}());