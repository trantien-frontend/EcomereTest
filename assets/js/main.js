const isCheck = false;
let isCheckTab = 0;
let tabRenDer = [];

class products {
  async getProductTab() {
    try {
      // get data from file db.json
      let result = await fetch("db.json");
      let data = await result.json();
      let { products } = data;
      products = products.map((product) => {
        console.log(product);
        const { id } = product.sys;
        const { price, title } = product.content;
        const { nowprice, oldprice } = price;
        const { image } = product.images;
        return { id, title, image, nowprice, oldprice };
      });
      return products;
    } catch (err) {
      console.log(err);
    }
  }
}

class ui {
  tab(products) {
    this.tabSell(products);
    this.tabDeal(products);
    //this.tabMost(products);
  }
  tabSell(products) {
    let sellTab = products.splice(0, 12);
    const domTab = document.querySelector("#tab-sell");
    this.renderTab(sellTab, domTab);
  }
  tabDeal(products) {
    let sellTab = products.splice(0, 12);
    const domTab = document.querySelector("#tab-deal");
    this.renderTab(sellTab, domTab);
  }
  renderTab(datas, tabDom) {
    datas.forEach((data, index) => {
      tabRenDer.push(data);
      isCheckTab += 1;
      if (isCheckTab == 2) {
        let tabItems = document.createElement("div");
        tabItems.setAttribute("class", "tab-items col-lg-3");
        let result = "";
        tabRenDer.forEach((item) => {
          console.log(item);
          result += `
                <div class="tab-item">
                  <div class="tab-item__img">
                    <img src="${item.image}" alt="">
                    <div class="tab-icon">
                      <div class="action-cart">
                        <div class="add-cart" data-set="${item.id}"><span class="flaticon-shopping-cart"></span></div>
                        <div class="into-page"><span class="flaticon-heart"></span></div>
                      </div>
                      <div class="view-cart"> <span class="flaticon-search"></span></div>
                    </div>
                  </div>
                  <div class="tab-item__content"> 
                    <h4>${item.title}</h4>
                    <div class="tab-price"><span class="now-price">${item.nowprice}</span><span class="regular-price">${item.oldprice}</span></div>
                  </div>
              </div>
                `;
        });
        tabItems.innerHTML = result;
        tabDom.appendChild(tabItems);
        isCheckTab = 0;
        tabRenDer = [];
      }
    });
  }
}

class storgae {
  static saveTabProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}
function running() {
  const productData = new products();
  const disPlayTabs = new ui();
  ///tab-product
  productData.getProductTab().then((data) => {
    storgae.saveTabProducts(data);
    disPlayTabs.tab(data);
  });
}
running();
