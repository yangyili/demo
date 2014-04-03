var Todo4 = function () {
    var all_works = store.get('all_works') || [];
    function init() {
        $('input').on('keypress', function (event) {
            if (event.keyCode == 13 && $(this).val()) {
                add_work($(this).val());
                $(this).val('');
            }
        });
        $('.filter').click(function () {
            var status = $(this).data('status') || '';
            filter_work(status);
        });
        render();
        render_nav();
    }

    var render = function () {
        $('.works ul').empty();
        for (var i = 0; i < all_works.length; i++) {
            render_one(all_works[i], i);
        }
    };

    var render_nav = function () {
        var $nav = $('.nav');
        $nav.find('.work-status').text(all_works.length-completed_count()+'left');
        if (all_works.length > 0) {
            $nav.find('.toggle-all').removeClass('none')
                .text('toggle-all')
                .click(function () {
                    toggle_all_work();
                });
        }
        if (completed_count() > 0) {
            $nav.find('.del').removeClass('none')
                .text('clear completed('+completed_count()+')')
                .click(function () {
                    remove_completed_work();
                });
        }
    };
    var render_one = function (work, index) {
        var li_class = work.is_complete ? 'complete' : 'active';
        var li = '<li class='+ li_class +'>' +
            '<a href="javascript:{}" class="sel">s</a>' +
            '<span>' + work.name + '</span>' +
            '<a href="javascript:{}" class="del">x</a>' +
            '</li>';
        var $ul = $('.works ul');
        var $li = $(li);
        $ul.append($li);
        $li.find('.del')
            .click(function () {
                remove_work(index);
            });

        $li.find('.sel')
            .click(function () {
                toggle_work(index);
            });
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

    var filter_work = function (status) {
        var status = status?'.' + status:'';
        var $li = $('li');
        $li.removeClass('none');
        if (status) {
            $li.not(status).addClass('none');
        }
    };

    var toggle_all_work = function () {
    };

    var remove_completed_work = function () {
    };

    var completed_count = function () {
        var completed_count = 0;
        for (var i = 0; i < all_works.length; i++) {
            if (all_works[i].is_complete) {
                completed_count++;
            }
        }
        return completed_count;
    };

    return {
        init: init,
        add_work: add_work,
        remove_work: remove_work,
        toggle_work: toggle_work
    };
}();