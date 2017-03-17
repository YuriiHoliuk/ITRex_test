(function($, window, document) {

    $(function() {

        $('.simpleSlider').simpleSlider([
            'http://loremflickr.com/1120/540/montain?random=1',
            'http://loremflickr.com/1120/540/montain?random=2',
            'http://loremflickr.com/1120/540/montain?random=3'
        ], {
            delay: 7000,
            paginator: true
        });

    });

}(window.jQuery, window, document));