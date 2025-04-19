import { createRouter, createWebHistory } from 'vue-router';
import Character from '@/views/Character.vue';
import FavoriteCharacters from '@/views/FavoriteCharacters.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: Character,  
      path: '/',
      name: 'character'
    },
    {
      component: FavoriteCharacters,
      path: '/FavoriteCharacters',
      name: 'favoritecharacters'
    },
    {
      component: NotFoundPage,
      path: '/:pathMatch(.*)*',  
    }
  ],
});

export default router;
