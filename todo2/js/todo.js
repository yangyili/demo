var Todo = function () {
    var add_work = function (target) {
        if ($(target).val()) {
            var work = '<li class="active">' +
                '<a class="sel" onclick="Todo.toggle_active(this)" href="javascript:{}">S</a>' +
                '<span>' + $(target).val() + '</span>' +
                '<a class="del" onclick="Todo.remove_work(this)" href="javascript:{}">X</a>' +
                '</li>';
            $('.works ul').append($(work));
            $(target).val('');
        }
    };

    var toggle_active = function (target) {
        $(target).parent('li').toggleClass('active complete');
    };

    var remove_work = function (target) {
        $(target).parent('li').remove();
    };

    var filter_work = function (status) {
        if (status) {
            $('li').not('.' + status).addClass('none');
            $('li.' + status).removeClass('none');
        } else {
            $('li').removeClass('none');
        }
    };
    return {
        add_work: add_work,
        toggle_active: toggle_active,
        remove_work: remove_work,
        filter_work: filter_work
    };
}();