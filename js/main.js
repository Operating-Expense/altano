const menuBtn = document.querySelector(".header-menu-btn");
const menuDropdown = document.querySelector(".dropdown-menu");
const menuDropdownClose = document.querySelector(".dropdown-menu__close");

document.addEventListener("click", e => {
    if (e.target == menuBtn) {
        menuDropdown.classList.add("show-header-dropdown");
    }
    if (e.target == menuDropdownClose) {
        menuDropdown.classList.remove("show-header-dropdown");
    }
});

//-----slider------
const sliders = {
    slide1: {
        img: "head.jpg",
        title: "<h2>1Mrbel</h2><h2>Mrbel Furniture</h2><p>Exelent choise for home comfort</p>",
        preview: "blue_chair.jpg"
    },
    slide2: {
        img: "slide2.jpg",
        title: "<h2>2Winter</h2><h2>Winter Furniture</h2><p>Exelent choise for home comfort in Winter</p>",
        preview: "red_chair.jpg"
    },
    slide3: {
        img: "head.jpg",
        title: "<h2>3Summer</h2><h2>Sum Furniture</h2><p>Exelent choise for home comfort in Summer</p>",
        preview: "blue_chair.jpg"
    },
    slide4: {
        img: "slide2.jpg",
        title: "<h2>4Autumn</h2><h2>Autu Furniture</h2><p>Exelent choise for home comfort in Autumn</p>",
        preview: "red_chair.jpg"
    }
};

var currentSlideNum = 1;
var sliderMax = Object.keys(sliders).length;

const sliderCtr = document.querySelector(".head__arrow");
const ctrLeft = document.querySelector(".head__arrow--left");
const ctrRight = document.querySelector(".head__arrow--right");

const mainSlider = document.querySelector(".head");

const nextPreview = document.querySelector(".head__chairimg");

const count = document.querySelector(".head__count");
const text = document.querySelector(".header__naming");

//---slider template init---

setTimeout(() => {
    text.classList.add("on-load");
}, 1);

count.innerHTML = `0${currentSlideNum}<span>/0${sliderMax}</span>`;
nextPreview.setAttribute("src", `./img/${sliders.slide2.preview}`);

if (sliderCtr) {
    setInterval(doNext, 10000);

    sliderCtr.addEventListener("click", e => {
        if (e.target == ctrRight) {
            doNext();
        }
        if (e.target == ctrLeft) {
            doPrev();
        }
    });
    nextPreview.addEventListener("click", doNext);

    function initSlide() {
        var currentSliderName = "slide" + currentSlideNum;
        var currentSlider = sliders[currentSliderName];
        if (currentSlideNum == sliderMax) {
            var nextSliderName = "slide1";
        } else {
            var nextSliderName = "slide" + (currentSlideNum + 1);
        }
        this.nextSlider = sliders[nextSliderName];

        count.innerHTML = `0${currentSlideNum}<span>/0${sliderMax}</span>`;
        //---title-set---
        text.innerHTML = `${currentSlider.title}`;
        //---main-img-set---
        mainSlider.setAttribute(
            "style",
            `background-image: url(./img/${currentSlider.img})`
        );
        //---preview-set---
        nextPreview.setAttribute("src", `./img/${nextSlider.preview}`);
    }

    function doNext() {
        currentSlideNum < sliderMax ? currentSlideNum++ : (currentSlideNum = 1);
        titleAnimation();
        initSlide();
    }

    function doPrev() {
        currentSlideNum > 1 ? currentSlideNum-- : (currentSlideNum = sliderMax);
        titleAnimation();
        initSlide();
    }

    function titleAnimation() {
        text.classList.remove("on-load");

        setTimeout(() => {
            text.classList.add("on-load");
        }, 4);
    }
}
const partnersCtrl = document.querySelector('.partners__control');

if (partnersCtrl) {
    //---partners slider ---
    //    transform: translateX(-200px)
    const partnerBlock = document.querySelector('.partners__circle');
    const ctrlLeft = document.querySelector('.partners-ctrl-left');
    const ctrlRight = document.querySelector('.partners-ctrl-right');
    const partnersSlides = document.querySelector('.circle__flex');

    //---set main block width
    const slidesTotal = partnersSlides.children.length;

    const slideWidth = partnersSlides.children[0].offsetWidth;
    const slideMarginLeft = parseInt(getComputedStyle(partnersSlides.children[0]).marginLeft);
    const slideMarginRight = parseInt(getComputedStyle(partnersSlides.children[0]).marginRight);

    const sliderFWidth = slideWidth + slideMarginLeft + slideMarginRight;

    const slideBlockWidth = sliderFWidth * slidesTotal;

    partnersSlides.setAttribute('style', `width: ${slideBlockWidth}px`);

    const hiddenPart = slideBlockWidth - partnerBlock.offsetWidth;

    var marginLeft = '';

    function slideRight() {
        if (hiddenPart > marginLeft) {
            var w = +marginLeft + sliderFWidth;
            marginLeft = w;
            partnersSlides.setAttribute('style', `width: ${slideBlockWidth}px; transform: translateX(-${marginLeft}px)`);
        } else {
            marginLeft = '';
        }
    }

    function slideLeft() {
        if (marginLeft > 0) {
            var w = +marginLeft - sliderFWidth;
            marginLeft = w;
            partnersSlides.setAttribute('style', `width: ${slideBlockWidth}px; transform: translateX(-${marginLeft}px)`);
        } else {
            marginLeft = hiddenPart;
        }
    }

    const partnersInterval = setInterval(slideRight, 2000);

    partnersCtrl.addEventListener('click', (e) => {
        if (e.target == ctrlRight) {
            slideRight();
            clearInterval(partnersInterval);
        }
        if (e.target == ctrlLeft) {
            slideLeft();
            clearInterval(partnersInterval);
        }
    })
}