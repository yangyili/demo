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
        $('.list-group-item-info').find('.filter').click(function () {
            var states = $(this).text().toLowerCase();
            filter_work(states);
        });
        render();
    };

    var render = function () {
        $('ul.todo-list').empty();
        for (var i = 0; i < all_work.length; i++) {
            render_one(all_work[i], i);
        }
        init_navigation();
    };

    var render_one = function (work, index) {
        var li = '<li class="list-group-item todo-list-item">' +
                    '<a class="glyphicon glyphicon-ok btn-link"></a>' +
                    '<span class="col-xs-offset-1"></span>' +
                    '<a class="glyphicon glyphicon-remove btn-link pull-right remove"></a>' +
                 '</li>';
        var $li = $(li);
        $li.find('span').text(work.name);
        $li.find('.glyphicon-ok').click(function () {
            toggle_work(index);
        });
        $li.find('.glyphicon-remove').click(function () {
            remove_work(index);
        });
        var state_class = work.is_complete ? 'completed' : 'active';
        $li.addClass(state_class);
        $('ul.todo-list').append($li);
    };

    var add_work = function (work_name) {
        var work = {name: work_name, is_complete: 0};
        all_work.unshift(work );
        store.set('all_work', all_work);
        render();
    };

    var toggle_work = function (index) {
        console.log('toggle', index);
        all_work[index].is_complete = !all_work[index].is_complete;
        store.set('all_work', all_work);
        render();
    };

    var remove_work = function (index) {
        all_work.splice(index, 1);
        store.set('all_work', all_work);
        render();
    };

    var init_navigation = function () {
        var $nav = $('.list-group-item-info');
        var $left_work_info = $nav.find('.pull-left');
        var $clear_work_btn = $nav.find('.pull-right');
        var active_count = active_work_count();
        var complete_count = all_work.length - active_count;
        $left_work_info.text(active_count + ' items left');
        $clear_work_btn.text('Clear completed ' + complete_count);
    };

    var filter_work = function (states) {
        var $li = $('li');
        $li.removeClass('none');
        if (states != 'all') {
            $li.not('.' + states).addClass('none');
        }
    };

    var active_work_count = function () {
        var active_work_number = 0;
        for (var i= 0; i < all_work.length; i++) {
            if (!all_work[i].is_complete) {
                active_work_number++;
            }
        }
        return active_work_number;
    };

    return {
        init: init,
        add_work: add_work
    };
}();