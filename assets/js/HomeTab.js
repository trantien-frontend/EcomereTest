let start = 0;
let _limitTab = 12;
let end = _limitTab;
const TabCarousel = () => {
  $('.tab-slider').owlCarousel({
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
};
const handleTabClick = (data) => {
  const buttonsTab = [...document.querySelectorAll('.tab-list__link')];
  buttonsTab.forEach((buttonTab, idx) => {
    buttonTab.onclick = () => {
      if (buttonTab.className.includes('active')) return;
      getDatas().then((data) => {
        let tabs = [...document.querySelectorAll('.tab-panel')];
        buttonsTab.forEach((btn) => {
          btn.classList.remove('tab-list__link--active');
        });
        buttonTab.classList.add('tab-list__link--active');
        let buttonId = buttonTab.dataset.tab;
        console.log(buttonId);
        let tab_active = tabs.filter((tab) => {
          tabs.forEach((item) => {
            item.classList.remove('tab-panel--active');
          });
          let tabId = tab.getAttribute('id');
          if (tabId === buttonId) {
            return tab;
          }
        });
        tab_active[0].classList.add('tab-panel--active');
        let newIdx = idx + 1;
        start = (newIdx - 1) * _limitTab;
        end = newIdx * _limitTab;
        console.log(start);
        console.log(end);
        renderTab(data);
      });
    };
  });
};
const renderTab = (store) => {
  let listProduct = [...store];
  let newListProduct = listProduct.slice(start, end);
  console.log(newListProduct);
  let tab_active = document.querySelector('.tab-panel--active');
  tab_active.innerHTML = '';
  let tab_slide = document.createElement('div');
  tab_slide.setAttribute('class', 'tab-slider owl-carousel');
  let count = 0;
  let itemsProduct = [];
  newListProduct.forEach((product, index) => {
    itemsProduct.push(product);
    count++;
    if (count == 2) {
      let tab_item = document.createElement('div');
      tab_item.setAttribute('class', 'product-items');
      let renderProduct = itemsProduct.map(
        (item) => `
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
      `
      );
      let result = renderProduct.join('');
      tab_item.innerHTML = result;
      count = 0;
      itemsProduct = [];
      tab_slide.appendChild(tab_item);
    }
  });
  tab_active.appendChild(tab_slide);
  TabCarousel();
  handleTabClick();
  addMiniCart();
};
const tabHomePage = () => {
  getDatas().then((data) => {
    renderTab(data);
    handleTabClick(data);
    addMiniCart();
  });
};
tabHomePage();
