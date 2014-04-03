var Todo3 = function () {
    var works = store.get('works') || [];

    var change_status = function (index) {
        works[index].status = works[index].status == 'active' ? 'complete' : 'active';
        store.set('works', works);
    };
    var init = function () {
        for (var i = 0; i < works.length; i++) {
            var li = '<li class=' + works[i].status +'>'+
                  '<a class="sel">S</a>' +
                  '<span>' + works[i].name + '</span>' +
                  '<a class="del">X</a>' +
                '</li>';
            $('.works ul').append(li);
        }
        $('li').find('.sel').click(function (index, element) {
            $(this).parent('li').toggleClass('active complete');
            //change_status(index);
            console.log('index', index);
            works[index]['status'] = works[index].status == 'active' ? 'complete' : 'active';
            store.set('works', works);
        });

        $('li').find('.del').click(function (index) {
            $(this).parent('li').remove();
//            works.splice(index, 1);
//            store.set('works', works);
        });
    };

    var  add_work = function (name) {
        var li = '<li class="active">'+
            '<a class="sel">S</a>' +
        '<span>' + name + '</span>' +
        '<a class="del">X</a>' +
        '</li>';

        $(li).find('sel').click(function () {
            $(this).parent('li').toggleClass('active complete');
//            works[index].status = works[index].status == 'active' ? 'complete' : 'active';
//            store.set('works', works);
        });

        $(li).find('del').click(function () {
            $(this).parent('li').toggleClass('active complete');
//            works.splice(index, 1);
//            store.set('works', works);
        });
        $('.works ul').prepend(li);
        var work = {status: 'active', name: name};
        works.unshift(work);
        store.set('works', works);
    };

    return {
        init: init,
        add_work: add_work
    };
}();