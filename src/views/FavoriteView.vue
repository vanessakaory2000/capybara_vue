<template>
  <div class="px-4 py-8 max-w-7xl mx-auto">
    <h2 class="text-3xl font-semibold text-center text-[#C27C53] mb-6">
      Favorites
    </h2>

    <div v-if="favorites.length === 0" class="text-center mt-12">
      <p class="text-lg text-gray-600">You have no favorites yet.</p>
    </div>

    <div v-else>
      <div
        v-for="item in favorites"
        :key="item.id"
        class="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4"
      >
        <div class="flex items-center gap-6">
          <router-link :to="`/product/${item.id}`">
            <img
              :src="item.thumbnail"
              alt="Product image"
              class="w-24 h-24 object-contain rounded-md cursor-pointer"
            />
          </router-link>
          <div>
            <h3 class="font-medium text-gray-800">{{ item.name }}</h3>
            <p class="text-sm text-gray-500">${{ item.price.toFixed(2) }}</p>
          </div>
        </div>

        <button
          @click="removeFromFavorites(item)"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const favorites = ref(JSON.parse(localStorage.getItem("favorites")) || []);

const removeFromFavorites = (item) => {
  const index = favorites.value.indexOf(item);
  if (index !== -1) {
    favorites.value.splice(index, 1);
    updateFavorites();
  }
};

const updateFavorites = () => {
  localStorage.setItem("favorites", JSON.stringify(favorites.value));
};
</script>
