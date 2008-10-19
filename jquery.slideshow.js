;(function($) {

$.fn.slideshow = function(options) {
    return this.each(function() {
        // ‘this’ is our slideshow container element
        var $this = $(this);
        
        // build opts: defaults first, then the passed-in obj, then markup metadata
        var opts = $.extend(
			{}, 
            $.fn.slideshow.defaults, 
            options || {}, 
            $.metadata ? $this.metadata() : {}
		);
        
        var $slides = $this.children();
        var curr = 0, slideCount = $slides.size();
        
        // hide all slides but the first
        $slides.each(function(i) {
            // 'this' is the slide element
            $(this)[i==0 ? 'show' : 'hide']();
        });
        
        // this function is private
        function transition() {
            var next = curr == (slideCount - 1) ? 0 : curr + 1;

            // fadeOut curr, fadeIn next
            $($slides[curr]).fadeOut(opts.speed);
            $($slides[next]).fadeIn(opts.speed);

            // start timer again
            setTimeout(transition, opts.timeout);
            
            curr = curr == (slideCount - 1) ? 0 : curr + 1;
        };
        // start the initial timer
        setTimeout(transition, opts.timeout);
    });
};

// plugin default settings
$.fn.slideshow.defaults = {
    timeout: 4000,
    speed:   1000
};

})(jQuery);
