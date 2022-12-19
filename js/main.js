// corusel qismi
$('.corusel').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,
  dots: true
});




// watch shop
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

//cartni ochish

cartIcon.onclick = () =>{
cart.classList.add("active")
}

//cartni yopish

closeCart.onclick = () =>{
  cart.classList.remove("active")
  }

  // cartni ishlashi jsda

  if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
  }else{
    ready();
  }

  // funcsiya yasaymiz

  function ready(){
    // cartdan itemni olib tashlaymiz
    let removeCartButtons = document.getElementsByClassName('cart-remove')
    for(let i=0; i<removeCartButtons.length; i++){
      let button = removeCartButtons[i]
      button.addEventListener('click', removeCartItem )
    }

//sonini o'zgartirganda mablag' o'zgartirish

let quantityInputs =document.getElementsByClassName('cart-input')
for(let i=0; i<quantityInputs.length; i++){
  let input = quantityInputs[i]
  input.addEventListener('change', quantitychanged)
}

// Karta qo'shamiz

let addCart = document.getElementsByClassName("add-cart")
for(let i =0; i<addCart.length; i++){
  let button=addCart[i]
  button.addEventListener("click", addCartClicked)
}

// sotib olish qismi

document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked)
  }
// buy button function
function buyButtonClicked(){
  alert("Xaridingiz qabul qilindi!")
  let cartContent = document.getElementsByClassName("cart-context")[0]
  while (cartContent.hasChildNodes() ){
    cartContent.removeChild(cartContent.firstChild);
    cartIcon.innerHTML=0
  }
  updatetotal()
}
    // cartdan itemni olib tashlaymiz

    function removeCartItem(event){
      let buttonClicked = event.target
      buttonClicked.parentElement.remove()
      cartIcon.innerHTML-=1

      updatetotal()
    }

      //o'zgartiradigan funksiyasi

      function quantitychanged(event){
        let input = event.target;
        if(isNaN(input.value)){
          input.value=1;
        }
        updatetotal()
      }

    //Add to cart
function addCartClicked(event){
  cartIcon.innerHTML-=-1
  let button = event.target
  let shopProducts = button.parentElement
  let title = shopProducts.getElementsByClassName("product-title")[0].innerText
  let price = shopProducts.getElementsByClassName("price")[0].innerText
  let productImg = shopProducts.getElementsByClassName("product-img")[0].src

  addProductToCart(title, price, productImg);
  updatetotal()
}
function addProductToCart(title, price, productImg){
  let cartShopBox = document.createElement('div');
  cartShopBox.classList.add("cart-box")
  let cartItems = document.getElementsByClassName("cart-context")[0];
  let cartItemsNames= cartItems.getElementsByClassName("cart-product-title");
  for(let i=0; i<cartItemsNames.length; i++){
if(cartItemsNames[i].innerText === title){
  alert("Bu cartni Korzinkaga oldin qo'shgansiz!!!");
  cartIcon.innerHTML-=1
return;
}
  }

let cartBoxContent = `
<img src="${productImg}" alt="watch1" class="cart-img">
<div class="detail-box">
  <h2 class="cart-product-title">
    ${title}
  </h2>
  <span class="cart-price">
    ${price}
  </span>
  <input min="0"  type="number"  value="1" class="cart-input"  >
</div>
<i class="bx bxs-trash-alt cart-remove"></i>
`
cartShopBox.innerHTML = cartBoxContent
cartItems.append(cartShopBox)
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem)
cartShopBox.getElementsByClassName("cart-input")[0].addEventListener("change", quantitychanged)
}
  

   // umumiy hisob kitob
   
  function updatetotal(){
    let cartContent = document.getElementsByClassName('cart-context')[0]
    let cartBoxes = cartContent.getElementsByClassName('cart-box')
    let total=0;
    for(let i=0; i<cartBoxes.length; i++){
      let cartBox = cartBoxes[i]
      let priceElement =cartBox.getElementsByClassName('cart-price')[0]
      let quantityElement =cartBox.getElementsByClassName('cart-input')[0]
      var price = parseFloat(priceElement.innerText.replace("$", ""));
      let quantity = quantityElement.value
      total = total+(price*quantity);
    }
      //Agar butun son bo'lsa 35.45457544 kabisonlar kopayib ketadi
      total = Math.round(total*100)/100;
    


      document.getElementsByClassName('total-price')[0].innerHTML='$'+ total
  
  } 

  function loginadd(){
    if(!(localStorage.getItem("user"))){
      window.location.replace('/login.html')
    }
  }
  loginadd()

  let logout = document.querySelector(".logout")
  logout.addEventListener("click", ()=>{
    localStorage.removeItem("user")
    loginadd()
  })
  