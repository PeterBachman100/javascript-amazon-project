import {cart, addToCart, calculateCartQuantity } from '../data/cart.js';
import {products, loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {

  updateCartQuantity();

  let productsHTML = '';

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;

  if (search) {
    filteredProducts= products.filter((product) => {
      return product.name.includes(search) || product.keywords.includes(search);
    })
  }

  filteredProducts.forEach((product) => {
      productsHTML += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image" src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars" src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected="" value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
      `;

  });

  const productsGrid = document.querySelector('.js-products-grid');
  if(productsGrid) {
    productsGrid.innerHTML = productsHTML;
  }

  function updateCartQuantity() {
      let cartQuantity = calculateCartQuantity();
      document.querySelectorAll('.js-cart-quantity').forEach(cartQuantityElement => cartQuantityElement.innerHTML = cartQuantity);
  }

  function displayAddToCartMessage(productId, timeoutId) {
    const addedToCartMessage = document.querySelector(`.js-added-to-cart-${productId}`);
      addedToCartMessage.classList.add('opacity-1');

      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        addedToCartMessage.classList.remove('opacity-1');
      }, 2000);
  }

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {

    let timeoutId;
    
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      addToCart(productId);
      displayAddToCartMessage(productId,timeoutId);
      updateCartQuantity();
    });
  });

  console.log(products);
  
}



function search() {
  window.location.href = '/amazon.html?search=' + document.querySelector('.search-bar').value.toLowerCase();
}

document.querySelector('.search-button').addEventListener('click', () => {
  search();
});
document.querySelector('.search-bar').addEventListener('keypress', function(event) {
  if(event.key == "Enter") {
    event.preventDefault;
    document.querySelector(`.search-button`).click();
  }
});

