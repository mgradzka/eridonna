async function updateCart(data) {
    try {
      const response = await fetch("/cart.js");
      const data = await response.json();
      document.querySelectorAll("#numberOfCartItems").forEach((item) => {
        item.innerHTML = data.item_count;
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  const addToCartForm = document.querySelectorAll('form[action="/cart/add"]');
  
  addToCartForm.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // submit form with fetch
      fetch("/cart/add", {
        method: "POST",
        body: new FormData(form),
      })
        .then(() => {
          // update cart count
          updateCart();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
  
  // updating cart
  document.addEventListener("DOMContentLoaded", (data) => {
    updateCart(data);
  });
  
  // cart - product quantity buttons
  document.querySelectorAll(".quantity-button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const input = btn.parentElement.querySelector("input");
      const value = Number(input.value);
      const isPlus = btn.classList.contains("plus");
      const key = btn.closest(".cart-item").getAttribute("data-key");
  
      if (isPlus) {
        const newValue = value + 1;
        input.value = newValue;
        changeItemQuantity(key, newValue);
      } else if (value > 1) {
        const newValue = value - 1;
        input.value = newValue;
        changeItemQuantity(key, newValue);
      }
    });
  });
  
  
  // removing the item from cart
  document.querySelectorAll(".remove-item").forEach((remove) => {
    remove.addEventListener("click", (e) => {
      e.preventDefault();
  
      const item = remove.closest(".cart-item");
      const key = item.getAttribute("data-key");
  
      fetch("/cart/change.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: key,
          quantity: 0,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.items.length === 0) {
            document.querySelector(".cart-content").remove();
            const html = document.createElement("div");
            html.innerHTML = `
            <div class="row">
              <h2>Shopping Cart</h2>
              <p>Your cart is empty</p>
            </div>
            `;
            document.querySelector(".cart-page").appendChild(html);
            updateCart();
          } else {
            const format = document
              .querySelector("[data-money-format]")
              .getAttribute("data-money-format");
            const totalPrice = formatMoney(data.total_price, format);
            document.querySelector("#total-price").textContent = totalPrice;
            item.remove();
            updateCart();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  });
  
  // fetching - changing product quantity
  function changeItemQuantity(key, quantity) {
    fetch("/cart/change.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: key,
        quantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const format = document.querySelector("[data-money-format]").getAttribute("data-money-format");
        const totalPrice = formatMoney(data.total_price, format);
        const item = data.items.find((item) => item.key === key);
        const itemPrice = formatMoney(item.final_line_price, format);
    
        document.querySelector(`[data-key="${key}"] .line-item-price`).textContent = itemPrice;
    
        document.querySelector("#total-price").textContent = totalPrice;
        updateCart();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  const searchItemContainer = document.querySelector("#searchInputContainer");
  const searchInputField = document.querySelector("#searchInputField");
  let timer;
  
  // predictive search - show/hide content
  
  searchInputField.addEventListener("input", function (e) {
    clearTimeout(timer);
  
    if (searchInputField.value != "") {
      timer = setTimeout(showSearch, 500);
      timer = setTimeout(fetchPredictiveSearch, 500);
    }
  });
  
  searchInputField.addEventListener("blur", () => {
    searchItemContainer.style.display = "none";
  });
  
  function showSearch() {
    searchInputField.addEventListener("input", () => {
      searchItemContainer.style.display = "block";
    });
  }
  
  // Fetching results - predictive search
  function fetchPredictiveSearch() {
    fetch(`/search/suggest.json?q=${searchInputField.value}&resources[type]=product`)
      .then((response) => response.json())
      .then((data) => {
        const products = data.resources.results.products;
  
        searchItemContainer.innerHTML = "";
  
        if (products.length > 0) {
          products.forEach(function (product) {
            searchItemContainer.innerHTML += `
              <a href="${product.url}" class="search-item flex gap-3 p-2">
                <img src="${product.image}" alt="${product.title}">
                <div class="cart-content-container">
                  <div class="cart-content">
                    <p class="mb-0">${product.title}</p>
                  </div>
                </div>
              </a>
            `;
          });
        } else {
          searchItemContainer.innerHTML = `
            <p class="p-4 search-item">Sorry, no matching results...</p>
          `;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  