<template>
  <section
    class="bg-white p-4 shadow-sm border-b border-gray-200 flex flex-col md:flex-row items-center gap-4 max-w-7xl mx-auto"
  >
    <input
      type="text"
      placeholder="Search products..."
      v-model="searchQuery"
      class="w-full md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
    />

    <select
      v-model="selectedCategory"
      @change="onCategoryChange"
      class="w-full md:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      <option value="">Select Category</option>
      <option v-if="loadingCategories" disabled>Loading Categories...</option>
      <option
        v-for="category in categories"
        :key="category.slug"
        :value="category.slug"
      >
        {{ category.name }}
      </option>
    </select>

    <select
      v-model="sortOrder"
      @change="onSortChange"
      class="w-full md:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      <option value="">Sort by</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="name-asc">Name: A-Z</option>
      <option value="name-desc">Name: Z-A</option>
    </select>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";

const searchQuery = ref("");
const sortOrder = ref("");
const selectedCategory = ref("");
const categories = ref([]);
const loadingCategories = ref(true);

const emit = defineEmits(["update:search", "update:sort", "update:category"]);

const fetchCategories = async () => {
  loadingCategories.value = true;
  try {
    const res = await axios.get("https://dummyjson.com/products/categories");
    if (Array.isArray(res.data) && typeof res.data[0] === "string") {
      categories.value = res.data.map((slug) => ({
        slug,
        name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
        url: `https://dummyjson.com/products/category/${slug}`,
      }));
    } else {
      categories.value = res.data;
    }
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
  } finally {
    loadingCategories.value = false;
  }
};

onMounted(fetchCategories);

const onCategoryChange = () => {
  emit("update:category", selectedCategory.value);
};

watch(searchQuery, (val) => emit("update:search", val));

watch(sortOrder, (val) => emit("update:sort", val));

const onSortChange = () => {
  emit("update:sort", sortOrder.value);
};
</script>
