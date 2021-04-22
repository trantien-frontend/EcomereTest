const listProductCarousel = () => {
  $('.list-products__slide').owlCarousel({
    loop: false,
    margin: 10,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
};
const renderListProduct = (listProduct) => {
  let newListProduct = [...listProduct];
  let cout = 0;
  let listProductElement = [...document.querySelectorAll('.list-products__slide')];
  listProductElement.forEach((node) => {
    let listRender = newListProduct.splice(0, 12);
    let couterProduct = 0;
    let groupProduct = [];
    listRender.forEach((product) => {
      couterProduct += 1;
      groupProduct.push(product);
      if (couterProduct == 3) {
        let item = document.createElement('div');
        item.setAttribute('class', 'list-products__slide-items');
        let innerItem = groupProduct.map(
          (item) =>
            `<div class="list-products__slide-items-item">
            <div class="item-img"> 
              <img src="${item.image}" alt="">
            </div>
            <div class="item-text">
            <a class="product-title" href="#">${item.title}</a>
            <div class="product-price">
              <span class="now-price">$${item.nowprice}</span>
              <span class="regular-price">${item.oldprice}</span></div>
            <button class="list-products__button" data-id=${item.id} id="add-cart" type="button">add to cart</button>
            </div>
          </div>
            `
        );
        item.innerHTML = innerItem.join('');
        node.appendChild(item);
        couterProduct = 0;
        groupProduct = [];
      }
    });
  });
  listProductCarousel();
  addMiniCart();
};
const listProduct = () => {
  getDatas().then((data) => {
    renderListProduct(data);
  });
};

listProduct();
