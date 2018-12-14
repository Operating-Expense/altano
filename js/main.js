document.querySelector('.header__naming').classList.add('on-load');


const menuBtn = document.querySelector('.header-menu-btn');
const menuDropdown = document.querySelector('.dropdown-menu');
const menuDropdownClose = document.querySelector('.dropdown-menu__close');

document.addEventListener('click', e => {
    if (e.target == menuBtn) {
        menuDropdown.classList.add('show-header-dropdown');
    }
    if (e.target == menuDropdownClose) {
        menuDropdown.classList.remove('show-header-dropdown');
    }
})

//-----slider------
const ctrLeft = document.querySelector('head__arrow--left');
const ctrRight = document.querySelector('head__arrow--right');
const nextPreview = document.querySelector('head__chairimg');
const count = document.querySelector('head__count');
const text = document.querySelector('header__naming');
const mainSlider = document.querySelector('head');