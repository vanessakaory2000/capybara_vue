<template>
  <header class="w-full h-28 bg-green-300/50">
    <div class="container mx-auto h-full flex items-center justify-between">
      <router-link to="/" class="text-5xl font-bold text-yellow-700">
        Capybara
      </router-link>

      <div class="flex gap-4 text-yellow-900">
        <router-link to="/favorite" class="flex items-center gap-2">
          <i class="fas fa-heart text-2xl"></i>
        </router-link>

        <router-link to="/cart" class="flex items-center gap-2">
          <i class="fas fa-shopping-cart text-2xl"></i>
        </router-link>
      </div>
    </div>
  </header>
</template>
