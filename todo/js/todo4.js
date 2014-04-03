var Todo4 = function () {
    var init_data = function () {
        var all_works = store.get('all_works') || [];
        $('.works ul').empty();
        for (var i = 0; i < all_works.length; i++) {
            render_one(all_works[i]);
        }
    };
    var render_one = function (work) {
        var li_class = work.is_complete ? 'complete' : 'active';
        var id = work.id.toString();
        var li = '<li class='+ li_class +'>' +
            '<a href="javascript:{}" class="sel" data-id='+ work.id +'>s</a>' +
            '<span>' + work.name + '</span>' +
            '<a href="javascript:{}" class="del" data-id='+ work.id + '>x</a>' +
            '</li>';
        var $ul = $('.works ul');
        var $li = $(li);
        $ul.append($li);
        $li.find('.del')
            .click(function () {
                var id = $(this).data('id');
                Todo4.remove_work(id);
            });

        $li.find('.sel')
            .click(function () {
                var id = $(this).data('id');
                Todo4.toggle_work(id);
            });
        ;

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
        var works = store.get('all_works') || {};
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