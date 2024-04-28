const API__URL = "https://dummyjson.com";
const generalCard = document.querySelector(".cards");
const loading = document.querySelector(".loading");
const seeMore = document.querySelector(".card__see-more");
let limitCount = 3;
let multipleCount = 1;

async function fetchApi(url) {
  let data = await fetch(
    `${url}/products?limit=${limitCount * multipleCount}`,
    {
      method: "GET",
    }
  );

  data
    .json()
    .then((res) => mapApi(res))
    .catch((err) => console.log(err))
    .finally(() => {
      seeMore.innerHTML = "See more";
      seeMore.removeAttribute("disabled");
    });
}

fetchApi(API__URL);

function mapApi(data) {
  let card = "";
  data.products.forEach((element) => {
    card += `
            <div   data-id="${element.id}" class="card">
              <div class="card__top">
                <img class="card__image" src="${element.images[0]}" alt="" />
              </div>

              <div class="card__bottom">
                <h2 class="card__title">${element.title}</h2>
                <p class="card__price">$${element.price}</p>
                <i class="fa-regular fa-heart"></i>
              </div>
            </div>
        `;
  });

  generalCard.innerHTML = card;
}

const addToWishlist = async (id) => {
  console.log("ok");
  let data = await fetch(`${API__URL}/products/${id}`);
  data
    .json()
    .then((product) => {
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      let index = wishlist.findIndex((el) => el.id === product.id);
      let updateWishlist = [];

      if (index < 0) {
        updateWishlist = [...wishlist, product];
      } else {
        updateWishlist = wishlist.filter((el) => el.id !== product.id);
      }
      localStorage.setItem("wishlist", JSON.stringify(updateWishlist));
    })
    .catch((err) => console.log(err));
};

generalCard.addEventListener("click", (e) => {
  if (e.target.className === "card__image") {
    // console.log(e.target.dataset.id);
    // let id = e.target.dataset.id;
    // window.open(`./pages/card.html?id=${id}`, "_self");
    let id = e.target.closest(".card").dataset.id;
    window.open(`./pages/product.html?productId=${id}`, "_self");
  } else if (e.target.className.includes("fa-heart")) {
    let id = e.target.closest(".card").dataset.id;
    addToWishlist(id);
  }
});

seeMore.addEventListener("click", () => {
  multipleCount++;
  fetchApi(API__URL);
  seeMore.innerHTML = "loading...";
  seeMore.setAttribute("disabled", true);
});

const inputSearch = document.querySelector(".input__search");
const select = document.querySelector(".select");

async function fetchData(URL) {
  const data = await fetch(`${URL}/products/categories`, {
    method: "GET",
  });

  data
    .json()
    .then((res) => createOptions(res))
    .catch((err) => console.log(err));
}

fetchData(API__URL);

function createOptions(data) {
  let options = `<option value="all">All</option>`;
  data.forEach((element) => {
    options += `
    <option value="${element}">${element}</option>
    `;
  });

  select.innerHTML = options;
}

const wrapper = document.querySelector(".wrapper");

async function fetchProducts(api, option, searchValue) {
  let url = "";
  if (option === "all") {
    if (searchValue) {
      url = `${api}/products/search/?q=${searchValue}`;
    } else {
      url = `${api}/products`;
    }
  } else {
    url = `${api}/products/category/${option}`;
  }
  // console.log(url);
  const data = await fetch(url, {
    method: "GET",
  });

  data
    .json()
    .then((res) => mapApi(res))
    .catch((err) => console.log(err));
}

fetchProducts(API__URL, "all");

select.addEventListener("change", (e) => {
  let optionValue = e.target.value;
  fetchProducts(API__URL, optionValue);

  fetchProducts(API_URL);
});

inputSearch.addEventListener("input", (e) => {
  let value = e.target.value.trim();
  if (value) {
    fetchProducts(API__URL, "all", value);
    select.value = "all";
  }
});
