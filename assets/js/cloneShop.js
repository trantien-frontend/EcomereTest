// ====================Views
const renderGridView = (products) => {
  let newProduct = [...products];
  let shopProducts = document.querySelector('.shop-products');
  shopProducts.innerHTML = '';
  let productsShowGird = document.createElement('div');
  productsShowGird.setAttribute('class', 'shop-products-grid');
  let row = document.createElement('row');
  row.setAttribute('class', 'row');
  let productList = newProduct.map((product) => {
    return `
        <div class='col-lg-4 col-md-6 col-12'>
            <div class="card-product">
                <div class="card-product__img">
                    <img src="${product.image}" alt="">
                <div class="card-product__icon">
                    <div class="card-action">
                    <div class="button-add" id="add-cart" data-id="${product.id}"><span class="flaticon-shopping-cart"></span></div>
                    <div class="button-heart"><span class="flaticon-heart"></span></div>
                    </div>
                    <div class="button-view"> <span class="flaticon-search"></span></div>
                </div>
                </div>
                <div class="card-product__content"> 
                    <a class="card-product__content-title">${product.title}</a>
                    <div class="card-product__content-price">
                        <span class="now-price">$${product.nowprice}</span>
                        <span class="regular-price">${product.oldprice}</span>
                    </div>
                </div>
            </div>
        </div>
      `;
  });
  let result = productList.join('');
  shopProducts.appendChild(productsShowGird);
  productsShowGird.appendChild(row);
  row.innerHTML = result;
};

const renderListView = (products) => {
  let newListProduct = [...products];
  let shopProducts = document.querySelector('.shop-products');
  shopProducts.innerHTML = '';

  let productsShowList = document.createElement('div');
  productsShowList.setAttribute('class', 'shop-products-list');

  let productList = newListProduct.map((item) => {
    return `
      <div class="card-list">
        <div class="card-list__img">
            <img src="${item.image}" alt="">
            <div class="button-view">
            <span class="flaticon-search"></span>
            </div>
        </div>
        <div class="card-list__content">
            <a class="card-list__content-title">${item.title}</a>
            <div class="card-list__content-price"> 
            <span class="now-price">$${item.nowprice}</span>
            <span class="regular-price">${item.oldprice}</span></div>
            <p class="card-list__content-dsc">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,</p>
            <div class="card-list__content-button"> 
            <div class="button-add" id="add-cart" data-id="${item.id}">
                <span class="flaticon-shopping-cart"></span>
            </div>
            <div class="button-heart">
                <span class="flaticon-heart"></span>
            </div>
            </div>
        </div>
    </div>`;
  });
  let result = productList.join('');
  shopProducts.appendChild(productsShowList);
  productsShowList.innerHTML = result;
};

// storage

const getView = () => {
  return localStorage.getItem('View') ? JSON.parse(localStorage.getItem('View')) : 'grid';
};
const setView = (view) => {
  localStorage.setItem('View', JSON.stringify(view));
};

const getLimit = () => {
  return localStorage.getItem('_limit') ? JSON.parse(localStorage.getItem('_limit')) : 18;
};
const setLimit = (_limit) => {
  localStorage.setItem('_limit', JSON.stringify(_limit));
};

const getCurrentPage = () => {
  return localStorage.getItem('CurrentPage') ? JSON.parse(localStorage.getItem('CurrentPage')) : 1;
};
const setCurrentPage = (currentPage) => {
  localStorage.setItem('CurrentPage', JSON.stringify(currentPage));
};
//  ===================pagination
let start = 0;
let _limit = getLimit();
let end = _limit;
let currentPage = getCurrentPage();
let view = getView();

const pagination = (listProduct, view, _limit) => {
  let newListProduct = [...listProduct];

  start = (currentPage - 1) * _limit;
  end = currentPage * _limit;
  productShowing(start, end, listProduct);
  let listProductShow = newListProduct.slice(start, end);

  if (view === 'grid') {
    renderGridView(listProductShow);
  } else {
    renderListView(listProductShow);
  }
  createButtonPagination(listProduct, view, _limit);
};

const createButtonPagination = (listProduct, view, _limit) => {
  let totalProducts = listProduct.length;
  let totalButons = Math.ceil(totalProducts / _limit);

  let buttons = document.querySelector('.shop-pagination');
  let listButton = document.createElement('ul');
  let buttonNext = document.createElement('li');
  let buttonPrev = document.createElement('li');

  listButton.setAttribute('class', 'shop-pagination__list');
  buttonNext.setAttribute('id', 'shop-pagination-next');
  buttonNext.setAttribute('class', 'shop-pagination__list-item');
  buttonPrev.setAttribute('id', 'shop-pagination-prev');
  buttonPrev.setAttribute('class', 'shop-pagination__list-item');

  buttonPrev.innerText = 'Prev';
  buttonNext.innerText = 'Next';

  buttons.innerHTML = '';
  buttons.appendChild(listButton);
  listButton.appendChild(buttonPrev);
  for (let i = 1; i <= totalButons; i++) {
    let button = document.createElement('li');
    button.setAttribute('class', 'shop-pagination__list-item');
    button.setAttribute('data-number', i);
    button.innerText = i;
    if (i == currentPage) {
      button.classList.add('shop-pagination__list-item--active');

      if (currentPage == totalButons) {
        buttonNext.setAttribute(
          'class',
          'shop-pagination__list-item shop-pagination__list-item--active disabled'
        );
      } else if (currentPage == 1) {
        buttonPrev.setAttribute(
          'class',
          'shop-pagination__list-item shop-pagination__list-item--active disabled'
        );
      }
    }
    listButton.appendChild(button);
  }
  listButton.appendChild(buttonNext);

  handleClickButtonPagination(listProduct);
};

const handleClickButtonPagination = (listProduct) => {
  const newListProduct = [...listProduct];
  let buttons = document.querySelectorAll('.shop-pagination__list-item');
  let buttonNext = document.querySelector('#shop-pagination-next');
  let buttonPrev = document.querySelector('#shop-pagination-prev');

  for (const button of buttons) {
    button.onclick = () => {
      buttons.forEach((btn) => {
        btn.classList.remove('shop-pagination__list-item--active');
        btn.classList.remove('disabled');
      });
      button.classList.add('shop-pagination__list-item--active');
      let totalButons = buttons.length - 2;
      let buttonCurrentNumber = button.dataset.number;
      if (buttonCurrentNumber == totalButons) {
        buttonNext.className =
          'shop-pagination__list-item shop-pagination__list-item--active disabled';
      } else if (buttonCurrentNumber == 1) {
        buttonPrev.className =
          'shop-pagination__list-item shop-pagination__list-item--active disabled';
      }
      currentPage = buttonCurrentNumber;
      console.log(currentPage);
      setCurrentPage(currentPage);
      pagination(newListProduct, view, _limit);
    };
  }

  buttonNext.onclick = () => {
    if (buttonNext.className.includes('active') === true) return;
    currentPage++;
    console.log(currentPage);
    setCurrentPage(currentPage);
    pagination(newListProduct, view, _limit);
  };

  buttonPrev.onclick = () => {
    if (buttonPrev.className.includes('active') === true) return;
    currentPage--;
    console.log(currentPage);
    setCurrentPage(currentPage);
    pagination(newListProduct, view, _limit);

    let totalButons = Math.ceil(newListProduct.length / _limit);
    if (currentPage > totalButons) {
      let nextButton = document.querySelector('#shop-pagination-next');
      nextButton.className =
        'shop-pagination__list-item shop-pagination__list-item--active disabled';
    }
  };
};

// ================= Button-view
const handleClickButtonView = (listProduct) => {
  const buttonViews = document.querySelectorAll('.shop-topbar__view-button');
  for (const buttonView of buttonViews) {
    buttonView.onclick = () => {
      let isButtonViewActive = buttonView.className.includes('active');

      if (isButtonViewActive === true) return;
      buttonViews.forEach((button) => {
        button.classList.remove('shop-topbar__view-button--active');
      });

      buttonView.classList.add('shop-topbar__view-button--active');

      view = buttonView.dataset.view;
      setView(view);
      if (view === 'grid') {
        _limit = 18;
        setLimit(_limit);
        pagination(listProduct, view, _limit);

        let currentPage = parseInt(getCurrentPage());
        let totalButons = Math.ceil(listProduct.length / _limit);
        if (currentPage > totalButons) {
          let nextButton = document.querySelector('#shop-pagination-next');
          nextButton.className =
            'shop-pagination__list-item shop-pagination__list-item--active disabled';
        }
      }
      if (view === 'list') {
        _limit = 8;
        setLimit(_limit);
        pagination(listProduct, view, _limit);
      }
    };
  }
};
const defaultButtonViewActive = (defaultView) => {
  const view = defaultView;
  const buttonsChangeView = [...document.querySelectorAll('.shop-topbar__view-button')];
  const buttonActive = buttonsChangeView.filter((button) => button.dataset.view === view);
  buttonActive[0].classList.add('shop-topbar__view-button--active');
};
const productShowing = (start, end, listProduct) => {
  let productShowingUI = document.querySelector('.show-products');
  let totalProduct = listProduct.length;
  if (end > totalProduct) {
    end = totalProduct;
  }
  productShowingUI.innerText = `Showing ${start + 1} - ${end - 1} of ${totalProduct - 1} result`;
};
// ====================Default-loading-page
const defaultLoadingPage = () => {
  getDatas().then((listProducts) => {
    storageSaveProducts(listProducts);
    let defaultView = getView();
    let default_limit = getLimit();
    defaultButtonViewActive(defaultView);
    pagination(listProducts, defaultView, default_limit);
    handleClickButtonView(listProducts);
    addMiniCart();
  });
};
defaultLoadingPage();
