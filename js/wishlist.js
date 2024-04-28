const generalCard = document.querySelector(".cards");
let wishlist = JSON.parse(localStorage.getItem("wishlist"));

function mapApi(data) {
  let card = "";
  data.forEach((element) => {
    card += `
            <div   data-id="${element.id}" class="card">
                <div class="card__top">
                    <img class="card__image" src="${element.thumbnail}" alt="#" />
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

mapApi(wishlist);
const addToWishlist = (id) => {
  let wishlist = JSON.parse(localStorage.getItem("wishlist"));
  let updateWishlist = wishlist.filter((el) => el.id !== +id);
  localStorage.setItem("wishlist", JSON.stringify(updateWishlist));
  mapApi(updateWishlist);
};
generalCard.addEventListener("click", (e) => {
  if (e.target.className === "card__image") {
    let id = e.target.closest(".card").dataset.id;
    window.open(`./pages/product.html?productId=${id}`, "_self");
  } else if (e.target.className.includes("fa-heart")) {
    let id = e.target.closest(".card").dataset.id;
    addToWishlist(id);
  }
});
