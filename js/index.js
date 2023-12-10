//api path:xuan
//UID:SilbCe0IbhXlbMHF9Eu6JUataJQ2

const api_path = "xuan";
const token = "SilbCe0IbhXlbMHF9Eu6JUataJQ2";
const productList = document.querySelector(".productList");
const productSelect = document.querySelector("#productSelect");
const tableBody = document.querySelector(".table-body");
const cartFinalPrice = document.querySelector(".cart-finalPrice");
const deleteAll = document.querySelector('.deleteAll');

let productData=[];
let cartData=[];

function init() {
  axios
    .get(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/products`
    )
    .then(function (response) {
      productData = response.data.products;
      renderProductList(productData);
    })
    .catch(function (error) {
      console.log(error.response);
    });
}

function renderProductList(data) {
  let content = "";
  data.forEach(function (item) {
    let str = `            
    <li class="col-3">
    <div class="card border-0 position-relative">
      <div class="text-white bg-black tag position-absolute">${item.category}</div>
      <img src=${item.images} alt="" class="card-pic">
      <input type="button" value="加入購物車" class="btn text-white rounded-0 card-btn mb-2" data-id="${item.id}">
      <div class="card-body p-0">
        <p class="productName mb-2">${item.title}</p>
        <p class="oldPrice text-decoration-line-through">NT${item.origin_price}</p>
        <p class="fs-3 newPrice">NT${item.price}</p>
      </div>
    </div>
  </li>`;
    content += str;
  });
  productList.innerHTML = content;
}

function renderShoppingCart() {
  axios
    .get(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`
    )
    .then(function (response) {
      cartData = response.data.carts;
      let shoppingCartStr = "";
      cartData.forEach(function (item) {
        shoppingCartStr += `<tr>
        <td style="width: 100px;">
          <img src="${item.product.images}" alt="" class="cart-pic">
        </td>
        <td>
          <p class="cart-name">${item.product.title}</p>
        </td>
        <td class="cart-singlePrice">
            ${item.product.price}
        </td>
        <td style="width: 100px;" class="cart-num">${item.quantity}</td>
        <td class="cart-totalPrice">
        ${item.product.price * item.quantity}
        </td>
        <td style="width: 60px;">
          <div class="btn cart-delete">
            <i class="fa-solid fa-xmark fs-2" class="fs-1"></i>
          </div>
        </td>
      </tr>`;
        tableBody.innerHTML = shoppingCartStr;
        cartFinalPrice.textContent = `NT$${response.data.finalTotal}`;
      });
    });
}

function addShoppingCart(id) {
  let numCheck = 1;
  cartData.forEach(function (item) {
    if (item.product.id === id) {
      numCheck += 1;
    }
  });
  axios
    .post(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`,
      {
        data: {
          productId: id,
          quantity: numCheck,
        },
      }
    )
    .then(function (response) {
      renderShoppingCart();
    })
    .catch(function (error) {
      console.log(error.response);
    });
}

init();

productSelect.addEventListener("change", function (e) {
  e.preventDefault();
  let selectTag = e.target.value;
  let selectAry = [];
  if (selectTag === "全部") {
    renderProductList(productData);
    return;
  } else {
    productData.forEach(function (item) {
      let selectObj = {};
      if (selectTag === item.category) {
        selectObj.category = item.category;
        selectObj.images = item.images;
        selectObj.title = item.title;
        selectObj.origin_price = item.origin_price;
        selectObj.price = item.price;
        selectAry.push(selectObj);
      } else {
        console.log("查無此內容");
      }
    });
    renderProductList(selectAry);
  }
});

productList.addEventListener("click", function (e) {
  {
    e.preventDefault();
    if (e.target.nodeName !== "INPUT") {
      return;
    }
    alert("已將此物品加入購物車");
    let productId = e.target.getAttribute("data-id");
    addShoppingCart(productId);
  }
});

deleteAll.addEventListener('click', function(e){
  e.preventDefault();
  axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`)
  .then(function (response){
    alert('您的購物車已清空！')
    console.log(cartData);
    renderShoppingCart()
  //   let str = `<tr>
  //   <td colspan="5" class="text-center text-dark">
  //     目前無商品內容
  //   </td>
  // </tr>`;
  //   tableBody.innerHTML = str

  })
  .catch(function(error){
    alert(error.response.data.message);
  })
})