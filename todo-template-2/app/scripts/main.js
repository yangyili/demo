var Todo6 = function () {
    var all_work = store.get('all_work') || [];
    var init = function() {
        console.log('work_name');
        $('.unadded-todo').on('keypress', function (event) {
            var work_name = $(this).val();
            console.log(work_name);
            if (event.keyCode == 13 && work_name) {
                add_work(work_name);
                $(this).val('');
            }
        });
        render();
    };

    var render = function () {
        $('ul.todo-list').empty();
        for (var i = 0; i < all_work.length; i++) {
            render_one(all_work[i]);
        }
    };

    var render_one = function (work) {
        var li = '<li class="list-group-item todo-list-item">' +
                    '<a class="glyphicon glyphicon-ok btn-link"></a>' +
                    '<span class="col-xs-offset-1"></span>' +
                    '<a class="glyphicon glyphicon-remove btn-link pull-right remove"></a>' +
                 '</li>';
        var $li = $(li);
        $li.find('span').text(work.name);
        var state_class = work.is_complete ? 'completed' : 'actived';
        $li.addClass(state_class);
        $('ul.todo-list').append($li);
    };

    var add_work = function (work_name) {
        var work = {name: work_name, is_complete: 0};
        all_work.unshift(work );
        store.set('all_work', all_work);
        render();
    };
    return {
        init: init,
        add_work: add_work
    };
}();