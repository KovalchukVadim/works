let tabsTitle = document.querySelectorAll('.tabs-title')
tabsTitle.forEach(element => {
    element.addEventListener('click', function() {
        let curTab = document.querySelector('.tabs-item[data-content="' + this.dataset.id + '"]')
        document.querySelector('.tabs-title.active').classList.remove('active')
        document.querySelector('.tabs-item.open').classList.remove('open')
        this.classList.add('active')
        curTab.classList.add('open')
    })
})
let worksTitle = document.querySelectorAll('.works-title')
worksTitle.forEach(element => {
    element.addEventListener('click', function() {
        let curWork = document.querySelector('.works-item[data-content="' + this.dataset.id + '"]')
        document.querySelector('.works-title.active').classList.remove('active')
        document.querySelector('.works-item.open').classList.remove('open')

        let item = document.querySelectorAll('.works-item.open')
        item.forEach(el => {
            if (el.classList.contains('open')) {
                el.classList.remove('open')
            }
        })

        this.classList.add('active')
        curWork.classList.add('open')
        const btn = document.querySelector('.load-more-box')
        btn.style.display = 'flex'
    })
})
let loadMereBtn = document.querySelector('.load-more')
loadMereBtn.addEventListener('click', function() {
    let images = Array.from(document.querySelectorAll('.works-item'))
        // console.log(images)
    for (let index = 0; index < images.length; index++) {
        if (!images[index].classList.contains('open')) {
            images[index].classList.add('open')
            break
        } else if (index === 2) {
            const btn = document.querySelector('.load-more-box')
            btn.style.display = 'none'
        }
    }
})



let galleryThumbs = new Swiper('.gallery-thumbs', {

    centeredSlides: true,
    cssMode: true,
    slidesPerView: 4,
    loop: true,
    freeMode: true,
    loopedSlides: 5, //looped slides should be the same
    watchSlidesVisibility: true,
    watchSlidesProgress: true,


});


let galleryTop = new Swiper('.gallery-top', {
    loop: true,
    loopedSlides: 5, //looped slides should be the same
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: galleryThumbs,
    },
});