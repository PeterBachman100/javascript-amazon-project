export const cart = []

export function addToCart(productId) {
    let matchingItem;
    const productQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    cart.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    if(matchingItem) {
      matchingItem.quantity += productQuantity;
    }
    else {
      cart.push({
        productId: productId,
        quantity: productQuantity
      });
    }
  }