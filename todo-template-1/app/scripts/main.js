var Todo = function () {
    var all_works = store.get('all_works') || [];
    function init() {
        $('.input-group').find('input')
            .on('keypress', function (event) {
                if ($(this).val() && event.keyCode == 13) {
                    add_work($(this).val());
                    $(this).val('');
                }
            });
        render();
    }

    var render = function () {
        $('ul.list-group').empty();
        for (var i = 0; i < all_works.length; i++) {
            render_one(all_works[i], i);
        }
        render_nav();
    };

    var render_one = function (work, index) {
        var status = work.is_complete?'complete':'actived';
        var li = '<li class="list-group-item todo-list-item '+ status + '"' +'>' +
                    '<a class="glyphicon glyphicon-ok btn-link"></a>' +
                    '<span class="col-xs-offset-1">' + work.name + '</span>' +
                    '<a class="glyphicon glyphicon-remove btn-link pull-right remove"></a>' +
                 '</li>';
        var $li = $(li);
        $li.find('.glyphicon-remove')
            .click(function () {
                remove_work(index);
            });
        $li.find('.glyphicon-ok')
            .click(function () {
                toggle_work(index);
            });
        $('ul.list-group').append($li);
    };

    var render_nav = function () {
        $('.filter-work').click(function () {
            var status = $(this).data('status');
            filter_work(status);
        });
        var $toggle_all = $('.input-group').find('a');
        var $status_nav = $('.list-group-item-info');

        $toggle_all.click(function () {
            toggle_all_work();
        });
        if (all_works.length > 0) {
            $toggle_all.removeClass('hide-element');
            $status_nav.removeClass('none');
        } else {
            $toggle_all.addClass('hide-element');
            $status_nav.addClass('none');
        }

        var $clear_btn = $('a.clear-complete-btn');
        var completed_count = complete_count();

        $clear_btn.click(function () {
            remove_all_work();
        });
        $clear_btn.text('clear completed('+completed_count+')');
        if (completed_count > 0) {
            $clear_btn.removeClass('hide-element');
        } else {
            $clear_btn.addClass('hide-element');
        }
    };

    var add_work = function (name) {
        var work = {is_complete: 0, name: name};
        all_works.unshift(work);
        store.set('all_works', all_works);
        render();
    };

    var remove_work = function (index) {
        all_works.splice(index, 1);
        store.set('all_works', all_works);
        render();
    };

    var toggle_work = function (index) {
        all_works[index].is_complete = !all_works[index].is_complete;
        store.set('all_works', all_works);
        render();
    };

    var toggle_all_work = function () {
        var completed_count = complete_count();
        if (completed_count == all_works.length) {
            change_status(0);
        } else {
            change_status(1);
        }
        render();
    };

    var filter_work = function(status) {
        var $li = $('li.todo-list-item');
        $li.removeClass('none');
        if (status) {
            $li.not('.'+status).addClass('none');
        }
    };

    var remove_all_work = function () {
        all_works = [];
        store.set('all_works', all_works);
        render();
    };

    var complete_count = function () {
        var complete_count = 0;
        for (var i =0; i < all_works.length; i++) {
            if (all_works[i].is_complete) {
                complete_count++;
            }
        }
        return complete_count;
    };

    var change_status = function (status) {
        for (var i = 0; i < all_works.length; i++) {
            all_works[i].is_complete = status;
        }
        store.set('all_works', all_works);
    };

    return {
        init: init
    };
}();