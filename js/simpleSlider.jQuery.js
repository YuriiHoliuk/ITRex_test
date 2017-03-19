(function($) {

    $.fn.simpleSlider = function() {

        return this.each(function() {

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

            //Create label
            var $ribbon = $('<div class="simple-slider__ribbon">What is hot!</div>');


            $container.append($slider);
            $delimiter.append($container.add($ribbon)); // Main elements are here


            // Create Controls
            var $controls = $(`
                <div class="controls">
                    <button class="simple-slider__arrow simple-slider__prev"></button>
                    <button class="simple-slider__arrow simple-slider__next"></button>
                </div>
            `);

            var $paginator = $('<div class="simple-slider__paginator"></div>');

            for (let i = 0; i < lastSlide; i++) {
                $paginator.append('<button class="simple-slider__direct" data-slide="' + i + '"></button>');
            }

            $('.simple-slider__direct:first-child', $paginator).addClass('active');

            $controls.append($paginator); // Controls are here

            // Append elements to DOM once
            $sliderBox.append($delimiter.add($controls));

            // Add event listners
            $('.simple-slider__next', $controls).on('click', nextSlide);
            $('.simple-slider__prev', $controls).on('click', previousSlide);
            $('.simple-slider__direct', $paginator).on('click', goToSlide);


            // Initialize parametres
            var sliderWidth = $container.width(),
                currentSlide = 0,
                animationSpeed = 1000,
                delay = 5000,
                timer;


            // Start autoplay slider
            (function() {
                timer = setTimeout(startLoop, delay);
            })();


            //Move to the next slide
            function nextSlide() {

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
                clearTimeout(timer);
                $slider.animate({ 'margin-left': '-' + currentSlide * sliderWidth + 'px' }, {
                    duration: animationSpeed,
                    done: function() {
                        timer = setTimeout(startLoop, delay);
                    }
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
                        duration: animationSpeed
                    });

                    setActive();

                    timer = setTimeout(startLoop, delay);
                }

            }


        });

    }

})(window.jQuery);