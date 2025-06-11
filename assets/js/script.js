document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products-container");
  const cartCountElem = document.getElementById("cart-count");

  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  function updateCartCount() {
    const count = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
    if (cartCountElem) cartCountElem.textContent = count;
  }

  updateCartCount();

  function renderProducts() {
    productsContainer.innerHTML = "";

    products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.className = "bg-white p-4 rounded-lg shadow hover:shadow-xl transition flex flex-col";

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded mb-4" />
        <h3 class="text-lg font-semibold mb-1">${product.name}</h3>
        <p class="text-yellow-500 font-bold mb-2">₹${product.price}</p>
        <p class="text-gray-600 flex-grow">${product.description}</p>
        <button class="mt-4 bg-pink-400 text-black font-semibold rounded py-2 hover:bg-green-600 transition reserve-btn" data-id="${product.id}">
          Reserve This Piece
        </button>
      `;

      productsContainer.appendChild(productCard);
    });

    document.querySelectorAll(".reserve-btn").forEach(button => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-id");
        const product = products.find(p => p.id == productId);
        showEnquiryModal(product);
      });
    });
  }

  function showEnquiryModal(product) {
    const modal = document.createElement("div");
    modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    modal.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative animate-fadeIn">
        <button class="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl close-modal">&times;</button>
        <h2 class="text-xl font-bold mb-2">Enquiry for: ${product.name}</h2>
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded mb-4">
        <p class="mb-2 text-gray-700">${product.description}</p>
        <p class="text-sm mb-4 text-gray-600">To reserve or ask about this piece:</p>
        <div class="flex flex-col gap-2">
          <a href="tel:+919198886977" class="bg-blue-500 text-white py-2 px-4 rounded text-center hover:bg-blue-600">Call Now</a>
          <a href="https://wa.me/919198886977" target="_blank" class="bg-green-500 text-white py-2 px-4 rounded text-center hover:bg-green-600">Message on WhatsApp</a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".close-modal").addEventListener("click", () => {
      modal.remove();
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  renderProducts();
});
