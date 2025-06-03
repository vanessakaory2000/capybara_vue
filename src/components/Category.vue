<template>
  <div class="bg-white p-4 shadow rounded-md">
    <label for="category" class="block text-sm font-medium text-gray-700"
      >Categoria</label
    >
    <select
      id="category"
      v-model="selectedCategory"
      @change="onCategoryChange"
      class="w-full p-2 mt-2 border rounded-md"
    >
      <option value="">Todos</option>
      <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">
        {{ cat.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:category"]);
const selectedCategory = ref("");

const onCategoryChange = () => {
  emit("update:category", selectedCategory.value);
};
</script>
