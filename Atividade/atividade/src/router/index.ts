import { createRouter, createWebHistory } from 'vue-router';
import Character from '@/views/Character.vue';
import Management from '@/views/Management.vue';
import NotFound from '@/views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: Character,  // A palavra "component" é correta aqui
      path: '/',
      name: 'character'
    },
    {
      component: Management,
      path: '/management',
      name: 'management'
    },
    {
      component: NotFound,
      path: '/:pathMatch(.*)*',  // Rota de "404 - Not Found"
    }
  ],
});

export default router;
