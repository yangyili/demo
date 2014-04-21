var Todo = function () {
    var all_work = store.get('all_work') || [];
    function init() {
        $('input.unadded-todo').keypress(function (event) {
            var $this = $(this);
            if (event.keyCode == 13 && $this.val()) {
                var work = {name: $this.val(), is_complete: 0};
                all_work.unshift(work);
                store.set('all_work', all_work);
                $this.val('');
                render();
            }
        });
        render();
    }

    var render = function () {
        var $ul = $('ul.todo-list');
        $ul.empty();
        for (var i = 0; i < all_work.length; i++) {
            render_one(all_work[i], i);
        }
        refresh_nav();
    };

    var refresh_nav = function () {
        var $list_group_info = $('.list-group-item-info');
        var all_work_count = all_work.length;
        var completed_count = completed_work_count();
        var active_count = all_work_count - completed_count;
        if (all_work.length) {
            $list_group_info.find('span').text(active_count + ' items left');
        }

        if (completed_count) {
            $list_group_info.find('.remove-all-work').text('remove all completed(' + completed_count + ')');
        }
    };

    var render_one = function (work, i) {
        var status_class = work.is_complete ? 'completed' : 'active';
        var li = '<li class="list-group-item todo-list-item ' + status_class +'">' +
                      '<a class="glyphicon glyphicon-ok btn-link toggle-status"></a>' +
                      '<span class="col-xs-offset-1">' + work.name + '</span>' +
                      '<a class="glyphicon glyphicon-remove btn-link pull-right remove remove-work"></a>' +
                  '</li>';
        var $li = $(li);
        $li.find('.toggle-status')
            .click(function () {
            toggle_work(i);
        });
        $li.find('.remove-work')
            .click(function () {
            remove_work(i);
        });
        var $ul = $('ul.todo-list');
        $ul.append($li);
    };

    var toggle_work = function (index) {
        all_work[index].is_complete = !all_work[index].is_complete;
        store.set('all_work', all_work);
        render();
    };

    var remove_work = function (index) {
        all_work.splice(index, 1);
        store.set('all_work', all_work);
        render();
    };

    var completed_work_count = function () {
        var completed_count = 0;
        for (var i = 0; i < all_work.length; i++) {
            if (all_work[i].is_complete) {
                completed_count++;
            }
        }
        return completed_count;
    };

    return {
        init: init
    };
}();