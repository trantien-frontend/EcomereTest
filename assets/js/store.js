async function getDatas() {
  try {
    let getData = await fetch("db.json");
    let datas = await getData.json();
    return datas;
  } catch (error) {
    console.log(error);
  }
}

//Tab-Product
function getProduct() {
  getDatas().then((data) => {
    let {products} = data;
    products = products.map(product=>{
        let {id} = product.sys;
        let {title, price} = product.content; 
        let {nowprice, oldprice} = price; 
        let {image} = product.images;
        return {id,title,oldprice,nowprice,image}
    })
    saveProducts(products,'products');
    tabSell(products)
  });
}
function tabSell (products) {
    let newArr = [...products]
    let arr = newArr.slice(0,12);
    const tabActive = document.querySelector('')
    renderTab(newArr);
}
function renderTab (product,tabActive) {
    
}
function saveProducts (product,name) {
    localStorage.setItem(name,JSON.stringify(product))
}
// Running 
function running() {
    getProduct();
}
running();
