document.addEventListener("DOMContentLoaded", () => {
  const topProductsContainer = document.getElementById("top-products");
  const cartCountElem = document.getElementById("cart-count");

  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  function updateCartCount() {
    const count = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
    if (cartCountElem) cartCountElem.textContent = count;
  }

  updateCartCount();

  function renderTopProducts() {
    const topProducts = products.slice(0, 4); // Top 4 products
    topProductsContainer.innerHTML = "";

    topProducts.forEach(product => {
      const card = document.createElement("div");
      card.className = "bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded mb-4">
        <h3 class="text-xl font-semibold">${product.name}</h3>
        <p class="text-yellow-600 font-bold mt-1 mb-2">₹${product.price}</p>
        <p class="text-gray-600 mb-4 flex-grow">${product.description}</p>
        <button class="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded enquiry-btn" data-id="${product.id}">
          Reserve This Piece
        </button>
      `;

      topProductsContainer.appendChild(card);
    });

    document.querySelectorAll(".enquiry-btn").forEach(button => {
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
          <a href="https://wa.me/919198886977?text=Hi%2C%20I'm%20interested%20in%20${encodeURIComponent(product.name)}" target="_blank" class="bg-green-500 text-white py-2 px-4 rounded text-center hover:bg-green-600">Message on WhatsApp</a>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector(".close-modal").addEventListener("click", () => {
      modal.remove();
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  renderTopProducts();
});
