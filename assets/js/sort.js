class optionSort {
  sortAz(products) {
    products.sort((a, b) => {
      let titleA = a.title.toLowerCase();
      let titleB = b.title.toLowerCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
    products.reverse();
    return products;
  }
  sortZa(products) {
    products.sort((a, b) => {
      let titleA = a.title.toLowerCase();
      let titleB = b.title.toLowerCase();
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });
    return products;
  }
  sortPriceHL(values) {
    values.sort((a, b) => {
      a = parseFloat(parseFloat(a.nowprice));
      b = parseFloat(parseFloat(b.nowprice));
      return a - b;
    });
    return values;
  }
  sortPriceLH(values) {
    values.sort((a, b) => {
      a = parseFloat(parseFloat(a.nowprice));
      b = parseFloat(parseFloat(b.nowprice));
      return b - a;
    });
    return values;
  }
}
