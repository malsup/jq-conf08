;(function($) {

$.fn.formlite = function(options) {
    return this.submit(function() {
        var form = this, $form = $(this);
        
        var opts = $.extend({
            url:  $form.attr('action'),
            type: $form.attr('method') || 'GET'
        }, options || {});
        
        var data = $form.serialize();
        $.ajax({
            url:  opts.url,
            type: opts.method,
            data: data,
            success: function(response) {
                if (opts.target)
                    $(opts.target).html(response);
                else if (opts.success)
                    opts.success.call(form, response);
            }
        });
        return false;
    });
};

})(jQuery);
