//api path:xuan
//UID:SilbCe0IbhXlbMHF9Eu6JUataJQ2

const api_path = "xuan";
const token ="SilbCe0IbhXlbMHF9Eu6JUataJQ2";
const productList = document.querySelector('.productList');
const productSelect = document.querySelector('#productSelect');

let productData

function init(){
  axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/products`)
  .then(function (response){
    productData = response.data.products;
    renderProductList(productData);
  })
  .catch(function (error){
    console.log(error.response);
  })
}

function renderProductList(data){
  let content='';
  data.forEach(function (item){
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
  })
  productList.innerHTML=content;
}

function selectProductList(e){
  e.preventDefault();
  let selectTag = e.target.value;
  let selectAry=[];
  if(selectTag==="全部"){
    renderProductList(productData);
    return
  }else{
    productData.forEach(function(item){
      let selectObj={};
      if(selectTag===item.category){
        selectObj.category= item.category;
        selectObj.images= item.images;
        selectObj.title= item.title;
        selectObj.origin_price= item.origin_price;
        selectObj.price= item.price;
        selectAry.push(selectObj)
      }
      else{
        console.log('查無此內容');
      }
    })
    renderProductList(selectAry)
  }
}

init()
productSelect.addEventListener('change',selectProductList);