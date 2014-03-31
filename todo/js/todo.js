var Todo = function() {
    var add_work = function(work) {
        var work_element = '<li class="active">' +
            '<a class="sel" href="javascript:{}">sign</a>' +
            '<span>' + work + '</span>' +
            '<a class="del" onclick="Todo.remove_work(this)" href="javascript:{}">x</a>'
        '</li>';
        $('.works ul').append($(work_element));
    };

    var remove_work = function(target) {
        console.log('target', target, $(target));
        $(target).parent().remove();
    }
    return {
        add_work: add_work,
        remove_work: remove_work
    };
}();