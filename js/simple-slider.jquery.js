(function($) {

    $.fn.simpleSlider = function(options) {

        return this.each(function() {


            // Initialize parametres

            var animationDuration = options && options.animationDuration ? options.animationDuration : 500;
            var delay = options && options.delay ? options.delay : 5000;
            var sliderWidth = options && options.width ? options.width : 570;
            var sliderHeight = options && options.height ? options.height : 270;
            var borderWidth = options && options.borderWidth !== undefined ? options.borderWidth : 15;
            var shouldShowControls = options && options.controls !== undefined ? options.controls : true;
            var shouldShowPaginator = options && options.paginator !== undefined ? options.paginator : true;
            var shouldShowRibbon = options && options.ribbon !== undefined ? options.ribbon : true;
            var loop = options && options.loop !== undefined ? options.loop : true;
            var easingFunction = options && options.easing ? options.easing : 'swing';



            // Build & Cache DOM
            var $sliderBox = $(this).addClass('simple-slider'); // If user uses other class for slider
            var $slider = $('ul', $sliderBox).addClass('simple-slider__slider');

            $sliderBox.empty();

            // Clone First slide
            $slider.append($('li:first-child', $slider).clone());

            var $slides = $('li', $slider).addClass('simple-slider__slide');


            // Real last slide index === $slides.length - 1 after cloning
            var lastSlide = $slides.length - 1;


            // Creating help containers
            var $delimiter = $('<div class="simple-slider__ribbon-delimiter"></div>');
            var $container = $('<div class="simple-slider__container"></div>');

            //Create ribbon
            if (shouldShowRibbon) {

                var $ribbon = $('<div class="simple-slider__ribbon">What is hot!</div>');
                $container.append($slider);
                $delimiter.append($container.add($ribbon));
            } else {
                $container.append($slider);
                $delimiter.append($container); // Main elements are here
            }



            // Create Controls
            if (shouldShowControls || shouldShowPaginator) {

                var $controls = $('<div class="controls"></div>');

                if (shouldShowControls) {
                    var $next = $('<button class="simple-slider__arrow simple-slider__next"></button>');
                    var $prev = $('<button class="simple-slider__arrow simple-slider__prev"></button>');
                    $controls.append($prev.add($next));
                }

                if (shouldShowPaginator) {

                    var $paginator = $('<div class="simple-slider__paginator"></div>');

                    for (let i = 0; i < lastSlide; i++) {
                        $paginator.append('<button class="simple-slider__direct" data-slide="' + i + '"></button>');
                    }

                    $('.simple-slider__direct:first-child', $paginator).addClass('active');

                    $controls.append($paginator); // Controls are here
                }

                // Append elements to DOM once
                $sliderBox.append($delimiter.add($controls));

            } else {
                $sliderBox.append($delimiter);
            }

            // Add event listners
            if (shouldShowControls) {
                $('.simple-slider__next', $controls).on('click', nextSlide);
                $('.simple-slider__prev', $controls).on('click', previousSlide);
            }
            if (shouldShowPaginator) {
                $('.simple-slider__direct', $paginator).on('click', goToSlide);
            }

            // Add mobile events
            $slider.on('swipeleft', nextSlide).on('swiperight', previousSlide);


            // Set Slider size
            $container.width(sliderWidth).height(sliderHeight);
            $delimiter.width(sliderWidth).height(sliderHeight);
            $slides.width(sliderWidth).height(sliderHeight);
            $sliderBox.width(sliderWidth + 2 * borderWidth).height(sliderHeight + 2 * borderWidth);
            $slider.width(sliderWidth * $slides.length).height(sliderHeight);

            // Set fake border
            $delimiter.css('padding', borderWidth);

            // Service variables
            var currentSlide = 0,
                timer;


            // Start autoplay slider
            if (loop) {

                (function() {
                    timer = setTimeout(startLoop, delay);
                })();

            }


            //Move to the next slide
            function nextSlide() {

                // go to the other slide only if previous animation has ended
                if (!$slider.is(':animated')) {

                    if (currentSlide === lastSlide) {
                        currentSlide = 0;
                        $slider.css('margin-left', 0);
                    }

                    currentSlide++;

                    go();
                }
            }

            //Move to the previous slide
            function previousSlide() {

                if (!$slider.is(':animated')) {

                    if (currentSlide === 0) {
                        currentSlide = lastSlide;
                        $slider.css('margin-left', '-' + lastSlide * sliderWidth + 'px');
                    }

                    currentSlide--;

                    go();
                }

            }

            //Go to the particular slide
            function goToSlide() {

                if (!$slider.is(':animated')) {

                    if (currentSlide === lastSlide) {
                        currentSlide = 0;
                        $slider.css('margin-left', 0);
                    }

                    currentSlide = +$(this).attr('data-slide');

                    go();
                }
            }


            // General function for set margin
            function go() {
                if (loop) {
                    clearTimeout(timer);
                }
                $slider.animate({ 'margin-left': '-' + currentSlide * sliderWidth + 'px' }, {
                    duration: animationDuration,
                    done: function() {
                        if (loop) {
                            timer = setTimeout(startLoop, delay);
                        }
                    },
                    easing: easingFunction
                });
                setActive();
            }


            // set Active class to paginator buttons
            function setActive() {
                var activeNumber = currentSlide === lastSlide ? 0 : currentSlide;

                $('.simple-slider__direct', $paginator).removeClass('active');
                $('.simple-slider__direct[data-slide="' + activeNumber + '"]', $paginator).addClass('active');

            }

            // Start loop function
            function startLoop() {

                if (!$slider.is(':animated')) {

                    if (currentSlide === lastSlide) {
                        currentSlide = 0;
                        $slider.css('margin-left', 0);
                    }

                    currentSlide++;

                    $slider.animate({ 'margin-left': '-' + currentSlide * sliderWidth + 'px' }, {
                        duration: animationDuration,
                        easing: easingFunction
                    });

                    setActive();

                    timer = setTimeout(startLoop, delay);
                }
            }
        });
    }
})(window.jQuery);