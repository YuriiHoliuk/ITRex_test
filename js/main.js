(function($, window, document) {

    $(function() {

        $('.my-slider').simpleSlider({
            width: 570,
            height: 270,
            borderWidth: 15,
            animationDuration: 500,
            delay: 5000,
            controls: true,
            paginator: true,
            ribbon: true,
            loop: true
        });

    });

}(window.jQuery, window, document));