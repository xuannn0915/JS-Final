(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();new Swiper(".mySwiper",{slidesPerView:"2.5",spaceBetween:30,loop:!0,freeMode:!0,autoplay:{delay:4500,disableOnInteraction:!1}});new Swiper(".mySwiper2",{slidesPerView:"2.5",spaceBetween:30,centeredSlides:!0,loop:!0,freeMode:!0,autoplay:{delay:4500,disableOnInteraction:!1}});const n="xuan",l=document.querySelector(".productList");function a(){axios.get(`https://livejs-api.hexschool.io/api/livejs/v1/customer/${n}/products`).then(function(s){let o="",i=s.data.products;console.log(i),i.forEach(function(r){let e=`            
      <li class="col-3">
      <div class="card border-0 position-relative">
        <div class="text-white bg-black tag position-absolute">${r.category}</div>
        <img src=${r.images} alt="" class="card-pic">
        <div class="btn btn-black rounded-0 card-btn mb-2">加入購物車</div>
        <div class="card-body p-0">
          <p class="productName mb-2">${r.title}</p>
          <p class="oldPrice text-decoration-line-through">NT${r.origin_price}</p>
          <p class="fs-3 newPrice">NT${r.price}</p>
        </div>
      </div>
    </li>`;o+=e}),l.innerHTML=o}).catch(function(s){console.log(s.response)})}a();
