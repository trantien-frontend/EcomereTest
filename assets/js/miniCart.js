let cartItems = [];
//add-mini-cart
function miniCart() {
  let buttonCart = [...document.querySelectorAll('#add-cart')];
  buttonCart.forEach((button) => {
    button.addEventListener('click', () => {
      let id = button.dataset.id;
      let cartItem = { ...findProduct(id), amount: 1 };
      cartItems = [...cartItems, cartItem];
      for (let i = 0; i < cartItems.length; i++) {
        for (let j = i + 1; j < cartItems.length; j++) {
          if (cartItems[i].id === cartItems[j].id) {
            cartItems.splice(j, 1);
            cartItems[i].amount += 1;
          }
        }
      }
      storageSaveCart(cartItems);
      renderMiniCart(cartItems);
      setMiniCartValue(cartItems);
      let messageNull = document.querySelector('.cart__dropdown-message');
      if (messageNull) {
        messageNull.style.display = 'none';
      }
      clickRemoveMiniCart();
    });
  });
}
//remove UI mini-cart
function clickRemoveMiniCart() {
  let removeBtns = document.querySelectorAll('.remove-product');
  removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener('click', () => {
      removeCart(removeBtn.dataset.id);
      removeBtn.parentElement.remove();
      let isTotalItems = document.querySelector('.cart-count').innerText;
      if (isTotalItems == 0) {
        let cartHome = document.querySelector('.cart__dropdown');
        document.querySelector('.cart__dropdown-total').style.display = 'none';
        document.querySelector('.cart__dropdown-btn').style.display = 'none';
        let messageNullCart = document.createElement('h4');
        messageNullCart.setAttribute('class', 'cart__dropdown-message');
        messageNullCart.innerText = 'Your cart is currently empty';
        cartHome.appendChild(messageNullCart);
        cartItems = [];
      }
    });
  });
}
//check product
function findProduct(id) {
  let products = storageGetProducts();
  products = products.find((product) => {
    return product.id === id;
  });
  return products;
}
//render-mini-cart
function renderMiniCart(carts) {
  let cartHome = document.querySelector('.cart__dropdown');
  let result = '';
  let string = `
      <div class="cart__dropdown-total"> 
        <span>Total</span>
        <span class="cart-total">$0.00</span>
      </div>
      <div class="cart__dropdown-btn"> 
        <a class="view-cart" href="cart.html">view cart</a>
        <a class="check-cart" href="#">check cart</a>
      </div>
      `;
  carts.forEach((cart) => {
    result += `
        <div class="cart__dropdown-inner">
          <div class="single-product__img"><img src="${cart.image}" alt=""></div>
          <div class="single-product__text">
            <a class="single-product__text-name" href="#">${cart.title}</a>
            <span class="single-product__text-quantiny">${cart.amount}</span>
            <h4 class="single-product__text-price">$${cart.nowprice}</h4>
          </div><span class="fas fa-trash-alt remove-product" data-id="${cart.id}"></span>
        </div>
        `;
  });
  result = result.concat(string);
  cartHome.innerHTML = result;
}
//mini-cart-value
function setMiniCartValue(carts) {
  let totalItems = document.querySelector('.cart-count');
  let totalValues = document.querySelectorAll('.cart-total');
  let itemsTotal = 0;
  let valueTotal = 0;
  carts.forEach((cart) => {
    itemsTotal += +cart.amount;
    valueTotal += cart.amount * cart.nowprice;
  });
  totalItems.innerText = itemsTotal;
  totalValues.forEach((totalValue) => {
    totalValue.innerText = `$${valueTotal.toFixed(2)}`;
  });
}
//remove Storage-cart
function removeCart(id) {
  let getCarts = storageGetCart();
  getCarts = getCarts.filter((item) => {
    return item.id !== id;
  });
  storageSaveCart(getCarts);
  setMiniCartValue(getCarts);
}
//default-show-reset
function setting() {
  let getCarts = storageGetCart();
  if (getCarts.length === 0) {
    return;
  }
  cartItems = getCarts;
  renderMiniCart(getCarts);
  setMiniCartValue(getCarts);
  clickRemoveMiniCart();
}
