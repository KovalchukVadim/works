const anchors = document.querySelectorAll('a[href*="#"]')
for (let anchor of anchors) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault()
        const blockID = anchor.getAttribute('href').substr(1)
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

let hamburger = document.querySelector('.mobile-menu-line');
let menu = document.querySelector('.mobile-menu-list');

const toggleMenu = () => {
    menu.classList.toggle('mobile-active');
    hamburger.classList.toggle("change");
}

hamburger.addEventListener('click', e => {
    e.stopPropagation();

    toggleMenu();
});

document.addEventListener('click', e => {
    let target = e.target;
    let its_menu = target == menu || menu.contains(target);
    let its_hamburger = target == hamburger;
    let menu_is_active = menu.classList.contains('mobile-active');

    if (!its_menu && !its_hamburger && menu_is_active) {
        toggleMenu();
    }
})