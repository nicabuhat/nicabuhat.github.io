const e=document.getElementById("nav-toggle-btn"),t=document.getElementById("nav-menu"),o=(document.getElementById("form__submit"),document.querySelectorAll(".link__contact")),c=document.querySelectorAll(".link__projects"),n=document.querySelectorAll(".link__home"),r=(document.querySelectorAll(".nav__item"),document.forms.form);function l(){history.pushState("",document.title,window.location.pathname+window.location.search)}r.addEventListener("submit",(e=>{e.preventDefault(),fetch("https://script.google.com/macros/s/AKfycbyScK0rdRVplrG6SjAiIQBHT9OaLCEfvg8_ikT9xugyRxQ9p_9yjBwDct9QdGRsIKcq/exec",{method:"POST",body:new FormData(r)}).then((e=>location.href="./")).catch((e=>console.error("Error!",e.message)))})),e.addEventListener("click",(e=>{t.classList.toggle("hidden")})),n.forEach((e=>e.addEventListener("click",(()=>{location.href="./#home",l(location.href)})))),o.forEach((e=>e.addEventListener("click",(()=>{location.href="./#contact",l(location.href)})))),c.forEach((e=>e.addEventListener("click",(()=>{location.href="./#projects",l(location.href)}))));