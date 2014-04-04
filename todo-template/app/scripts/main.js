var Todo = function () {
    var all_works = store.get('all_works') || [];
    function init() {
        console.log('init');
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
        var li = '<li class="list-group-item todo-list-item">' +
                    '<a class="glyphicon glyphicon-ok btn-link"></a>' +
                    '<span class="col-xs-offset-1">' + work.name + '</span>' +
                    '<a class="glyphicon glyphicon-remove btn-link pull-right remove"></a>' +
                 '</li>';
        var $li = $(li);
        $li.find('.glyphicon-remove')
            .click(function () {
                remove_work(index);
            });
        $li.find('glyphicon-ok')
            .click(function () {
                toggle_work(index);
            });
        $('ul.list-group').append($li);
    };

    var render_nav = function () {
    };

    var add_work = function (name) {
        var work = {is_complete: 0, name: name};
        all_works.unshift(work);
        store.set('all_works', all_works);
        render();
    };

    var remove_work = function (index) {
        all_works.splice(index, 1);
        render();
    };

    var toggle_work = function (index) {
        all_works[index].is_complete = !all_works[index].is_complete;
        render();
    };

    return {
        init: init
    };
}();