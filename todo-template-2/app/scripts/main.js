var Todo6 = function () {
    var all_work = store.get('all_work') || [];
    var init = function() {
        console.log('work_name');
        $('.unadded-todo').on('keypress', function (event) {
            var work_name = $(this).val();
            console.log(work_name);
            if (event.keyCode == 13 && work_name) {
                add_work(work_name);
                $(this).val('');
            }
        });
    };

    var add_work = function (work_name) {
        var work = {name: work_name, is_complete: 0};
        all_work.unshift(work );
        store.set('all_work', all_work)
    };
    return {
        init: init,
        add_work: add_work
    };
}();