import { createRouter, createWebHistory } from 'vue-router'
import Favorite from '@/views/FavoriteCaracters.vue'
import Management from '@/views/ManegementCaracters.vue'
import Notfound from '@/views/Notfound.vue'
import FavoriteCaracters from '@/views/FavoriteCaracters.vue'
import ManegementCaracters from '@/views/ManegementCaracters.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL || '/'),
    routes: [    
      {
        component: FavoriteCaracters,
        path: '/',
        name: 'favoriteCaracters'
      },
      {
        component: ManegementCaracters,
        path: '/managementcaracters',
        name: 'management'
      },
      {
        component: Notfound,
        path: '/:pathMatch(.*)*'
      }
    ],
  })
  
  export default router