const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (!productId) {
  document.body.innerHTML = "<h1 class='text-center mt-20 text-red-600'>No product specified.</h1>";
} else {
  const product = products.find(p => p.id === productId);

  if (!product) {
    document.body.innerHTML = "<h1 class='text-center mt-20 text-red-600'>Product not found.</h1>";
  } else {
    document.body.innerHTML = `
      <nav class="bg-gray-900 text-white p-4 flex justify-between items-center">
        <a href="index.html" class="text-2xl font-bold">ShopZone</a>
        <ul class="flex space-x-6">
          <li><a href="index.html" class="hover:text-yellow-400">Home</a></li>
          <li><a href="shop.html" class="hover:text-yellow-400">Shop</a></li>
          <li><a href="cart.html" class="hover:text-yellow-400">Cart</a></li>
          <li><a href="auth.html" class="hover:text-yellow-400">Login</a></li>
        </ul>
      </nav>

      <section class="max-w-5xl mx-auto my-12 p-4 flex flex-col md:flex-row gap-8">
        <img src="${product.image}" alt="${product.name}" class="w-full md:w-1/2 rounded shadow">
        <div class="flex flex-col justify-between w-full md:w-1/2">
          <div>
            <h1 class="text-4xl font-bold mb-4">${product.name}</h1>
            <p class="text-yellow-500 font-bold text-2xl mb-4">₹${product.price}</p>
            <p class="text-gray-700 mb-8">${product.description}</p>
          </div>
          <button id="addToCartBtn" class="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded font-semibold">
            Add to Cart
          </button>
        </div>
      </section>

      <footer class="bg-gray-900 text-white text-center py-6 mt-12">
        <p>&copy; 2025 ShopZone. All rights reserved.</p>
      </footer>
    `;

    document.getElementById('addToCartBtn').addEventListener('click', () => {
      alert(`Added "${product.name}" to cart!`);
      // Add cart logic here
    });
  }
}
