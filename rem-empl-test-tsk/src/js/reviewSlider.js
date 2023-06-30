    const swiperReview = new Swiper(".mySwiper4", {
        slidesPerView: 'auto',
        spaceBetween: 30,
        // centeredSlides: true,
        // loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },


        breakpoints: {
            // mobile + tablet - 320-990
            320: {
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 0,

                // spaceBetween: 0,

            },
            // 740: {

            // },
            // desktop >= 991
            768: {
                spaceBetween: 30,

                slidesPerView: 'auto',
                centeredSlides: false,


            }
        }

    });