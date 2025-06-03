<template>
  <div class="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
    <button
      @click="$router.back()"
      class="mb-8 px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition"
    >
      ← Back
    </button>

    <div v-if="loading" class="text-center text-gray-500 text-lg font-medium">
      Loading...
    </div>

    <div v-else-if="product" class="flex flex-col md:flex-row gap-12">
      <div class="md:w-1/2 flex justify-center items-center">
        <img
          :src="mainImage"
          alt="Product image"
          class="w-full max-w-md rounded-lg shadow-md object-contain"
        />
      </div>

      <div class="md:w-1/2 flex flex-col justify-start space-y-6">
        <h1 class="text-4xl font-extrabold text-gray-900">
          {{ product.title }}
        </h1>

        <p class="text-gray-700 text-lg leading-relaxed">
          {{ product.description }}
        </p>

        <div class="grid grid-cols-2 gap-4 text-gray-600 text-sm font-medium">
          <div>
            <span class="font-semibold text-gray-800">Brand:</span>
            {{ product.brand }}
          </div>
          <div>
            <span class="font-semibold text-gray-800">Category:</span>
            {{ product.category }}
          </div>
          <div>
            <span class="font-semibold text-gray-800">Stock:</span>
            {{ product.stock }}
          </div>
          <div>
            <span class="font-semibold text-gray-800">Discount:</span>
            {{ product.discountPercentage }}%
          </div>
          <div>
            <span class="font-semibold text-gray-800">Rating:</span>
            {{ product.rating }}
          </div>
        </div>

        <p class="text-3xl font-bold text-green-600">
          ${{ product.price.toFixed(2) }}
        </p>

        <button
          @click="addToCart"
          class="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition"
        >
          Add to Cart
        </button>

        <button
          @click="toggleFavorite"
          class="mt-4 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md transition"
        >
          {{ isFavorite ? "Remove from Favorites" : "Add to Favorite" }}
        </button>
      </div>
    </div>

    <div v-else class="text-center text-red-500 text-lg font-semibold">
      Product not found.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const product = ref(null);
const loading = ref(true);
const mainImage = ref("");
const isFavorite = ref(false);

const fetchProduct = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      `https://dummyjson.com/products/${route.params.id}`
    );
    product.value = response.data;
    mainImage.value = product.value.thumbnail || product.value.images[0];
    checkIfFavorite();
  } catch {
    product.value = null;
  } finally {
    loading.value = false;
  }
};

const addToCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((item) => item.id === product.value.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product.value, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Product added to the cart!");
};

const checkIfFavorite = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  isFavorite.value = favorites.some((fav) => fav.id === product.value.id);
};

const toggleFavorite = () => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const existingProduct = favorites.find(
    (item) => item.id === product.value.id
  );

  if (existingProduct) {
    favorites = favorites.filter((item) => item.id !== product.value.id);
    isFavorite.value = false;
  } else {
    favorites.push(product.value);
    isFavorite.value = true;
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

onMounted(fetchProduct);
</script>

<style scoped>
button {
  cursor: pointer;
}
</style>
