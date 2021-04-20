const plus_Minus = () => {
  const inputCoutGroup = document.querySelectorAll('.table-content__quantity');
  for (const button of inputCoutGroup) {
    button.onclick = (e) => {
      let getClassName = e.target.className;
      console.log(getClassName);
      if (getClassName === 'quantity-dec') {
        let input = button.querySelector('.quantity-value');
        let count = +input.value;
        count += 1;
        input.value = count;
      } else if (getClassName === 'quantity-inc') {
        let input = button.querySelector('.quantity-value');
        let count = +input.value;
        count -= 1;
        if (count < 1) {
          count = 0;
        }
        input.value = count;
      }
    };
  }
};
const updateCart = () => {
  let updateButton = document.querySelector('#update-cart');
  let quantitys = document.querySelectorAll('.quantity-value');
  updateButton.onclick = () => {
    let getCart = storageGetCart();
    quantitys.forEach((quantity) => {
      let inputId = quantity.dataset.id;
      let newAmount = quantity.value;
      getCart.forEach((product) => {
        if (product.id == inputId) {
          product.amount = newAmount;
        }
      });
      renderCart(getCart);
      storageSaveCart(getCart);
      setCartValue(getCart);
      renderMiniCart(getCart);
    });
  };
};
const deleteProduct = () => {
  const buttonsRemove = [...document.querySelectorAll('.button-remove')];
  for (const buttonRemove of buttonsRemove) {
    buttonRemove.onclick = () => {
      let getCart = storageGetCart();
      let buttonId = buttonRemove.dataset.id;
      let newListProduct = getCart.filter((product) => product.id != buttonId);

      renderCart(newListProduct);
      storageSaveCart(newListProduct);
    };
  }
};
const renderCart = (cart) => {
  let newListProduct = [...cart];
  let tableContent = document.querySelector('.table-section__content');
  tableContent.innerHTML = '';
  if (cart.length === 0) {
    let emptyCart = document.createElement('div');
    let _h2 = document.createElement('h2');
    let _h3 = document.createElement('h3');
    let _p = document.createElement('p');
    let _a = document.createElement('a');

    _a.setAttribute('href', 'shop.html');
    emptyCart.setAttribute('class', 'emptyCartMessage');
    _h2.innerHTML = 'Shopping Cart';
    _h3.innerHTML = 'Your cart is currently empty!';
    _p.innerHTML = 'Continue browsing';
    _a.innerHTML = 'here';

    _p.appendChild(_a);
    emptyCart.appendChild(_h2);
    emptyCart.appendChild(_h3);
    emptyCart.appendChild(_p);
    tableContent.appendChild(emptyCart);
    return;
  }
  let table = document.createElement('table');
  let tBody = document.createElement('tbody');
  let tHead = document.createElement('thead');
  let cartFunction = document.createElement('div');

  table.setAttribute('class', 'table');
  tHead.setAttribute('class', 'thead');
  tBody.setAttribute('class', 'tbody');
  cartFunction.setAttribute('class', 'cart-dynamic');

  tableContent.appendChild(table);
  tableContent.appendChild(cartFunction);
  table.appendChild(tBody);
  table.appendChild(tHead);

  let innerTablehead = `
  <tr>
    <th class="table-title">remove</th>
    <th class="table-title">image</th>
    <th class="table-title">product</th>
    <th class="table-title">price</th>
    <th class="table-title">quantity</th>
    <th class="table-title">total</th>
  </tr>`;
  let innerCartFuction = `
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
    </div>`;
  let renderTable = newListProduct.map((product) => {
    return `
      <tr>
      <td class="table-content"> 
          <a class="table-content__remove button-remove" data-id="${product.id}">;
              <span class="fas fa-plus"></span>
          </a>
      </td>
      <td class="table-content"> 
          <div class="table-content__img">
              <img src="${product.image}" alt="image-product">
          </div>
      </td>
      <td class="table-content">
          <a class="table-content__title" href="#">${product.title}</a>
      </td>
      <td class="table-content"> 
          <span class="table-content__price">$${product.nowprice}</span>
      </td>
      <td class="table-content">
        <div class="table-content__quantity">
          <input class="quantity-value" data-id="${product.id}" type="text" value="${
      product.amount
    }"><span class="quantity-dec">+</span><span class="quantity-inc">- </span>
        </div>
      </td>
      <td class="table-content"><span class="table-content__total money">$${(
        product.amount * product.nowprice
      ).toFixed(2)}</span></td>
    </tr>`;
  });
  let result = renderTable.join('');
  tHead.innerHTML = innerTablehead;
  tBody.innerHTML = result;
  cartFunction.innerHTML = innerCartFuction;
  plus_Minus();
  updateCart();
  deleteProduct();
  clearCart();
};
const setCartValue = (cart) => {
  let totalCostUI = document.querySelectorAll('.total');
  let newCart = [...cart];
  let totalCost = 0;
  for (const product of newCart) {
    totalCost += +(product.amount * product.nowprice);
  }
  totalCostUI.forEach((item) => {
    item.innerHTML = `$${totalCost.toFixed(2)}`;
  });
};
const clearCart = () => {
  let buttonClear = document.querySelector('#clear-cart');
  buttonClear.onclick = () => {
    storageSaveCart([]);
    renderCart([]);
    renderMiniCart([]);
    setMiniCartValue([]);
  };
};
const defaultLoadingCart = () => {
  let listProduct = storageGetCart();

  renderCart(listProduct);
  setCartValue(listProduct);
};
defaultLoadingCart();
