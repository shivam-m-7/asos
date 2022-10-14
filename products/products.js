import productsImported from "../data/data.js";

!JSON.parse(localStorage.getItem("products")) &&
  localStorage.setItem("products", JSON.stringify(productsImported));

const isMenOrWomen =
  JSON.parse(localStorage.getItem("isMenOrWomen")) || "Women";

const products = JSON.parse(localStorage.getItem("products")) || [];

const container = document.getElementById("productsContainer");

const path = document.getElementById("path");
path.innerHTML = `<li id = 'home'> Home </li><li> > </li><li id = ${isMenOrWomen}>${isMenOrWomen}`;

const homeLink = document.getElementById("home");
homeLink.addEventListener("click", (e) => {
  window.location.href = "../index.html";
});
const isMenOrWomenLink = document.getElementById(`${isMenOrWomen}`);
isMenOrWomenLink.addEventListener("click", (e) => {
  const toSet =
    JSON.parse(localStorage.getItem("isMenOrWomen")) || isMenOrWomen;
  localStorage.setItem("isMenOrWomen", JSON.stringify(toSet));
  window.location.reload();
});

window.onscroll = () => {
  toggleTopButton();
};

document.getElementById('back-to-up').addEventListener('click', (e) => {
    scrollToTop();
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleTopButton() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    document.getElementById("back-to-up").classList.remove("d-none");
  } else {
    document.getElementById("back-to-up").classList.add("d-none");
  }
}

const pageHeading = document.querySelector("#path + div > h1");
pageHeading.innerHTML = `${isMenOrWomen}'s New in: Clothing`;

function addProductDescriptionToLS(code) {
  let detailsOf = JSON.parse(localStorage.getItem("products")).filter((el) => {
    return el.productCode === code;
  });
  localStorage.setItem("productDescription", JSON.stringify(detailsOf[0]));
}

function addToWishList(code) {
  let products = JSON.parse(localStorage.getItem("products")) || [];

  let a = [];
  products.forEach((element) => {
    if (element.productCode === code) {
      let o = { ...element, isInWishlist: !element.isInWishlist };
      a.push(o);
    } else {
      a.push(element);
    }
  });

  localStorage.setItem("products", JSON.stringify(a));
  window.location.href = "../productDescription/productDescription.html";
}

function renderProducts(object, i) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.style.cursor = "pointer";
  card.addEventListener("click", (e) => {
    addProductDescriptionToLS(object.productCode);
    window.location.href = "../productDescription/productDescription.html";
  });

  let img = document.createElement("img");
  img.setAttribute("src", object.images[0]);
  img.setAttribute("alt", object.productTitle);

  let p = document.createElement("p");
  p.innerHTML = object.productTitle;

  let s = document.createElement("s");
  s.innerHTML = "Rs." + object.strikedOffPrice;

  let span = document.createElement("span");
  span.innerHTML = "Rs." + object.price;

  let p1 = document.createElement("p");
  p1.append(s, span);

  let wishListButton = document.createElement("div");
  wishListButton.id = "wishListButton";
  wishListButton.innerHTML = '<i class="fa-regular fa-heart"></i>';
  wishListButton.addEventListener("click", (e) => {
    addToWishList(object.productCode);
  });

  if (object.isInWishlist) wishListButton.classList.add("addedToWishlist");

  card.append(img, p, p1, wishListButton);
  container.append(card);
}

products
  .filter((el) => el.isMenOrWomen === isMenOrWomen)
  .forEach((element, i) => {
    renderProducts(element, i);
  });

console.log(products);

const priceSelect = document.getElementById("priceSelect");
priceSelect.addEventListener("change", (e) => {
  if (e.target.value === "lth") {
    container.innerHTML = "";
    products
      .filter((e) => {
        return e.isMenOrWomen === isMenOrWomen;
      })
      .sort((a, b) => {
        return a.price - b.price;
      })
      .forEach((el, i) => {
        renderProducts(el, i);
      });
  } else if (e.target.value === "htl") {
    container.innerHTML = "";
    products
      .filter((e) => {
        return e.isMenOrWomen === isMenOrWomen;
      })
      .sort((a, b) => {
        return b.price - a.price;
      })
      .forEach((el, i) => {
        renderProducts(el, i);
      });
  }
});

const category = document.getElementById("category");
category.addEventListener("change", (e) => {
  container.innerHTML = "";
  products
    .filter((el) => {
      return el.category === e.target.value;
    })
    .forEach((el, i) => {
      renderProducts(el, i);
    });
});

const brand = document.getElementById("brand");
brand.addEventListener("change", (e) => {
  container.innerHTML = "";
  products
    .filter((el) => {
      return el.brand === e.target.value;
    })
    .forEach((el, i) => {
      renderProducts(el, i);
    });
});
