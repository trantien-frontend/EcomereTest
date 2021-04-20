let tableSection = document.querySelector('.table-section__content');
// cart
function cart() {
  let productsCart = storageGetCart();
  let length = productsCart.length;
  if (length > 0) {
    renderCart(productsCart);
    setCartValue(productsCart);
    eventClick();
  } else {
    renderEmptyCart();
  }
}
function renderCart(carts) {
  let tBody = document.querySelector('.table tbody');
  let tHead = document.querySelector('.table thead');
  let cartDynamic = document.querySelector('.cart-dynamic');
  let result = '';
  let tHeadContent = `
        <tr>
            <th class="table-title">remove</th>
            <th class="table-title">image</th>
            <th class="table-title">product</th>
            <th class="table-title">price</th>
            <th class="table-title">quantity</th>
            <th class="table-title">total</th>
        </tr>
    `;
  let cartDynamicInner = `
    <div class="row"> 
    <div class="col-lg-7 col-md-12 col-12">
      <div class="cart-dynamic__all">
        <div class="cart-dynamic__coupon"> 
            <a class="button button--dynamic" href="index.html">continue shopping</a>
            <a class="button button--dynamic" id="clear-cart" href="#">clear cart</a>
          <div class="coupon__text">
            <h3>Special instructions for seller</h3>
            <textarea class="coupon__text-input"></textarea>
          </div>
        </div>
        <div class="cart-dynamic__coupon-2">
            <a class="button button--dynamic" id="update-cart" href="#">update cart </a>
        </div>
      </div>
    </div>
    <div class="col-lg-5 col-md-12 col-12">
      <div class="cart-dynamic__total"> 
        <h2>cart totals</h2>
        <ul>
            <li class="sub-total ">
                <span class="sub-total__title">subtotal </span>
                <span class="total">$80.00</span>
            </li>
            <li class="sub-total">
                <span class="sub-total__title">total</span>
                <span class="total">$80.00</span>
            </li>
        </ul>
        <a class="button button--dynamic">proceed to checkout</a>
      </div>
    </div>
  </div>
    `;
  carts.forEach((cart) => {
    let valueProduct = cart.amount * cart.nowprice;
    result += `
        <tr>
        <td class="table-content"> 
            <a class="table-content__remove button-remove" data-id="${cart.id}">;
                <span class="fas fa-plus"></span>
            </a>
        </td>
        <td class="table-content"> 
            <div class="table-content__img">
                <img src="${cart.image}" alt="image-product">
            </div>
        </td>
        <td class="table-content">
            <a class="table-content__title" href="#">${cart.title}</a>
        </td>
        <td class="table-content"> 
            <span class="table-content__price">$${cart.nowprice}</span>
        </td>
        <td class="table-content">
          <div class="table-content__quantity">
            <input class="quantity-value" data-id="${cart.id}" type="text" value="${
      cart.amount
    }"><span class="quantity-dec">+</span><span class="quantity-inc">- </span>
          </div>
        </td>
        <td class="table-content"><span class="table-content__total money">$${valueProduct.toFixed(
          2
        )}</span></td>
      </tr>
        `;
  });
  tHead.innerHTML = tHeadContent;
  tBody.innerHTML = result;
  cartDynamic.innerHTML = cartDynamicInner;
}
function renderEmptyCart() {
  let tableSection = document.querySelector('.table-section__content');
  let emtyCart = document.createElement('div');
  let h2 = document.createElement('h2');
  let h3 = document.createElement('h3');
  let p = document.createElement('p');
  let a = document.createElement('a');
  a.setAttribute('href', '#');
  emtyCart.setAttribute('class', 'emptyCartMessage');
  h2.innerHTML = 'Shopping Cart';
  h3.innerHTML = 'Your cart is currently empty!';
  p.innerHTML = 'Continue browsing';
  a.innerHTML = 'here';
  p.appendChild(a);
  emtyCart.appendChild(h2);
  emtyCart.appendChild(h3);
  emtyCart.appendChild(p);
  tableSection.appendChild(emtyCart);
}
function setCartValue(carts) {
  let totalValue = 0;
  let totalBLocks = document.querySelectorAll('.total');
  carts.forEach((cart) => {
    totalValue += cart.amount * cart.nowprice;
  });
  totalBLocks.forEach((item) => {
    item.innerText = `$${totalValue.toFixed(2)}`;
  });
}
function eventClick() {
  let btnsRemove = document.querySelectorAll('.button-remove');
  let btnUpdate = document.querySelector('#update-cart');
  let btnClear = document.querySelector('#clear-cart');
  let btnsPlus = document.querySelectorAll('.quantity-dec');
  let btnsMinus = document.querySelectorAll('.quantity-inc');
  //remove
  btnsRemove.forEach((btnRemove) => {
    btnRemove.addEventListener('click', () => {
      let id = btnRemove.dataset.id;
      removeCart(id);
      location.reload();
    });
  });
  // btnPlus
  btnsPlus.forEach((btnPlus) => {
    btnPlus.addEventListener('click', () => {
      let input = btnPlus.previousElementSibling;
      let count = +input.value;
      count++;
      input.value = count;
    });
  });
  // btnMinus
  btnsMinus.forEach((btnMinus) => {
    btnMinus.addEventListener('click', (e) => {
      let input = btnMinus.previousElementSibling.previousElementSibling;
      let count = +input.value;
      if (count == 0) {
        return false;
      } else {
        count--;
        input.value = count;
      }
    });
  });
  //update
  btnUpdate.addEventListener('click', () => {
    let getCarts = storageGetCart();
    let inputs = document.querySelectorAll('.quantity-value');
    inputs.forEach((input) => {
      let id = input.dataset.id;
      let amount = input.value;
      getCarts.map((item) => {
        if (item.id == id) {
          item.amount = amount;
        }
      });
    });
    storageSaveCart(getCarts);
    location.reload();
  });
  //btnCLear
  btnClear.addEventListener('click', () => {
    storageSaveCart([]);
    location.reload();
  });
}
function running() {
  // setting();
  cart();
  breadcrumbs();
}
// section breadcrumbs
function breadcrumbs() {
  let breadcrumbsContent = document.querySelector('.breadcrumbs-content');
  let breadcrumbsInner = document.createElement('h1');
  breadcrumbsInner.setAttribute('class', 'breadcrumbs-content__title');
  breadcrumbsInner.innerText = 'your shopping cart';
  breadcrumbsContent.appendChild(breadcrumbsInner);
}
running();
