class HeroSlider {
    constructor(el) {
        this.el = el;
        this.swiper = this._initSwiper();
    }

    _initSwiper() {
        return new Swiper(this.el, {
            loop: true,
            // loopAdditionalSlides: 1,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            speed: 800,
            grabCursor: true,
            centeredSlides: true,
            breakpoints: {
                0: {
                    slidesPerView: 'auto',
                    spaceBetween: 150
                },
                960: {
                    slidesPerView: 'auto',
                    spaceBetween: 132
                },
                1500: {
                    // slidesPerView: 5,
                    spaceBetween: 118
                }
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true 
            }
        });
    }

    start(options = {}) {
        options = Object.assign({
            delay: 4000,
            disableOnInteraction: false
        }, options);

        this.swiper.params.autoplay = options;
        this.swiper.autoplay.start();
    }
    stop() {
        this.swiper.autoplay.stop();
    }
}