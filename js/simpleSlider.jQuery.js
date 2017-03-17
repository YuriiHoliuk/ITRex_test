(function($) {

    $.fn.simpleSlider = function(links, options) {

        return this.each(function() {

            options = options ? options : {
                delay: 5000,
                paginator: true
            };

            var ths = $(this);
            var i = 0;
            var timer;

            if (links.length < 6 && options.paginator) {
                var paginator = $('<ul class="paginator"></ul>');
                links.forEach((link, i) => {
                    paginator.append('<li class="direct" data-link="' + i + '"></li>');
                });
                ths.append(paginator);
            }


            ths.css({
                'position': 'relative',
                'background-repeat': 'no-repeat',
                'background-size': '100% auto'
            });

            changeImg(0);

            $('.next').on('click', next);
            $('.prev').on('click', prev);
            $('.direct').on('click', goToImg);

            function next() {
                changeImg(true);
            }

            function prev() {
                changeImg(false);
            }

            function goToImg() {
                var state = +$(this).attr('data-link');

                changeImg(state);
            }

            function changeImg(state) {
                clearTimeout(timer);

                $('.direct').removeClass('active');

                if (state === true) {
                    i++;
                } else if (state === false) {
                    i--;
                } else if (typeof state === 'number') {
                    i = state;
                }

                if (i === links.length) {
                    i = 0;
                } else if (i < 0) {
                    i = links.length - 1;
                }

                ths.css({
                    'background-image': 'url(' + links[i] + ')'
                });
                $('.direct[data-link="' + i + '"]').addClass('active');

                timer = setTimeout(changeImg, options.delay, true);
            }

        });

    }

})(window.jQuery);