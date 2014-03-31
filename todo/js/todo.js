var Todo = function() {
    var add_work = function(work) {
        var work_element = '<li class="active">' +
            '<a onclick="Todo.toggle_active(this)" href="javascript:{}">sign</a>' +
            '<span>' + work + '</span>' +
            '<a class="del" onclick="Todo.remove_work(this)" href="javascript:{}">x</a>'
        '</li>';
        $('.works ul').append($(work_element));
    };

    var remove_work = function(target) {
        $(target).parent().remove();
    };

    var toggle_active = function(target) {
        $(target).siblings('span').toggleClass('sel');
        $(target).parent().toggleClass('active complete');
    };

    return {
        add_work: add_work,
        remove_work: remove_work,
        toggle_active: toggle_active
    };
}();