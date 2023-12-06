//api path:xuan
//UID:SilbCe0IbhXlbMHF9Eu6JUataJQ2

const api_path = "xuan";
const token ="SilbCe0IbhXlbMHF9Eu6JUataJQ2";

const productList = document.querySelector('.productList');

function getProductList(){
  axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/products`)
  .then(function (response){
    let content='';
    let productData = response.data.products;
    console.log(productData);
    productData.forEach(function (item){
      let str = `            
      <li class="col-3">
      <div class="card border-0 position-relative">
        <div class="text-white bg-black tag position-absolute">${item.category}</div>
        <img src=${item.images} alt="" class="card-pic">
        <div class="btn btn-black rounded-0 card-btn mb-2">加入購物車</div>
        <div class="card-body p-0">
          <p class="productName mb-2">${item.title}</p>
          <p class="oldPrice text-decoration-line-through">NT${item.origin_price}</p>
          <p class="fs-3 newPrice">NT${item.price}</p>
        </div>
      </div>
    </li>`
    content+=str
    });
  productList.innerHTML=content;
  })
  .catch(function (error){
    console.log(error.response);
  })
}

getProductList()