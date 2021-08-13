class Product{
    constructor(name,price, url){
        this.name = name;
        this.price = price;
        this.url = url;
    }
}

function slideJump(steps) {
    let index = parseInt(main.getAttribute("data-index"));
    let currentElement = sliderItems.item(index);

    if(index !== parseInt(steps)) {
        index = steps;
        let nextElement = sliderItems.item(index);
        animateMain(currentElement, nextElement);
        main.setAttribute("data-index", index.toString());
    }
}
function slideItem(product, index){
    document.getElementById("targetNo").innerHTML = index;
    document.getElementById("targetName").innerHTML = product.name;
    document.getElementById("targetPrice").innerHTML = product.price + "円";
}
function animateMain(currentElement, nextElement) {
    main.innerHTML = "";
    main.append(nextElement);
    
    extra.innerHTML = "";
    extra.append(currentElement);

    main.classList.add("expand-animation");
    extra.classList.add("deplete-animation");
    
    sliderShow.innerHTML = "";
    sliderShow.append(main);
    sliderShow.append(extra);
}
function createSlide(products){
    const target = document.getElementById("targetSlide");
    let dom = "";
    let img = "";

    // create default img
    dom = document.createElement("div");
    dom.classList.add("box", "slider-item");

    img = document.createElement("img");
    img.classList.add("img-size");
    img.src = "https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png";
    dom.append(img);
    target.append(dom);

    for(i=0; i < products.length; i++){
        dom = document.createElement("div");
        dom.classList.add("box", "slider-item");

        img = document.createElement("img");
        img.classList.add("img-size");
        img.src = products[i].url;
        dom.append(img);
        target.append(dom);
    }
}
function createButton(productCount){
    const targetButton = document.getElementById("targetButton");
    let parentButton = document.createElement("div");
    let childButton = "";
    let button = "";
    let buttonName = "";
    
    parentButton.classList.add("d-flex", "flex-wrap", "justify-content-start");

    for(i = 1; i <= productCount; i++){
        buttonName = "btn-"+i;
        childButton = document.createElement("div");
        childButton.classList.add("col-4", "py-2");
        
        button = document.createElement("button");
        button.setAttribute("id", buttonName);
        button.innerHTML = i;

        childButton.append(button);
        parentButton.append(childButton);
        childButton = "";
    }
    targetButton.append(parentButton);
}
function addButtonEvent(products){
    for(var i = 0;i<products.length;i++){
        (function(n){
            let increment = n+1;
            document.getElementById("btn-"+increment).addEventListener("click", function(){
                slideJump(increment);
                slideItem(products[n], increment);
            })
        })(i);
     }
}
const target = document.getElementById("target");
target.innerHTML +=
`
<div class="container-fluid">
    <div class="row">
        <div class="bg-light-gray col-12 p-3"></div>
        <div class="col-12 bg-blue">
            <div class="p-2"></div>
            <div class="row">
                <!-- leftBox -->
                <div class="col-8">
                    <!-- Slider -->
                    <div class="bg-light-gray p-3">
                        <div class="bg-dark-gray p-3">
                            <div id="targetSlide" class="col-12 slider-data d-none"></div>
                        </div>
                    </div>
                    <div class="m-3">
                        <button id="love" class="btn btn-secondary btn-block">PUSH</button>
                    </div>
                </div>
                <!-- rightBox -->
                <div class="col-4">
                    <!-- product's info -->
                    <div class="col-12 bg-light-gray">
                        <div class="row">
                            <div class="col-4 py-2">
                                <div class="col-12 squre-flame bg-red d-flex align-items-center justify-content-center">
                                    <h2 id="targetNo" class="text-white text-center ">0</h2>
                                </div>
                            </div>
                            <div class="col-8 product-info">
                                <h5 id="targetName">商品名</h5>
                                <h5 id="targetPrice">0円</h5>
                            </div>
                        </div>
                    </div>
                    <!-- product's button -->
                    <div class="p-2"></div>
                    <div id="targetButton" class="col-12 bg-light-gray"></div>
                </div>
            </div>
        </div>
        <div class="bg-light-gray p-3 col-12"></div>
    </div>
</div>
`;


const products = [
    new Product("コカコーラ", 100, "https://1.bp.blogspot.com/-3wo33nLxIKw/X1LskM84NQI/AAAAAAABa_I/D7QLbbJYqOsyI26PwlE23Dl6Dy-CzM8rQCNcBGAsYHQ/s1600/drink_cola_petbottle.png"),
    new Product("メロンソーダ", 150, "http://illustrain.com/img/work/2016/illustrain09-nomimono5.png"),
    new Product("ラムネ", 200, "https://2.bp.blogspot.com/-0Jota1opNLo/UW4WVnPRZBI/AAAAAAAAQuE/Tnf_vvDVBp4/s1600/sweets_ramune_drink.png"),
    new Product("ココナッツミルク", 400, "https://2.bp.blogspot.com/-weNDcKFd1BI/XLAdAK_cFXI/AAAAAAABSUo/vuH1b2cauMspv6OSu7uZe2bbH3pxiO3kwCLcBGAs/s800/drink_fruit_coconut_milk.png"),
    new Product("タピオカミルクティー", 500, "https://2.bp.blogspot.com/-oVW5i9To4-0/XJB4zFoyS2I/AAAAAAABR6I/m5Elfo5wzJMn9Alf2jvZxK8xg-HfHAiIgCLcBGAs/s800/drink_tapioca_brown.png"),
];
createSlide(products);
createButton(products.length);
addButtonEvent(products);

const sliderItems = document.querySelectorAll("#targetSlide .slider-item");

let sliderShow = document.createElement("div");
let main = document.createElement("div");
let extra = document.createElement("div");

sliderShow.classList.add("col-12", "d-flex", "flex-nowrap", "overflow-hiddens", "justify-content-center");
main.classList.add("main", "d-flex", "justify-content-center");
extra.classList.add("extra");

main.append(sliderItems[0]);

sliderShow.append(main);
sliderShow.append(extra);
document.getElementsByClassName("bg-dark-gray p-3")[0].append(sliderShow);

main.setAttribute("data-index", "0");

document.getElementById("love").addEventListener("click", function(){
    let index = parseInt(main.getAttribute("data-index"));
    // 初期値
    if(index === 0){
        alert("商品を選択してから、PUSHボタンを押してください！")
    }else{
        index--;
        if(confirm(products[index].name + "を" + products[index].price + "円で購入しますか？")){
            alert(products[index].name + "を" + products[index].price + "円で購入しました！！");
        }else{
            alert(products[index].name + "を購入しませんでした！");
        }
    }
})