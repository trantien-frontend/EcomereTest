function running() {
  setting();
  getDatas().then((products) => {
    storageSaveProducts(products);
    sortSetting(products);
    renderSetting();
    eventHandle();
    miniCart();
  });
}
running();
const sortOBJ = new optionSort();
//views-render
function renderGrid(products) {
  let parentSection = document.querySelector('.shop-products');
  parentSection.innerHTML = '';
  let gridView = document.createElement('div');
  gridView.setAttribute('class', 'shop-products-grid');
  let row = document.createElement('div');
  row.setAttribute('class', 'row');
  parentSection.appendChild(gridView);
  gridView.appendChild(row);
  products.forEach((product) => {
    let col = document.createElement('div');
    col.setAttribute('class', 'col-lg-4 col-md-6 col-12');
    let result = `
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
        `;
    col.innerHTML = result;
    row.appendChild(col);
  });
}
function renderList(products) {
  let parentSection = document.querySelector('.shop-products');
  let listView = document.createElement('div');
  listView.setAttribute('class', 'shop-products-list');
  let result = '';
  products.forEach((item) => {
    result += `
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
      </div>
      
      `;
  });
  parentSection.innerHTML = '';
  parentSection.appendChild(listView);
  listView.innerHTML = result;
}
//localStorage
function storageSaveCurrentPage(currentPage) {
  localStorage.setItem('page', JSON.stringify(currentPage));
}
function storageGetCurrentPage() {
  return localStorage.getItem('page') ? JSON.parse(localStorage.getItem('page')) : 1;
}
function storageSaveViewsShow(viewRender) {
  localStorage.setItem('view', JSON.stringify(viewRender));
}
function storageGetViewsShow() {
  return localStorage.getItem('view') ? JSON.parse(localStorage.getItem('view')) : 'gridView';
}
function storageSaveStatusSort(valueSelect) {
  localStorage.setItem('sort', JSON.stringify(valueSelect));
}
function storageGetStatusSort() {
  return localStorage.getItem('sort')
    ? JSON.parse(localStorage.getItem('sort'))
    : 'title-ascending';
}
//total-product
function totalProduct(start, end, productsTotal) {
  let totalProduct = document.querySelector('.show-products');
  if (end > productsTotal) {
    end = productsTotal;
  }
  totalProduct.innerText = `Showing ${start + 1} - ${end} of ${productsTotal} result`;
}
//default-sort-loadding-page
function sortSetting(products) {
  let statusOption = storageGetStatusSort();
  let options = document.querySelectorAll('#sort option');
  //dom select tag
  options.forEach((option) => {
    let optionValue = option.value;
    if (optionValue === statusOption) {
      option.setAttribute('selected', 'selected');
    }
  });
  //sort product
  sort(statusOption, products);
}
function sort(statusOption, products) {
  let sortProducts = [];
  if (statusOption === 'title-ascending') {
    sortProducts = sortOBJ.sortAz(products);
    storageSaveProducts(sortProducts);
  }
  if (statusOption === 'title-descending') {
    sortProducts = sortOBJ.sortZa(products);
    storageSaveProducts(sortProducts);
  }
  if (statusOption === 'price-ascending') {
    sortProducts = sortOBJ.sortPriceHL(products);
    storageSaveProducts(sortProducts);
  }
  if (statusOption === 'price-descending') {
    sortProducts = sortOBJ.sortPriceLH(products);
    storageSaveProducts(sortProducts);
  }
}
//default-render-view-loading-page
function renderSetting() {
  let viewShow = storageGetViewsShow();
  let buttonViews = document.querySelectorAll('.shop-topbar__view-button');
  viewShow === 'gridView' ? paginationGrid() : paginationList();
  buttonViews.forEach((buttonView) => {
    let view = buttonView.dataset.view;
    view === viewShow
      ? buttonView.classList.add('shop-topbar__view--active')
      : console.log('not-views');
  });
}
// Pagination
let start = 0;
let currentPage = storageGetCurrentPage();
//pagination grid-view
function paginationGrid() {
  let products = storageGetProducts();
  let perPage = 18;
  let end = perPage;
  pagination(perPage, end, products, renderGrid);
  paginationButtonClick();
}
//pagination list-view
function paginationList() {
  let products = storageGetProducts();
  let perPage = 8;
  let end = perPage;
  pagination(perPage, end, products, renderList);
  paginationButtonClick();
}
function pagination(perpage, end, products, callback) {
  let newProduct = [];
  start = (currentPage - 1) * perpage;
  end = currentPage * perpage;
  totalProduct(start, end, products.length);
  creatPageNumber(products, perpage);
  newProduct = products.slice(start, end);
  callback(newProduct);
}
//creat PageNumber
function creatPageNumber(products, perpage) {
  let arrlength = products.length;
  if (arrlength > perpage) {
    let totalButons = Math.ceil(arrlength / perpage);
    renderButtonPagination(totalButons);
  } else {
    return false;
  }
}
function renderButtonPagination(totalButtons) {
  //dom
  let shopPagination = document.querySelector('.shop-pagination');
  let shopPaginationList = document.createElement('ul');
  let shopPaginationPrev = document.createElement('li');
  let shopPaginationNext = document.createElement('li');
  //set class and id
  shopPaginationList.setAttribute('class', 'shop-pagination__list');
  shopPaginationPrev.setAttribute('id', 'shop-pagination-prev');
  shopPaginationPrev.setAttribute('class', 'shop-pagination__list-item');
  shopPaginationNext.setAttribute('id', 'shop-pagination-next');
  shopPaginationNext.setAttribute('class', 'shop-pagination__list-item');
  //appendChild
  shopPagination.innerHTML = '';
  shopPagination.appendChild(shopPaginationList);
  //innerText
  shopPaginationPrev.innerText = 'Prev';
  shopPaginationNext.innerText = 'Next';
  //creat li
  shopPaginationList.appendChild(shopPaginationPrev);
  for (let i = 0; i < totalButtons; i++) {
    let numberPage = document.createElement('li');
    numberPage.setAttribute('class', 'shop-pagination__list-item shop-pagination__list-number');
    numberPage.innerHTML = i + 1;
    if (i == currentPage - 1) {
      numberPage.classList.add('shop-pagination__list-item--active');
    }
    shopPaginationList.appendChild(numberPage);
  }
  shopPaginationList.appendChild(shopPaginationNext);
  isButtonPagination();
}
function isButtonPagination() {
  let btnNumberActive = document.querySelector('.shop-pagination__list-item--active');
  if (btnNumberActive === null) {
    let next = document.querySelector('#shop-pagination-next');
    next.classList.add('disabled');
    return;
  }
  let btnNumberPrev = btnNumberActive.previousElementSibling;
  let idPrev = btnNumberPrev.getAttribute('id');
  let btnNumberNext = btnNumberActive.nextElementSibling;
  let idNext = btnNumberNext.getAttribute('id');
  if (idPrev === 'shop-pagination-prev') {
    btnNumberPrev.classList.add('disabled');
  } else if (idNext === 'shop-pagination-next') {
    btnNumberNext.classList.add('disabled');
  } else {
    return;
  }
}
//event CLick
function paginationButtonClick() {
  let btnPrev = document.querySelector('#shop-pagination-prev');
  let btnNext = document.querySelector('#shop-pagination-next');
  let btnsNumber = document.querySelectorAll('.shop-pagination__list-number');
  let parentSection = document.querySelector('.shop-products');
  btnPrev.addEventListener('click', () => {
    isDoubleClick(btnPrev, 'disabled');
    currentPage--;
    storageSaveCurrentPage(currentPage);
    loadding(parentSection);
    setTimeout(isViewsShow, 700);
  });
  btnNext.addEventListener('click', () => {
    isDoubleClick(btnNext, 'disabled');
    currentPage++;
    storageSaveCurrentPage(currentPage);
    loadding(parentSection);
    setTimeout(isViewsShow, 700);
  });
  btnsNumber.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      isDoubleClick(btn, 'active');
      btnsNumber.forEach((item) => {
        item.classList.remove('shop-pagination__list-item--active');
      });
      btn.classList.add('shop-pagination__list-item--active');
      currentPage = index + 1;
      storageSaveCurrentPage(currentPage);
      loadding(parentSection);
      setTimeout(isViewsShow, 700);
    });
  });
}
function isViewsShow() {
  let viewSection = document.querySelector('.shop-products');
  let nodeChild = viewSection.childNodes[0].className;
  nodeChild === 'shop-products-grid' ? paginationGrid() : paginationList();
  miniCart();
}
function isDoubleClick(button, isClass) {
  let string = button.className;
  let isString = string.includes(isClass);
  return isString;
}
//event
function eventHandle() {
  const btnGridView = document.querySelector('#button-grid');
  const btnListView = document.querySelector('#button-list');
  const select = document.querySelector('#sort');
  let parentSection = document.querySelector('.shop-products');
  //Select-option
  select.addEventListener('change', () => {
    let products = storageGetProducts();
    let optionValue = select.value;
    storageSaveStatusSort(optionValue);
    sort(optionValue, products);
    select.setAttribute('disabled', 'disabled');
    loadding(parentSection);
    setTimeout(() => {
      isViewsShow();
      isViewsShow ? select.removeAttribute('disabled') : console.log('notRemove');
    }, 1000);
  });
  //show Grid Views
  btnGridView.addEventListener('click', () => {
    isDoubleClick(btnGridView, 'active');
    if (isDoubleClick === true) {
      return;
    }
    let parentSection = document.querySelector('.shop-products');
    console.log('hello');
    parentSection.innerHTML = '';
    let view = btnGridView.dataset.view;
    storageSaveViewsShow(view);
    paginationGrid();
    removeActiveBtns(btnGridView);
    miniCart();
  });
  //show list Views
  btnListView.addEventListener('click', () => {
    isDoubleClick(btnListView, 'active');
    if (isDoubleClick === true) {
      return;
    }
    isDoubleClick(btnListView, 'shop-topbar__view--active');
    let parentSection = document.querySelector('.shop-products');
    parentSection.innerHTML = '';
    let view = btnListView.dataset.view;
    storageSaveViewsShow(view);
    paginationList();
    removeActiveBtns(btnListView);
    miniCart();
  });
}
function removeActiveBtns(btnTarget) {
  let btnsViewActive = document.querySelectorAll('.shop-topbar__view-button');
  btnsViewActive.forEach((btn) => {
    btn.classList.remove('shop-topbar__view--active');
  });
  btnTarget.classList.add('shop-topbar__view--active');
}
// function breadcrumbs() {
//   let breadcrumbsContent = document.querySelector(".breadcrumbs-content");
//   let breadcrumbsInner = document.createElement("h1");
//   breadcrumbsInner.setAttribute("class", "breadcrumbs-content__title");
//   breadcrumbsInner.innerText = "Products";
//   breadcrumbsContent.appendChild(breadcrumbsInner);
// }
function loadding(parentSection) {
  parentSection.innerHTML = '';
  let load = document.createElement('div');
  load.setAttribute('class', 'loadding');
  let gif = document.createElement('img');
  gif.setAttribute('src', './images/loadding.gif');
  load.appendChild(gif);
  parentSection.appendChild(load);
}
