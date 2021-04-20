// add-mini-miniCart
const addMiniCart = () => {
  let miniCart = [];
  let buttonsAddCart = [...document.querySelectorAll('#add-cart')];
  for (const buttonAddCart of buttonsAddCart) {
    buttonAddCart.onclick = () => {
      let buttonId = buttonAddCart.dataset.id;
      let listProduct = storageGetCart();
      let item = { ...findProduct(buttonId), amount: 1 };

      miniCart = [...listProduct, item];

      for (let i = 0; i < miniCart.length; i++) {
        for (let j = i + 1; j < miniCart.length; j++) {
          if (miniCart[i].id === miniCart[j].id) {
            miniCart.splice(j, 1);
            miniCart[i].amount += 1;
          }
        }
      }

      let newCart = [...miniCart];

      storageSaveCart(newCart);
      renderMiniCart(newCart);
      setMiniCartValue(newCart);
    };
  }
};
// remove-mini-cart
const removeMiniCart = (miniCart) => {
  let buttonsRemove = [...document.querySelectorAll('.remove-product')];
  for (const buttonRemove of buttonsRemove) {
    buttonRemove.onclick = () => {
      let buttonId = buttonRemove.dataset.id;
      let newListProduct = miniCart.filter((product) => product.id !== buttonId);

      renderMiniCart(newListProduct);
      setMiniCartValue(newListProduct);
      storageSaveCart(newListProduct);
    };
  }
};
// find-product
const findProduct = (buttonId) => {
  let listProduct = storageGetProducts();
  let newListProduct = [...listProduct];
  let newProduct = newListProduct.find((product) => product.id === buttonId);
  return newProduct;
};
// render-mini-cart-ui
const renderMiniCart = (cart) => {
  let miniCart = document.querySelector('.cart__dropdown');
  miniCart.innerHTML = '';
  if (cart.length === 0) {
    let messageMiniCart = document.createElement('h4');
    messageMiniCart.setAttribute('class', 'cart__dropdown-message');
    let messCartNull = 'Your cart is currently empty';
    messageMiniCart.innerText = messCartNull;
    miniCart.appendChild(messageMiniCart);
    return;
  }

  let defaultMiniCart = `
  <div class="cart__dropdown-total"> 
    <span>Total</span>
    <span class="cart-total">$0.00</span>
  </div>
  <div class="cart__dropdown-btn"> 
        <a class="view-cart" href="cart.html">view cart</a>
        <a class="check-cart" href="#">check cart</a>
  </div>
`;
  let listProduct = cart.map(
    (product) => `
    <div class="cart__dropdown-inner">
        <div class="single-product__img"><img src="${product.image}" alt=""></div>
        <div class="single-product__text">
            <a class="single-product__text-name" href="#">${product.title}</a>
            <span class="single-product__text-quantiny">${product.amount}</span>
            <h4 class="single-product__text-price">$${product.nowprice}</h4>
        </div><span class="fas fa-trash-alt remove-product" data-id="${product.id}"></span>
    </div>`
  );
  let renderListProduct = listProduct.join('').concat(defaultMiniCart);
  miniCart.innerHTML = renderListProduct;
  setMiniCartValue(cart);
  removeMiniCart(cart);
};
// set-mini-cart-value
const setMiniCartValue = (cart) => {
  let newListProduct = [...cart];
  let totalItems = document.querySelector('.cart-count');
  let totalValues = document.querySelectorAll('.cart-total');
  let itemsTotal = 0;
  let valueTotal = 0;
  if (cart.length === 0) {
    totalItems.innerHTML = itemsTotal;
    totalValues.forEach((value) => {
      value.innerHTML = `$${valueTotal.toFixed(2)}`;
    });
    return;
  }
  newListProduct.forEach((product) => {
    itemsTotal += +product.amount;
    valueTotal += product.amount * product.nowprice;
  });
  totalItems.innerHTML = itemsTotal;
  totalValues.forEach((value) => {
    value.innerHTML = `$${valueTotal.toFixed(2)}`;
  });
};
// Default-mini-cart
const defaultLoadingMiniCart = () => {
  let listProduct = storageGetCart();
  renderMiniCart(listProduct);
  if (listProduct.length === 0) return;
};
defaultLoadingMiniCart();
