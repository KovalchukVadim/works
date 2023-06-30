const featureMenuItems = document.querySelectorAll('.feature-menu-item');
const featureSlideBoxes = document.querySelectorAll('.feature-slide-box');

featureMenuItems.forEach(function(item) {
    item.addEventListener('click', function() {
        if (!item.classList.contains('active')) {
            const activeMenuItem = document.querySelector('.feature-menu-item.active');
            if (activeMenuItem) {
                resetSwiper();
                activeMenuItem.classList.remove('active');
            }
            item.classList.add('active');
            resetSwiper();
            featureSlideBoxes.forEach(function(box) {
                if (box.dataset.content === item.dataset.id) {
                    box.style.display = 'block';
                } else {
                    box.style.display = 'none';
                }
            });
        } else {
            item.classList.remove('active');
            resetSwiper();
            featureSlideBoxes.forEach(function(box) {
                box.style.display = 'block';
            });
        }
    });
});