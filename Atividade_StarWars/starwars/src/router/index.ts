import { createRouter, createWebHistory } from 'vue-router';
import HomeCharacter from '@/views/HomeCharacter.vue';
import FavoriteCharacters from '@/views/FavoriteCharacters.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: HomeCharacter,  
      path: '/',
      name: 'HomeCharacter'
    },
    {
      component: FavoriteCharacters,
      path: '/FavoriteCharacters',
      name: 'FavoriteCharacters'
    },
    {
      component: NotFoundPage,
      path: '/:pathMatch(.*)*',  
    }
  ],
});

export default router;
