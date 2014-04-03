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
    }

    var render = function () {
        $('.works ul').empty();
        for (var i = 0; i < all_works.length; i++) {
            render_one(all_works[i], i);
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
        var status = '.' + status;
        var $li = $('li');
        $li.removeClass('none');
        if (status) {
            $li.not(status).addClass('none');
        }
    };

    return {
        init: init,
        add_work: add_work,
        remove_work: remove_work,
        toggle_work: toggle_work
    };
}();