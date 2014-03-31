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
            $('.work-operate').removeClass('none');
        } else {
            $('.toggle-all').addClass('none');
            $('.work-operate').addClass('none');
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
        var left_text = $('li.active').length + 'item left';
        var complete_text = "Clear complete(" + $('li.complete').length + ")";
        $('span.work-left').text(left_text);
        $('a.work-complete').text(complete_text);
    };

    var remove_all_complete_work = function () {
        $('li.complete').remove();
        change_work_left_status();
    };
    return {
        add_work: add_work,
        remove_work: remove_work,
        toggle_active: toggle_active,
        toggle_all_works: toggle_all_works,
        toggle_sign_all_btn: toggle_sign_all_btn,
        filter_work: filter_work,
        remove_all_complete_work: remove_all_complete_work
    };
}();