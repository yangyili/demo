var Todo4 = function () {
    var init_data = function () {
        var all_works = store.get('all_works') || [];
        $('.works ul').empty();
        for (var i = 0; i < all_works.length; i++) {
            var li_class = all_works[i].is_complete ? 'complete' : 'active';
            var li = '<li class='+ li_class +'>' +
                       '<a href="javascript:{}" class="sel" data-id='+ all_works[i].id +'>s</a>' +
                       '<span>' + all_works[i].name + '</span>' +
                       '<a href="javascript:{}" class="del" data-id='+ all_works[i].id + '>x</a>' +
                     '</li>';
            $('.works ul').append($(li));
        }
        $('li .del').click(function () {
            var id = $(this).data('id');
            Todo4.remove_work(id);
        });
        $('li .sel').click(function () {
            var id = $(this).data('id');
            console.log('sel id', id);
            Todo4.toggle_work(id);
        });
    };

    var add_work = function (name) {
        var works = store.get('all_works') || [];
        var id = works.length + 1;
        var work = {id: id.toString(), is_complete: 0, name: name};
        works.unshift(work);
        store.set('all_works', works);
        init_data();
    };

    var remove_work = function (id) {
        var index = index_of_works(id);
        var works = store.get('all_works');
        works.splice(index, 1);
        store.set('all_works', works);
        init_data();
    };

    var toggle_work = function (id) {
        var index = index_of_works(id);
        console.log('index', index);
        var works = store.get('all_works');
        works[index].is_complete = !works[index].is_complete;
        store.set('all_works', works);
        init_data();
    };

    var index_of_works = function (id) {
        var works = store.get('all_works');
        for (var i = 0; i < works.length; i++) {
            if (works[i].id == id) {
                return i;
            }
        }
        return -1;
    };

    return {
        init: init_data,
        add_work: add_work,
        remove_work: remove_work,
        toggle_work: toggle_work
    };
}();