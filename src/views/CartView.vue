<template>
  <div class="px-4 py-8 max-w-7xl mx-auto">
    <h2 class="text-3xl font-semibold text-center text-[#C27C53] mb-6">
      Shopping Cart
    </h2>

    <div v-if="cart.length === 0" class="text-center mt-12">
      <p class="text-lg text-gray-600">The cart is empty.</p>
    </div>

    <div v-else>
      <div
        v-for="item in cart"
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

        <div class="flex items-center gap-4">
          <button
            @click="decreaseQuantity(item)"
            class="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition"
          >
            -
          </button>
          <span class="font-semibold text-gray-700">{{ item.quantity }}</span>
          <button
            @click="increaseQuantity(item)"
            class="bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition"
          >
            +
          </button>
        </div>

        <button
          @click="removeItem(item)"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          Remove
        </button>
      </div>

      <div
        class="flex justify-between items-center bg-gray-100 p-4 rounded-lg mt-6 shadow-sm"
      >
        <span class="text-xl font-semibold text-gray-800">Total:</span>
        <p class="text-2xl font-bold text-green-600">{{ formattedTotal }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const cart = ref(JSON.parse(localStorage.getItem("cart")) || []);

const increaseQuantity = (item) => {
  item.quantity += 1;
  updateCart();
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity -= 1;
    updateCart();
  }
};

const removeItem = (item) => {
  const index = cart.value.indexOf(item);
  if (index !== -1) {
    cart.value.splice(index, 1);
    updateCart();
  }
};

const updateCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart.value));
};

const total = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const formattedTotal = computed(() => {
  return `$${total.value.toFixed(2)}`;
});
</script>
