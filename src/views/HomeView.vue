<template>
  <div class="bg-gray-50">
    <Navbar
      :categories="categories"
      @update:search="onSearch"
      @update:sort="onSort"
      @update:category="onCategory"
    />
  </div>

  <main class="bg-gray-50 min-h-screen py-10 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
      </div>

      <div class="flex justify-center mt-12 space-x-4">
        <button
          @click="previousPage"
          :disabled="offset === 0"
          class="px-6 py-2 bg-green-400 hover:bg-green-500 text-white font-semibold rounded-lg shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <button
          @click="nextPage"
          :disabled="offset + limit >= total"
          class="px-6 py-2 bg-green-400 hover:bg-green-500 text-white font-semibold rounded-lg shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";
import Navbar from "../components/Navbar.vue";

const products = ref([]);
const filteredProducts = ref([]);
const offset = ref(0);
const limit = 12;
const total = ref(0);

const searchQuery = ref("");
const sortOrder = ref("");
const selectedCategory = ref("");

const categories = ref([]);

const fetchCategories = async () => {
  const res = await axios.get('https://dummyjson.com/products/categories');
  if (Array.isArray(res.data)) {
    categories.value = res.data.map(slug => ({
      slug,
      name,
      url: `https://dummyjson.com/products/category/${slug}`
    }));
  }
};

const fetchProducts = async () => {
  let url = "";

  if (selectedCategory.value) {
    url = `https://dummyjson.com/products/category/${encodeURIComponent(selectedCategory.value)}?limit=${limit}&skip=${offset.value}`;
  } else if (searchQuery.value.trim() !== "") {
    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery.value)}&limit=${limit}&skip=${offset.value}`;
  } else {
    url = `https://dummyjson.com/products?limit=${limit}&skip=${offset.value}`;
  }

  const response = await axios.get(url);
  products.value = response.data.products;
  total.value = response.data.total;

  applyFilters();
};

const applyFilters = () => {
  let temp = [...products.value];

  if (selectedCategory.value) {
    temp = temp.filter(p => p.category.toLowerCase() === selectedCategory.value.toLowerCase());
  }

  if (searchQuery.value.trim() !== "") {
    const q = searchQuery.value.toLowerCase();
    temp = temp.filter(p => p.title.toLowerCase().includes(q));
  }

  if (sortOrder.value === "price-asc") {
    temp.sort((a, b) => a.price - b.price);
  } else if (sortOrder.value === "price-desc") {
    temp.sort((a, b) => b.price - a.price);
  } else if (sortOrder.value === "name-asc") {
    temp.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOrder.value === "name-desc") {
    temp.sort((a, b) => b.title.localeCompare(a.title));
  }

  filteredProducts.value = temp;
};

const nextPage = () => {
  if (offset.value + limit < total.value) {
    offset.value += limit;
    fetchProducts();
  }
};

const previousPage = () => {
  if (offset.value >= limit) {
    offset.value -= limit;
    fetchProducts();
  }
};

const onSearch = (val) => {
  searchQuery.value = val;
  offset.value = 0;
  fetchProducts();
};

const onSort = (val) => {
  sortOrder.value = val;
  fetchProducts();
};

const onCategory = (val) => {
  selectedCategory.value = val;
  offset.value = 0;
  fetchProducts();
};

onMounted(() => {
  fetchCategories();
  fetchProducts();
});
</script>
