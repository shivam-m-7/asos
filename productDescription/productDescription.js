const productDescription = JSON.parse(localStorage.getItem('productDescription'))

const productTitle = document.getElementById('productTitle')
productTitle.innerText = productDescription.productTitle;

const price = document.getElementById('price')
price.innerText = 'Rs ' + productDescription.price;

const color = document.getElementById('color')
color.innerText = productDescription.color;

const productDetails = document.getElementById('productDetailsDesc')
productDetails.innerHTML = productDescription.productDetails;

const productCode = document.getElementById('productCode')
productCode.innerText = productDescription.productCode;

const brand = document.getElementById('brand')
brand.innerText = productDescription.brandDescription;

const lookAfterMe = document.getElementById('lookAfterMe')
lookAfterMe.innerText = productDescription.lookAfterMe;

const aboutMe = document.getElementById('aboutMe')
aboutMe.innerText = productDescription.aboutMe;

const path = document.getElementById('path')
path.innerHTML = `<li id = 'home'> Home </li><li> > </li><li id = ${productDescription.isMenOrWomen}>${productDescription.isMenOrWomen}</li><li> > </li><li >${productDescription.productTitle}</li>`

const homeLink = document.getElementById('home')
homeLink.addEventListener('click', (e) => {
    window.location.href = '../index.html'
})
const isMenOrWomenLink = document.getElementById(`${productDescription.isMenOrWomen}`);
isMenOrWomenLink.addEventListener('click', (e) => {
    
    window.location.href = '../mensProducts/products.html';
})

const productDetailsContainer = document.getElementById('productDetailsContainer')

const showMoreLess = document.getElementById('showMoreLess');
showMoreLess.addEventListener('click', (e) => {
    if(showMoreLess.innerText === 'Show More'){
        productDetailsContainer.style.height = '100%'
        showMoreLess.innerText = 'Show Less'
    }else{
        productDetailsContainer.style.height = '8rem'
        showMoreLess.innerText = 'Show More'
    }
})

const wishListButton = document.getElementById('wishListButton') 
if(productDescription.isInWishlist) wishListButton.classList.add('addedToWishlist')
wishListButton.addEventListener('click', (e) => {
    addToWishList(productDescription.productCode);
})

document.getElementById('linkToMen').addEventListener('click', (e) => {
    localStorage.setItem('isMenOrWomen',JSON.stringify('Men'))
    window.location.href = '../mensProducts/products.html'
})

document.getElementById('linkToWomen').addEventListener('click', (e) => {
    localStorage.setItem('isMenOrWomen',JSON.stringify('Women'))
    window.location.href = '../mensProducts/products.html'
})

document.getElementById('addToBag').addEventListener('click', (e) => {
    const productsToFilter = JSON.parse( localStorage.getItem('products') );
    productsToFilter.forEach((el) => {
        if(el.productCode === productDescription.productCode){
            //
        }
    })
})
//////////////////////////////////////////
//carousel part starts
//////////////////////////////////////////

const imgs = document.getElementById('imgs')
const navigatorImgContainer = document.getElementById('imgThumbnailContainer')

productDescription.images.map((el) => {
    const image = document.createElement('img');
    image.setAttribute('src',el);
    return image
}).forEach((el) => {
    imgs.append(el);
})

productDescription.images.map((el) => {
    const image = document.createElement('img');
    image.setAttribute('src',el);
    return image
}).forEach((el) => {
    navigatorImgContainer.append(el)
})


const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')
const img = document.querySelectorAll('#imgs img')
const navigatorImgs = document.querySelectorAll('#imgThumbnailContainer img')

let idx = 0
let interval = setInterval(run, 3000);

function run() {
    idx++
    
    changeImage()
}

function changeImage() {
    if(idx > img.length -1) {
        idx = 0
    }else if(idx < 0) {
        idx = img.length -1
    }
    
    imgs.style.transform = `translateX(${-idx * imgs.getBoundingClientRect().width}px)`
}

function resetInterval() {
    clearInterval(interval)
    interval = setInterval(run, 2000)
}

rightBtn.addEventListener('click', () => {
    idx++
    changeImage()
    resetInterval()
})

leftBtn.addEventListener('click', () => {
    idx--
    changeImage()
    resetInterval()
})

navigatorImgs.forEach((el,i) => {
    el.addEventListener('click', (e) => {
        idx = i;
        changeImage();
        resetInterval();
    })
});

function addToWishList(code) {
    
    let products = JSON.parse(localStorage.getItem('products'))||[]

    let a = [];
    products.forEach(element => {
        if(element.productCode === code ){
            let o = {...element,isInWishlist:!element.isInWishlist}
            a.push(o);
        }
        else{
            a.push(element);
        }
    });
    
    if(!productDescription.isInWishlist) wishListButton.classList.add('addedToWishlist')
    productDescription.isInWishlist = !productDescription.isInWishlist
    localStorage.setItem('productDescription',JSON.stringify(productDescription))
    localStorage.setItem('products',JSON.stringify(a))
    window.location.href = '../productDescription/productDescription.html'

}

//////////////////////////////////////////////////////
//You Might also like 
const container = document.getElementById('recommendations');
const products = JSON.parse(localStorage.getItem('products')) || [];
const recommended = products.filter((el) => {
    return el.category === productDescription.category 
})

function addProductDescriptionToLS(code) {
    let detailsOf = JSON.parse(localStorage.getItem('products')).filter((el) => {
        return el.productCode === code;
    })
    localStorage.setItem('productDescription',JSON.stringify(detailsOf[0]))
}


console.log(recommended)

function renderProducts(object,i) {

    let card = document.createElement('div');
    card.classList.add('card');
    card.style.cursor = 'pointer'
    card.addEventListener('click', (e) =>{
        addProductDescriptionToLS(object.productCode);
        window.location.reload();
    })
    
    let img = document.createElement('img');
    img.setAttribute('src',object.images[0]);
    img.setAttribute('alt',object.productTitle);
    
    let p = document.createElement('p');
    p.innerText = object.productTitle;
    
    let s = document.createElement('s');
    s.innerHTML = "Rs." + object.strikedOffPrice;
    
    let span = document.createElement('span');
    span.innerHTML = "Rs." + object.price;
    
    let p1 = document.createElement('p');
    p1.append(s,span)

    let wishListButton = document.createElement('div')
    wishListButton.id = 'wishListButton';
    wishListButton.innerHTML = '<i class="fa-regular fa-heart"></i>'
    wishListButton.addEventListener('click', (e) => {
        addToWishList(object.productCode);
    })
    
    if(object.isInWishlist) wishListButton.classList.add('addedToWishlist')
    
    console.log(card)
    
    card.append(img,p,p1,wishListButton);
    container.append(card);
}

recommended.forEach((element,i) => {
    if(i<6) renderProducts(element,i)
});



