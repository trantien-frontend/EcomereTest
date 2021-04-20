async function getDatas() {
  let getData = await fetch("./db.json");
  let datas = await getData.json();
  let { products } = datas;
  products = products.map((product) => {
    let { id } = product.sys;
    let { title, price } = product.content;
    let { nowprice, oldprice } = price;
    let { image } = product.images;
    return { id, title, oldprice, nowprice, image };
  });
  return products;
}
function storageSaveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}
function storageGetProducts() {
  let products = JSON.parse(localStorage.getItem("products"));
  return products;
}
function storageSaveCart(products) {
  localStorage.setItem("cart", JSON.stringify(products));
}
function storageGetCart() {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
}
// Running
