let navToggleBtn = document.getElementById("nav-toggle-btn");
let navMenu = document.getElementById("nav_collapse");
let colors = document.querySelectorAll(".color__option");
let sizes = document.querySelectorAll(".size__option");
let quantity = document.getElementById("total__item");
let sizeDisplay = document.getElementById("size__info__selected");
let colorDisplay = document.getElementById("color__info__selected");
let checkoutBtn = document.getElementById("checkout-btn");
let stockCounter = document.getElementById("stock-counter");
let newStock = parseInt(stockCounter.innerText);
let order = {};

// // NAVIGATION
navToggleBtn.addEventListener("click", () => {
  console.log(navMenu);
  navMenu.classList.toggle("hidden");
});

// SECTIONS

const selectItem = (array) => {
  array.forEach((item) => {
    item.classList.remove("active");
  });
};

// SET ORDER COLOR
const selectColor = (e) => {
  e.preventDefault();
  selectItem(colors);

  let colorData = e.currentTarget.getAttribute("data-color");

  e.currentTarget.classList.add("active");
  order.color = colorData;
  colorDisplay.innerHTML = colorData;
  console.log(order);

  checkoutBtn.disabled = Object.keys(order).length > 2 ? false : true;
};


// SET ORDER SIZE
const selectSize = (e) => {
  e.preventDefault();
  selectItem(sizes);

  let sizeData = e.currentTarget.getAttribute("data-size");

  e.currentTarget.classList.add("active");
  order.size = sizeData;
  sizeDisplay.innerHTML = sizeData;
  console.log(order);

  checkoutBtn.disabled = Object.keys(order).length > 2 ? false : true;
};

// UPDATE ORDER
const updateOrder = (e) => {
  e.preventDefault();

  let checkoutForm = document.getElementById("checkoutForm");
  let checkoutize = document.getElementById("checkout__size");
  let checkoutColor = document.getElementById("checkout__color");
  let checkoutQuantity = document.getElementById("checkout__quantity");

  console.log(checkoutForm);
  checkoutForm.style.display = "flex";
  checkoutize.innerText = order.size;
  checkoutColor.innerText = order.color;
  checkoutQuantity.innerText = order.total;

  // update stock
  stockCounter.innerText =  newStock - quantity.value;;
};

colors.forEach((node) => {
  node.addEventListener("click", selectColor);
});

sizes.forEach((node) => {
  node.addEventListener("click", selectSize);
});

quantity.onchange = function () {
  order.total = quantity.value;
  console.log(order);
  checkoutBtn.disabled = Object.keys(order).length > 2 ? false : true;
};

checkoutBtn.addEventListener("click", updateOrder);
