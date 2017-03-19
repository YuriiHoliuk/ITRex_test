/// <reference path="../node_modules/@types/jquery/index.d.ts" />

(function($) {

    $.fn.simpleSlider = function() {

        return this.each(function() {

            // Cache DOM
            var $sliderBox = $(this),
                $sliderContainer = $('.slider-container', $sliderBox),
                $slider = $('ul', $sliderBox),
                $slides = $('li', $slider);

            // Real last slide index === $slides.length before cloning
            var lastSlide = $slides.length;

            // Clone First slide
            $slider.append($($slides[0]).clone());

            // Create Controls
            var $controls = $(`
                <div class="controls">
                    <button class="arrow prev"></button>
                    <button class="arrow next"></button>
                </div>
            `);

            var $paginator = $(`
                <div class="paginator"></div>
            `);

            for (let i = 0; i < $slides.length; i++) {
                $paginator.append('<li class="direct" data-slide="' + i + '"></li>');
            }

            $('.direct:first-child', $paginator).addClass('active');

            $controls.append($paginator);
            $sliderBox.append($controls);

            // Add event listners
            $('.next', $controls).on('click', nextSlide);
            $('.prev', $controls).on('click', previousSlide);
            $('.direct', $controls).on('click', goToSlide);

            // Start autoplay slider
            var timer;
            timer = setTimeout(startLoop, delay);


            // Initialize parametres
            var sliderWidth = $sliderContainer.width(),
                currentSlide = 0,
                animationSpeed = 1000,
                delay = 5000;


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

                $('.direct', $paginator).removeClass('active');
                $('.direct[data-slide="' + activeNumber + '"]', $paginator).addClass('active');

            }

            // Start loop
            function startLoop() {

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


        });

    }

})(window.jQuery);