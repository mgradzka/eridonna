// Put your application javascript here

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
