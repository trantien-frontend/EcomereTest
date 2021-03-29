const tabArea = document.querySelector(".product-area");
let isCheckTab = 0;
let tabRenDer = [];
//--------------------------Tab-section
function tabs(products) {
  tabSell(products);
  tabDeal(products);
  tabMost(products);
}
//Tab-Element
function tabSell(products) {
  getProductElement(tabArea, products, "#tab-sell", 0, 12, renderTabs);
}
//Tab-Element
function tabDeal(products) {
  getProductElement(tabArea, products, "#tab-deal", 12, 24, renderTabs);
}
//Tab-Element
function tabMost(products) {
  getProductElement(tabArea, products, "#tab-most", 24, 36, renderTabs);
}
//Render-Element-in-section-Tab
function renderTabs(datas, tabDom) {
  let tabSlider = document.createElement("div");
  tabSlider.setAttribute("class", "tab-slider owl-carousel");
  datas.forEach((data, index) => {
    tabRenDer.push(data);
    isCheckTab += 1;
    if (isCheckTab == 2) {
      let tabItems = document.createElement("div");
      tabItems.setAttribute("class", "product-items");
      let result = "";
      tabRenDer.forEach((item) => {
        result += `
                  <div class="card-product">
                    <div class="card-product__img">
                      <img src="${item.image}" alt="">
                      <div class="card-product__icon">
                        <div class="card-action">
                          <div class="button-add" id="add-cart" data-id="${item.id}">
                            <span class="flaticon-shopping-cart"></span>
                          </div>
                          <div class="button-heart">
                            <span class="flaticon-heart"></span>
                          </div>
                        </div>
                        <div class="button-view"> 
                          <span class="flaticon-search"></span>
                        </div>
                      </div>
                    </div>
                    <div class="card-product__content"> 
                      <a class="card-product__content-title">${item.title}</a>
                      <div class="card-product__content-price">
                        <span class="now-price">$${item.nowprice}</span>
                        <span class="regular-price">${item.oldprice}</span>
                      </div>
                    </div>
                </div>
                  `;
      });
      tabItems.innerHTML = result;
      tabSlider.appendChild(tabItems);
      isCheckTab = 0;
      tabRenDer = [];
    }
  });
  tabDom.appendChild(tabSlider);
}
// add-slide-element-tab
function slideTab() {
  $(".tab-slider").owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 4,
      },
    },
  });
  $(".list-products__slide").owlCarousel({
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
}
function getProductElement(
  isSection,
  products,
  elementActive,
  cutStart,
  cutEnd,
  callback
) {
  if (isSection) {
    let newProducts = products;
    let dataRender = newProducts.slice(cutStart, cutEnd);
    let active = document.querySelector(elementActive);
    callback(dataRender, active);
  } else {
    return;
  }
}
// -------------------------product-list-section
function listProduct(products) {
  let section = document.querySelector(".list-product");
  newArrivals(section, products);
  bestSeller(section, products);
  mostView(section, products);
}
// element-in-list-product
function newArrivals(isSection, products) {
  getProductElement(
    isSection,
    products,
    "#list-arrivals",
    0,
    12,
    renderProductList
  );
}
function bestSeller(isSection, products) {
  getProductElement(
    isSection,
    products,
    "#list-seller",
    12,
    24,
    renderProductList
  );
}
function mostView(isSection, products) {
  getProductElement(
    isSection,
    products,
    "#list-view",
    24,
    36,
    renderProductList
  );
}
function renderProductList(products, classActive) {
  let isCount = 0;
  let items = [];
  let result;
  products.forEach((product) => {
    items.push(product);
    isCount++;
    result = "";
    if (isCount === 3) {
      let itemsDiv = document.createElement("div");
      itemsDiv.setAttribute("class", "list-products__slide-items");
      items.forEach((item) => {
        result += `
        <div class="list-products__slide-items-item">
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
      `;
      });
      itemsDiv.innerHTML = result;
      classActive.appendChild(itemsDiv);
      isCount = 0;
      items = [];
    }
  });
}
//Run
function running() {
  setting();
  getDatas().then((data) => {
    storageSaveProducts(data);
    tabs(data);
    listProduct(data);
    slideTab();
    miniCart();
  });
}
running();
