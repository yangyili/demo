var Todo = function() {
    var add_work = function(work) {
        var work_element = '<li class="active">' +
            '<a class="sel" href="javascript:{}">sign</a>' +
            '<span>' + work + '</span>' +
            '<a class="del" href="javascript:{}">x</a>'
        '</li>';
        $('.works ul').append($(work_element));
    };
    return {
        add_work: add_work
    };
}();