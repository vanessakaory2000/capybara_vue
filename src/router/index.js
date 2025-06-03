import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetails from '@/views/ProductDetails.vue'
import Cart from '@/views/CartView.vue'; 
import Favorite from '@/views/FavoriteView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/product/:id',
      name: 'product_details',
      component: ProductDetails,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    }, 
    {
      path: '/favorite',
      name: 'favorite',
      component: Favorite,
    }
  ],
})

export default router
