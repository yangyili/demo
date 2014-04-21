var Todo = function () {
    var all_work = [];
    function init() {
        $('input.unadded-todo').keypress(function (event) {
            var $this = $(this);
            if (event.keyCode == 13 && $this.val()) {
                var work = {name: $this.val(), is_complete: 0};
                all_work.unshift(work);
                $this.val('');
            }
        });
    }

    return {
        init: init
    };
}();