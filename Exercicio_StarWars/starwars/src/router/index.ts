import { createRouter, createWebHistory } from 'vue-router'
import Notfound from '@/views/NotFound.vue'
import FavoriteCaracters from '@/views/FavoriteCaracters.vue'
import ManegementCaracters from '@/views/ManegementCaracters.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
  routes: [
    {
      component: FavoriteCaracters,
      path: '/',
      name: 'favoriteCaracters' // Nome correto
    },
    {
      component: ManegementCaracters,
      path: '/managementcaracters',
      name: 'management' // Nome correto
    },
    {
      component: Notfound,
      path: '/:pathMatch(.*)*'
    }
  ]
});

export default router;
