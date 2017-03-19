(function($, window, document) {

    $(function() {

        $('.my-slider').simpleSlider({
            width: 570,
            height: 270,
            borderWidth: 15,
            animationDuration: 1000,
            delay: 5000,
            controls: true,
            paginator: true,
            ribbon: true,
            loop: true,
            easing: 'swing'
        });

    });

}(window.jQuery, window, document));