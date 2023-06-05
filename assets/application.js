// Put your application javascript here

window.addEventListener('scroll', function() {
  const scrollToTopButton = document.getElementById('scrollToTopButton');
  if (window.pageYOffset > 200) { // Adjust the value as needed
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const scrollToTopButton = document.getElementById('scrollToTopButton');
  scrollToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

if (document.getElementById("sort_by") != null) {
  document.querySelector("#sort_by").addEventListener("change", function (e) {
    const url = new URL(window.location.href);
    url.searchParams.set("sort_by", e.currentTarget.value);

    window.location = url.href;
  });
}

if (document.getElementById("country") != null) {
  document.getElementById("country").addEventListener("change", function (e) {
    const provinces =
      this.options[this.selectedIndex].getAttribute("data-provinces");
    const provinceSelector = document.getElementById("province");
    const provinceArray = JSON.parse(provinces);

    // console.log(provinceArray);
    if (provinceArray.length < 1) {
      provinceSelector.setAttribute("disabled", "disabled");
    } else {
      provinceSelector.removeAttribute("disabled");
    }

    provinceSelector.innerHTML = "";
    let options = "";
    for (let i = 0; i < provinceArray.length; i++) {
      options +=
        '<option value="' +
        provinceArray[i][0] +
        '">' +
        provinceArray[i][0] +
        "</option>";
    }

    provinceSelector.innerHTML = options;
  });
}

if (document.getElementById("forgotPassword") != null) {
  document.getElementById("forgotPassword").addEventListener("click", (e) => {
    const element = document.querySelector("#forgot_password_form");
    if (element.classList.contains("d-none")) {
      element.classList.remove("d-none");
      element.classList.add("d-block");
    } else {
      element.classList.add("d-none");
      element.classList.remove("d-block");
    }
  });
}

// const productModal = new bootstrap.Modal(
//   document.getElementById("productInfoModal"),
//   {}
// );

// const productInfoAnchors = document.querySelectorAll("#productInfoAnchor");
// if (productInfoAnchors.length > 0) {
//   productInfoAnchors.forEach((item) => {
//     item.addEventListener("click", (event) => {
//       const url = '/products/' + item.getAttribute('product-handle') + '.js';
//       fetch(url)
//         .then((resp) => resp.json())
//         .then(function (data) {
//           console.log(data);

//           document.getElementById('productInfoImg').src = data.images[0];
//           document.getElementById('productInfoTitle').innerHTML = data.title;
//           document.getElementById('productInfoPrice').innerHTML = item.getAttribute('product-price');
//           document.getElementById('productInfoDescription').innerHTML = data.description;

//           productModal.show();
//         });

//     });
//   });
// }

if (document.getElementById("forgotPasswordAccount") != null) {
  document.getElementById("forgotPasswordAccount").addEventListener("click", (e) => {
    const link = document.querySelector("#forgot_password_account");
    if (link.classList.contains("d-none")) {
      link.classList.remove("d-none");
      link.classList.add("d-block");
    } else {
      link.classList.add("d-none");
      link.classList.remove("d-block");
    }
  });
}

document.addEventListener("DOMContentLoaded", (data) => {
  updateCart(data);
});

async function updateCart(data) {
  try {
    const response = await fetch("/cart.js");
    const data = await response.json();
    document.querySelector("#numberOfCartItem1").innerHTML = data.item_count;
    document.querySelector("#numberOfCartItem2").innerHTML = data.item_count;
  } catch (error) {
    console.error(error);
  }
}

// menu
const menuElm = document.querySelector(".navbar-toggler");
const icon = document.querySelector(".navbar-toggler-icon");
const fontawesome = document.getElementById("mobile");

menuElm.addEventListener("click", function (event) {
  event.preventDefault();

  if (menuElm.classList.contains("collapsed")) {
    fontawesome.textContent = "menu";
  } else {
    fontawesome.textContent = "close";
  }
});



const filterContainer = document.querySelector(".filter-container");
const filterIcon = document.getElementById("filter-icon");
const filterActive = "opened";
const filterText = document.querySelector(".show-filters");

if (filterIcon) {
  filterIcon.addEventListener("click", (e) => {
    e.preventDefault();

    if (filterContainer.className.indexOf("opened") === -1) {
      filterContainer.classList.add(filterActive);
      filterText.innerHTML = "Hide filters";
    } else {
      filterContainer.classList.remove(filterActive);
      filterText.innerHTML = "Show filters";
    }
  });
}

// const generalDescription = document.querySelector('.general-description')
// const technicalInformation = document.querySelector('.technical-description')
// const generalText = document.querySelector('.general-description-text')
// const technicalText = document.querySelector('.technical-description-text')

// if (generalDescription) {
//   generalDescription.addEventListener('click', (e) => {
//     if (generalText.className.indexOf("display-none") === -1) {
//       generalText.classList.add("display-none");
//     } else {
//       generalText.classList.remove("display-none");
//     }
//   })
// }

const allButton = document.getElementById("allButton");
const watchesButton = document.getElementById("watchesButton");
const jewelryButton = document.getElementById("jewelryButton");

if (allButton && watchesButton && jewelryButton) {
  allButton.addEventListener("click", function () {
    showAllArticles();
    setActiveButton(allButton);
  });

  watchesButton.addEventListener("click", function () {
    showWatchesArticles();
    setActiveButton(watchesButton);
  });

  jewelryButton.addEventListener("click", function () {
    showJewelryArticles();
    setActiveButton(jewelryButton);
  });
}

// Check if the articles exist before performing operations on them
const articles = document.getElementsByClassName("article");

if (articles) {
  function showAllArticles() {
    for (let i = 0; i < articles.length; i++) {
      articles[i].style.display = "flex";
    }
  }

  function showWatchesArticles() {
    for (let i = 0; i < articles.length; i++) {
      if (articles[i].getAttribute("data-category") === "watches") {
        articles[i].style.display = "flex";
      } else {
        articles[i].style.display = "none";
      }
    }
  }

  function showJewelryArticles() {
    for (let i = 0; i < articles.length; i++) {
      if (articles[i].getAttribute("data-category") === "jewelry") {
        articles[i].style.display = "flex";
      } else {
        articles[i].style.display = "none";
      }
    }
  }
}

function setActiveButton(button) {
  if (allButton && watchesButton && jewelryButton) {
    allButton.classList.remove("active");
    watchesButton.classList.remove("active");
    jewelryButton.classList.remove("active");

    button.classList.add("active");
  }
}

setActiveButton(allButton)

const productPage = document.querySelector("#productPage");

if (productPage != null) {
  const slider = document.querySelector(".slider");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  const imageWidth = slider.offsetWidth;
  let slideIndex = 0;

  prevButton.addEventListener("click", () => {
    slideIndex--;
    if (slideIndex < 0) {
      slideIndex = 3;
    }
    updateSliderPosition();
  });

  nextButton.addEventListener("click", () => {
    slideIndex++;
    if (slideIndex > 3) {
      slideIndex = 0;
    }
    updateSliderPosition();
  });

  function updateSliderPosition() {
    const newPosition = -slideIndex * imageWidth;
    slider.style.transform = `translateX(${newPosition}px)`;
  }

  const minus = document.querySelector(".btn-subtract");
  const add = document.querySelector(".btn-add");
  const quantityNumber = document.querySelector(".item-quantity");
  let currentValue = 1;
  const minimum = 1;

  minus.addEventListener("click", () => {
    if (quantityNumber > minimum) {
      currentValue -= 1;
      quantityNumber.value = currentValue;
      console.log(currentValue);
    }
  });

  add.addEventListener("click", () => {
    currentValue += 1;
    quantityNumber.value = currentValue;
    console.log(currentValue);
  });

  window.addEventListener("scroll", function () {
    const container = document.querySelector(".product-page-container");
    const imageWrapper = document.querySelector(".product-image-wrapper");
    const containerOffsetTop = container.offsetTop;
    const containerHeight = container.offsetHeight;
    const scrollTop = window.scrollY;

    const maxScrollTop =
      containerOffsetTop + containerHeight - imageWrapper.offsetHeight;

    if (scrollTop > containerOffsetTop && scrollTop < maxScrollTop) {
      imageWrapper.classList.add("sticky");
    } else {
      imageWrapper.classList.remove("sticky");
    }
  });




}

const collectionPage = document.querySelector(".collection-page");
const navbar = document.querySelector(".navbar");
const mainContent = document.querySelector("main");
if (collectionPage) {
  navbar.classList.remove("fixed-top");
  mainContent.classList.remove("margin-top");
}


// nav box shadow
window.addEventListener('scroll', function() {
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollPosition > 100) { // Change 100 to the appropriate scroll position where you want to change the navbar color
    navbar.classList.add('scrolled-nav');
  } else {
    navbar.classList.remove('scrolled-nav');
  }
});


// account page - dynamic content
const accountButtons = document.querySelectorAll("#btn-account");
const accountContent = document.querySelectorAll("[id^='accountcontent']");
const spantext =  document.querySelectorAll(".span-account")
// const button3 = document.getElementById("button3");

for (let i = 0; i < accountButtons.length; i++) {
  accountButtons[i].addEventListener("click", function() {
    const target = accountButtons[i].getAttribute("data-target");
    showContent(target);
    hideOtherContents(target);
    ActiveButton(spantext[i]);
  });
}

// Helper functions to show/hide content
function showContent(target) {
  const accountContent = document.getElementById(target);
  accountContent.classList.add("display-block");
  accountContent.classList.remove("display-none");
}

function hideOtherContents(target) {
  for (let i = 0; i < accountContent.length; i++) {
    const content = accountContent[i];
    if (content.id !== target) {
      content.classList.add("display-none");
      content.classList.remove("display-block");
    }
  }
}

function ActiveButton(button) {
  for (let i = 0; i < spantext.length; i++) {
    spantext[i].classList.remove("btn-active");
  }
  button.classList.add("btn-active");
}