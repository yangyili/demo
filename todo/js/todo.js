var Todo = function() {
    var add_work = function(work) {
        var work_element = '<li class="active">' +
            '<a onclick="Todo.toggle_active(this)" href="javascript:{}">sign</a>' +
            '<span>' + work + '</span>' +
            '<a onclick="Todo.remove_work(this)" href="javascript:{}">x</a>'
        '</li>';
        $('.works ul').append($(work_element));
        toggle_sign_all_btn();
        change_work_left_status();
    };

    var remove_work = function(target) {
        $(target).parent().remove();
        toggle_sign_all_btn();
        change_work_left_status();
    };

    var toggle_active = function(target) {
        $(target).parent().toggleClass('active complete');
        change_work_left_status();
    };

    var toggle_all_works = function() {
        if ($('li.active').length > 0) {
            $('li').removeClass('active').addClass('complete');
        } else {
            $('li').removeClass('complete').addClass('active');
        }
        change_work_left_status();
    };

    var toggle_sign_all_btn = function () {
        if ($('ul').children().length > 0) {
            $('.toggle-all').removeClass('none');
        } else {
            $('.toggle-all').addClass('none');
        }
    };

    var filter_work = function (status) {
        if (status) {
            $('li').not('.' + status).addClass('none');
            $('li.' + status).removeClass('none');
        } else {
            $('li').removeClass('none')
        }
    };

    var change_work_left_status = function () {
        var text = $('li.active').length + 'item left';
        $('span.work-left').text(text);
    };
    return {
        add_work: add_work,
        remove_work: remove_work,
        toggle_active: toggle_active,
        toggle_all_works: toggle_all_works,
        toggle_sign_all_btn: toggle_sign_all_btn,
        filter_work: filter_work
    };
}();