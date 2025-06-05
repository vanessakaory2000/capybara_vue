<template>
  <router-link
    :to="`/product/${product.id}`"
    class="block sm:max-w-sm bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
  >
    <img
      :src="product.thumbnail || product.images[0]"
      :alt="product.title"
      class="w-full h-48 object-contain sm:object-cover"
    />

    <div class="p-4 flex-1 flex flex-col justify-between">
      <div class="flex-1 flex flex-col">
        <div class="text-xs uppercase text-gray-400 mb-1">
          {{ product.category }}
        </div>

        <h2 class="text-lg font-semibold text-gray-800 mb-2">
          {{ product.title }}
        </h2>
      </div>

      <div class="flex items-center mb-3">
        <template v-for="star in 5" :key="star">
          <i
            class="fa-star"
            :class="[
              'fa-solid',
              star <= Math.floor(product.rating)
                ? 'text-yellow-400'
                : 'text-gray-300',
            ]"
          ></i>
        </template>
        <span class="ml-2 text-gray-600 text-sm translate-y-[2px]">
          {{ product.rating.toFixed(1) }}
        </span>
      </div>

      <div class="flex flex-wrap gap-1 mb-3">
        <span
          v-for="tag in product.tags"
          :key="tag"
          class="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded"
          >{{ tag }}</span
        >
      </div>

      <div class="text-sm text-gray-600 mb-1">
        <strong>Stock:</strong> {{ product.stock }} | 
        <strong>{{ product.stock ? "Avalaible" : "Unavailable" }}</strong>
      </div>
      <div class="text-lg font-semibold text-green-700">
        $ {{ product.price.toFixed(2) }}
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  product: Object,
});
</script>
