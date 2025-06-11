import { products } from '../data/products.js';

document.addEventListener("DOMContentLoaded", () => {
  const shopContainer = document.getElementById("shop-products");
  const modal = document.getElementById("product-modal");
  const modalContent = document.getElementById("modal-content");

  function renderShopProducts() {
    shopContainer.innerHTML = "";

    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded mb-4 cursor-pointer" data-id="${product.id}">
        <h3 class="text-xl font-semibold">${product.name}</h3>
        <p class="text-yellow-600 font-bold mt-1 mb-2">₹${product.price}</p>
        <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded view-details-btn mt-auto" data-id="${product.id}">
          View Details
        </button>
      `;

      shopContainer.appendChild(card);
    });

    document.querySelectorAll(".view-details-btn, img[data-id]").forEach(elem => {
      elem.addEventListener("click", () => {
        const id = elem.dataset.id;
        openModal(id);
      });
    });
  }

  function openModal(id) {
    const product = products.find(p => p.id == id);
    if (!product) return;

    modalContent.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="w-full h-64 object-cover rounded mb-4">
      <h2 class="text-2xl font-bold">${product.name}</h2>
      <p class="text-yellow-600 font-bold text-xl mt-2 mb-4">₹${product.price}</p>
      <p class="text-gray-700 mb-6">${product.description}</p>
      <button class="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded" onclick="addToCart(${product.id})">
        Add to Cart
      </button>
    `;

    modal.classList.remove("hidden");
    setTimeout(() => modalContent.classList.add("scale-100", "opacity-100"), 10);
  }

  // Close modal on click outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modalContent.classList.remove("scale-100", "opacity-100");
      setTimeout(() => modal.classList.add("hidden"), 300);
    }
  });

  window.addToCart = function(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    const product = products.find(p => p.id == id);
    if (!product) return;

    if (cart[id]) {
      cart[id].quantity += 1;
    } else {
      cart[id] = { ...product, quantity: 1 };
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  renderShopProducts();
});
