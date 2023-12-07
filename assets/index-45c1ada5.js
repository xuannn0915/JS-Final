(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();new Swiper(".mySwiper",{slidesPerView:"2.5",spaceBetween:30,loop:!0,freeMode:!0,autoplay:{delay:4500,disableOnInteraction:!1}});new Swiper(".mySwiper2",{slidesPerView:"2.5",spaceBetween:30,centeredSlides:!0,loop:!0,freeMode:!0,autoplay:{delay:4500,disableOnInteraction:!1}});const a="xuan",d=document.querySelector(".productList"),u=document.querySelector("#productSelect");let s;function p(){axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${a}/products`).then(function(c){s=c.data.products,l(s)}).catch(function(c){console.log(c.response)})}function l(c){let i="";c.forEach(function(o){let t=`            
    <li class="col-3">
    <div class="card border-0 position-relative">
      <div class="text-white bg-black tag position-absolute">${o.category}</div>
      <img src=${o.images} alt="" class="card-pic">
      <div class="btn btn-black rounded-0 card-btn mb-2">加入購物車</div>
      <div class="card-body p-0">
        <p class="productName mb-2">${o.title}</p>
        <p class="oldPrice text-decoration-line-through">NT${o.origin_price}</p>
        <p class="fs-3 newPrice">NT${o.price}</p>
      </div>
    </div>
  </li>`;i+=t}),d.innerHTML=i}function f(c){c.preventDefault();let i=c.target.value,o=[];if(i==="全部"){l(s);return}else s.forEach(function(t){let e={};i===t.category?(e.category=t.category,e.images=t.images,e.title=t.title,e.origin_price=t.origin_price,e.price=t.price,o.push(e)):console.log("查無此內容")}),l(o)}p();u.addEventListener("change",f);
