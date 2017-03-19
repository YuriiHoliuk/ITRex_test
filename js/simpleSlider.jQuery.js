/// <reference path="../node_modules/@types/jquery/index.d.ts" />

(function($) {

    $.fn.simpleSlider = function() {

        return this.each(function() {

            // Cache DOM
            var $sliderBox = $(this),
                $sliderContainer = $('.slider-container', $sliderBox),
                $slider = $('ul', $sliderBox),
                $slides = $('li', $slider);

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
                $paginator.append('<li class="direct" data-slide="' + i + '"</li>');
            }

            $controls.append($paginator);
            $sliderBox.append($controls);

            // Add event listners
            $('.next', $controls).on('click', nextSlide);
            $('.prev', $controls).on('click', previousSlide);

            // Start autoplay slider
            setTimeout(loop, delay * 2);


            // Initialize parametres
            var sliderWidth = $sliderContainer.width(),
                currentSlide = 0,
                animationSpeed = 1000,
                delay = 5000;


            //Move to the next slide
            function nextSlide() {
                currentSlide++;
                $slider.animate({ 'margin-left': '-' + currentSlide * sliderWidth + 'px' }, animationSpeed, function() {
                    if (currentSlide == $slides.length) {
                        currentSlide = 0;
                        $slider.css('margin-left', 0);
                    }
                });
            }

            //Move to the previous slide
            function previousSlide() {
                currentSlide--;
                if (currentSlide == -1) {
                    currentSlide = $slides.length - 1;
                    $slider.css('margin-left', '-' + $slides.length * sliderWidth + 'px');
                }
                $slider.animate({ 'margin-left': '-' + currentSlide * sliderWidth + 'px' }, animationSpeed);
            }


            // Loop function
            function loop() {
                nextSlide();
                setTimeout(loop, delay);
            }
        });

    }

})(window.jQuery);