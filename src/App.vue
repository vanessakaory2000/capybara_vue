<script setup>
import { RouterView } from "vue-router";
import Header from "/src/components/Header.vue";
</script>

<template>
  <div class="bg-blue-200/25">
    <Header />
    <RouterView />
  </div>
</template>
