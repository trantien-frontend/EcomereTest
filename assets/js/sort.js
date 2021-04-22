class sort {
  ascSortTitle(object) {
    object.sort((param_a, param_b) => {
      let string_a = param_a.title.toUpperCase();
      let string_b = param_b.title.toUpperCase();
      if (string_a < string_b) {
        return -1;
      }
      if (string_a > string_b) {
        return 1;
      }
      return 0;
    });
    return object;
  }
  descSortTitle(object) {
    object.sort((param_a, param_b) => {
      let string_a = param_a.title.toUpperCase();
      let string_b = param_b.title.toUpperCase();
      if (string_a < string_b) {
        return -1;
      }
      if (string_a > string_b) {
        return 1;
      }
      return 0;
    });
    object.reverse();
    return object;
  }
  ascSortPrice(object) {
    object.sort((a, b) => {
      a = parseFloat(parseFloat(a.nowprice));
      b = parseFloat(parseFloat(b.nowprice));
      return a - b;
    });
    return object;
  }
  descSortPrice(object) {
    object.sort((a, b) => {
      a = parseFloat(parseFloat(a.nowprice));
      b = parseFloat(parseFloat(b.nowprice));
      return b - a;
    });
    return object;
  }
}
