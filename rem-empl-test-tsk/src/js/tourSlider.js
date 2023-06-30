const images = [
    './img/tour-img1.png',
    './img/tour-img2.png',
    './img/tour-img3.png',
    './img/tour-img4.png',
    './img/tour-img1.png',
    './img/tour-img2.png',
    './img/tour-img3.png',
    './img/tour-img4.png',
];

let currentSlide = 0;

function changeSlide() {
    const slider = document.querySelector('.slider3');
    const slides = slider.querySelectorAll('.slide3');
    currentSlide = (currentSlide + 1) % images.length;
    const newSlideIndices = [
        currentSlide,
        (currentSlide + 1) % images.length,
        (currentSlide + 2) % images.length,
        (currentSlide + 3) % images.length,
    ];
    newSlideIndices.forEach((index, i) => {
        const slide = slides[i];
        const newSlide = images[index];
        if (newSlide) {
            slide.style.backgroundImage = `url(${newSlide})`;
        } else {
            currentSlide = 0;
            slide.style.backgroundImage = `url(${images[currentSlide]})`;
        }
    });
}
// setInterval(changeSlide, 1000);
function startSlideShow() {
    intervalId = setInterval(changeSlide, 5000);
}

function pauseSlideShow() {
    clearInterval(intervalId);
}

startSlideShow();

const imagesContainer = document.querySelector('.slider3');
imagesContainer.addEventListener('mouseenter', () => {
    pauseSlideShow();
});

imagesContainer.addEventListener('mouseleave', () => {
    startSlideShow();
});