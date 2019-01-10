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

const searchBtn = document.querySelector(".search-btn");
const searchDropdown = document.querySelector(".dropdown-search");
const searchDropdownClose = document.querySelector(".dropdown-search__close");

document.addEventListener("click", e => {
  if (e.target == searchBtn) {
    searchDropdown.classList.add("show-header-dropdown");
  }
  if (e.target == searchDropdownClose) {
    searchDropdown.classList.remove("show-header-dropdown");
  }
});
//-----slider------
const sliders = {
  slide1: {
    img: "head.jpg",
    title: "<h2>Mebel</h2><h2>Mebel Furniture</h2><p>Exelent choise for home comfort</p>",
    preview: "slide1_preview.jpg"
  },
  slide2: {
    img: "slide2.jpg",
    title: "<h2>Winter</h2><h2>Winter Furniture</h2><p>Exelent choise for home comfort in Winter</p>",
    preview: "slide2_preview.jpg"
  },
  slide3: {
    img: "head.jpg",
    title: "<h2>Summer</h2><h2>Sum Furniture</h2><p>Exelent choise for home comfort in Summer</p>",
    preview: "slide1_preview.jpg"
  },
  slide4: {
    img: "slide2.jpg",
    title: "<h2>Autumn</h2><h2>Autu Furniture</h2><p>Exelent choise for home comfort in Autumn</p>",
    preview: "slide2_preview.jpg"
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

if (sliderCtr) {
  count.innerHTML = `0${currentSlideNum}<span>/0${sliderMax}</span>`;
  nextPreview.setAttribute("src", `./img/${sliders.slide2.preview}`);
  setTimeout(() => {
    text.classList.add("on-load");
  }, 1);

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
const partnersCtrl = document.querySelector(".partners__control");

if (partnersCtrl) {
  //---partners slider ---
  //    transform: translateX(-200px)
  const partnerBlock = document.querySelector(".partners__circle");
  const ctrlLeft = document.querySelector(".partners-ctrl-left");
  const ctrlRight = document.querySelector(".partners-ctrl-right");
  const partnersSlides = document.querySelector(".circle__flex");

  //---set main block width
  const slidesTotal = partnersSlides.children.length;

  const slideWidth = partnersSlides.children[0].offsetWidth;
  const slideMarginLeft = parseInt(
    getComputedStyle(partnersSlides.children[0]).marginLeft
  );
  const slideMarginRight = parseInt(
    getComputedStyle(partnersSlides.children[0]).marginRight
  );

  const sliderFWidth = slideWidth + slideMarginLeft + slideMarginRight;

  const slideBlockWidth = sliderFWidth * slidesTotal;

  partnersSlides.setAttribute("style", `width: ${slideBlockWidth}px`);

  const hiddenPart = slideBlockWidth - partnerBlock.offsetWidth;

  var marginLeft = "";

  function slideRight() {
    if (hiddenPart > marginLeft) {
      var w = +marginLeft + sliderFWidth;
      marginLeft = w;
      partnersSlides.setAttribute(
        "style",
        `width: ${slideBlockWidth}px; transform: translateX(-${marginLeft}px)`
      );
    } else {
      marginLeft = "";
    }
  }

  function slideLeft() {
    if (marginLeft > 0) {
      var w = +marginLeft - sliderFWidth;
      marginLeft = w;
      partnersSlides.setAttribute(
        "style",
        `width: ${slideBlockWidth}px; transform: translateX(-${marginLeft}px)`
      );
    } else {
      marginLeft = hiddenPart;
    }
  }

  const partnersInterval = setInterval(slideRight, 2000);

  partnersCtrl.addEventListener("click", e => {
    if (e.target == ctrlRight) {
      slideRight();
      clearInterval(partnersInterval);
    }
    if (e.target == ctrlLeft) {
      slideLeft();
      clearInterval(partnersInterval);
    }
  });
}

//---collections tip popup --- NOT WORK PROPERTLY need to fix or rebuld logic
const pointerKey = document.querySelectorAll(".pointer__key");
const pointerClose = document.querySelectorAll(".pointer-tip__close");

for (i = 0; i < pointerClose.length; i++) {
  pointerClose[i].addEventListener("click", e => {
    if (e.target == pointerClose[i]) {
      pointerClose[i].parentNode.classList.remove("tip-show");
    }
  });
}

for (i = 0; i < pointerKey.length; i++) {
  pointerKey[i].addEventListener("click", e => {
    for (i = 0; i < e.currentTarget.children.length; i++) {
      if (e.currentTarget.children[i].classList.contains("pointer-tip")) {
        if (e.currentTarget.children[i].classList.contains("tip-show")) {
          e.currentTarget.children[i].classList.remove("tip-show");
        } else {
          e.currentTarget.children[i].classList.add("tip-show");
        }
      }
    }
  });
}

const subscriptionForm = document.querySelector(".form-subscribe");
if (subscriptionForm) {
  subscriptionForm.addEventListener("submit", e => {
    e.preventDefault();
    for (i = 0; i < e.target.children.length; i++) {
      if (e.target.children[i].attributes.type.value == "email") {
        var isValidEmail = validateEmail(e.target.children[i].value);
      }
    }
    isValidEmail ? thankYou() : console.log("not-valid");
  });
}

function thankYou() {
  const thankYouBlock = document.createElement("div");
  thankYouBlock.classList.add("thx");
  thankYouBlock.innerHTML = "Thank you for subscribe!";
  subscriptionForm.parentNode.replaceChild(thankYouBlock, subscriptionForm);
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// ADD to cart
const cartButtonTop = document.querySelector(".header-cart");
const cartDropDown = document.querySelector(".cart-dropdown");

document.addEventListener("click", e => {
  if (e.target.parentNode.classList.contains("catalog__group__box"))
    if (e.target.innerHTML == "в корзину") {
      e.preventDefault();
      const id = e.target.parentNode.dataset.id;
      const img = e.target.parentNode.children[0].src;
      const title = e.target.parentNode.children[1].innerHTML;
      const price = e.target.parentNode.children[3].innerHTML;
      this.priceNum = parseInt(price.replace(/\s/g, ""));

      addToCart(id, priceNum, title, img);
      moveAnimation(e.target.parentNode);
      totalPrice(priceNum);
    }
  if (e.target.classList.contains("header-cart")) {
    if (cartDropDown.classList.contains("cart-show")) {
      cartDropDown.classList.remove("cart-show");
    } else {
      if (items.children.length > 0) {
        cartDropDown.classList.add("cart-show");
      }
    }
  }
  if (e.target.classList.contains("cart-control__remove")) {
    cartRemoveItem(e.target.parentNode);
  }
});

function moveAnimation(elem) {
  const newR = document.createElement("div");
  newR.classList.add("move-to-cart");
  newR.innerHTML = elem.outerHTML;
  elem.appendChild(newR);
  setTimeout(() => {
    document.querySelector(".move-to-cart").remove();
  }, 1000);
}
const items = document.querySelector(".cart-items");

function addToCart(id, price, title, img) {
  const cartBlock = `
    <div class="cart-img">
        <img src="${img}" alt="">
    </div>
    <div class="cart-control">
        <div class="cart-control__title">${title}</div>
        <div class="cart-control__quanity">
            <span class="control__minus" onclick="quanityCtrlCart(this,'min')">-</span>
            <input class="control__quanity" type="text" pattern="[0-9]{2}" value="1">
            <span class="control__plus" onclick="quanityCtrlCart(this,'plus')">+</span>
        </div>
        <div class="cart-control__price" data-id="${id}"><span>${price}</span> грн.</div>
    </div>
    <div class="cart-control__remove">&times;</div>`;

  var newItem = document.createElement("div");
  newItem.classList.add("cart-item");
  newItem.innerHTML = cartBlock;
  items.appendChild(newItem);
  counterCart(1);
}
const quanityCtrl = document.querySelector(".cart-control__quanity");

function quanityCtrlCart(elem, ctrl) {
  const inputQuanity = elem.parentNode.children[1];
  if (ctrl == "plus") {
    inputQuanity.value++;
    counterCart(1);
  }
  if (ctrl == "min" && inputQuanity.value != 1) {
    inputQuanity.value--;
    counterCart(-1);
  }
}

function counterCart(num) {
  cartCounter.innerHTML = +cartCounter.innerHTML + num;

  if (+cartCounter.innerHTML != "") {
    cartCounter.classList.remove("hide");
  } else {
    cartCounter.classList.add("hide");
  }
}

const cartCounter = document.querySelector(".cart-items-count");

const totalPriceBlock = document.querySelector(".cart-total__price span");

function totalPrice(plusPrice) {
  const oldPrice = totalPriceBlock.innerHTML;
  totalPriceBlock.innerHTML = +oldPrice + +plusPrice;
}

function cartRemoveItem(blockToRemove) {
  blockToRemove.remove();
  counterCart(-1);
  totalPrice(-this.priceNum);
  if (cartCounter.innerHTML == "0") {
    cartDropDown.classList.remove("cart-show");
  }
}
const prodTabs = document.querySelector(".choose__wtd");

if (prodTabs) {
  prodTabs.addEventListener("click", e => {
    if (e.target.tagName == "A") {
      e.preventDefault();
      for (i = 0; i < prodTabs.children.length; i++) {
        if (prodTabs.children[i] == e.target.parentNode) {
          prodTabs.nextElementSibling.children[i].classList.remove("hide");
        } else {
          prodTabs.nextElementSibling.children[i].classList.add("hide");
        }

        if (prodTabs.children[i].classList.contains("choose-tab")) {
          prodTabs.children[i].classList.remove("choose-tab");
        }
      }
      e.target.parentNode.classList.add("choose-tab");
    }
  });
}

const formReserve = document.querySelector(".reserve-date");
if (formReserve) {
  var date = new Date();
  var mm = date.getMonth() + 1;
  mm < 10 ? mm = "0" + mm : null;

  var dd = date.getDate();
  dd < 10 ? dd = "0" + dd : null;
  var yy = date.getFullYear();
  formReserve["date"].value = `${yy}-${mm}-${dd}`;

  formReserve.addEventListener("submit", e => {
    e.preventDefault();
    if (e.target["tel"].value != "" && e.target["tel"].value.length > 6) {
      popUpThx();
    }
  });
}

function popUpThx() {
  const modW = `
    <div class="m-w">
        Спасибо, Ваша заявка отправлена!!!
    </div>
    `;
  const modWBlock = document.createElement("div");
  modWBlock.innerHTML = modW;
  document.body.appendChild(modWBlock);
  setTimeout(() => {
    document.querySelector(".m-w").remove();
  }, 6000);
}
if (document.querySelector(".show__filters__768")) {
  document.querySelector(".show__filters__768").addEventListener("click", e => {
    const sideFilter = document.querySelector(".filters-side-menu");
    if (sideFilter.classList.contains("show")) {
      sideFilter.classList.remove("show");
    } else {
      sideFilter.classList.add("show");
    }
  });
}

let range = document.querySelector("#size-width");
if (range) {
  range.addEventListener("change", e => {
    document.querySelector(".size-width-v").innerHTML = e.target.value;
  });
}

function animationSlide(pos, elem) {
  const block = document.querySelector(elem);
  const blockPosition = +block.offsetTop - +block.clientHeight;

  const line = document.createElement("div");
  line.style.cssText = `height: blockPosition`;

  if (pos == "left") {
    block.classList.add("anim-left-start");
  }
  if (pos == "right") {
    block.classList.add("anim-right-start");
  }
  document.addEventListener("scroll", () => {
    if (blockPosition <= window.pageYOffset) {
      block.classList.add("anim-end");
    }
  });
}
(function () {
  const rangeInput = document.querySelector(".input-range");
  if (rangeInput) {
    const rangeValueMin = document.querySelector(
      ".input-range__value div:first-child"
    );

    const rangeValueMax = document.querySelector(
      ".input-range__value div:last-child"
    );
    rangeInput.children[0].addEventListener("input", function () {
      const rangeInputMin = rangeInput.children[0].value;
      rangeValueMin.setAttribute("style", `left: calc(${rangeInputMin}% - 12px)`);
      rangeValueMin.innerHTML = rangeInputMin;
    });
    rangeInput.children[1].addEventListener("input", function () {
      const rangeInputMax = rangeInput.children[1].value;
      rangeValueMax.setAttribute("style", `left: calc(${rangeInputMax}% - 12px)`);
      rangeValueMax.innerHTML = rangeInputMax;
    });
  }
})();

const regionSelect = document.querySelector(".header__element1");
if (regionSelect) {
  regionSelect.addEventListener("click", e => {
    const regionDropdown = document.querySelector(".region-select-dropdown");
    if (regionDropdown.classList.contains("hide")) {
      regionDropdown.classList.remove("hide");
      regionDropdown.classList.add("smoothShow");
    } else {
      regionDropdown.classList.add("hide");
      regionDropdown.classList.remove("smoothShow");
    }
    if (e.target.nodeName == "LI") {
      for (i = 0; i < regionSelect.children.length; i++) {
        if (regionSelect.children[i].nodeName == "SPAN") {
          let regionCurrent = regionSelect.children[i].innerHTML;
          regionSelect.children[i].innerHTML = e.target.innerHTML;
          e.target.innerHTML = regionCurrent;
        }
      }
    }
  });
}

Tu.tScroll({
  "t-element": ".about__why__h3",
  "t-position": 200,
  "t-animate": "slideRight"
  // 'data-t-show': 3
});
Tu.tScroll({
  "t-element": ".about__img",
  "t-position": 200,
  "t-animate": "slideLeft"
});
Tu.tScroll({
  "t-element": ".about__grid",
  "t-position": 200,
  "t-animate": "slideRight"
});
Tu.tScroll({
  "t-element": ".about__1 h3",
  "t-position": 200,
  "t-animate": "zoomOut",
  "t-delay": 0.5
});
Tu.tScroll({
  "t-element": ".about__2 h3",
  "t-position": 200,
  "t-animate": "zoomOut",
  "t-delay": 0.4
});
Tu.tScroll({
  "t-element": ".about__3 h3",
  "t-position": 200,
  "t-animate": "zoomOut",
  "t-delay": 0.3
});
Tu.tScroll({
  "t-element": ".about__4 h3",
  "t-position": 200,
  "t-animate": "zoomOut",
  "t-delay": 0.5
});
Tu.tScroll({
  "t-element": ".about__5 h3",
  "t-position": 200,
  "t-animate": "zoomOut",
  "t-delay": 0.4
});
Tu.tScroll({
  "t-element": ".about__6 h3",
  "t-position": 200,
  "t-animate": "zoomOut",
  "t-delay": 0.3
});
Tu.tScroll({
  "t-element": ".catalogue__naming h3,.balcony__gr1,.catalogue__dinner__image,.swing__image,.accessories__image,.sale__gr1",
  "t-position": 200,
  "t-animate": "slideLeft"
});
Tu.tScroll({
  "t-element": ".catalogue__relax__image,.balcony__gr2,.horeca__image,.umbrella__image,.sale__gr2,.ready__image",
  "t-position": 200,
  "t-animate": "slideRight"
});

document.querySelector(".header__element").addEventListener("click", () => {
  window.location.href = "./main.html";
});
document.querySelector(".header__element6").addEventListener("click", () => {
  window.location.href = "./showrooms.html";
});
document.querySelector(".cart-checkout").addEventListener("click", () => {
  preventDefault();
  window.location.href = "./order.html";
});