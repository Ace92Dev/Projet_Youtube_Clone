import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import VideoPage from './pages/VideoPage.vue';  

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/', 
      component: HomePage
    },
    {
      path: '/video/:id', // Route dynamique pour les détails de la vidéo
      component: VideoPage
    }
  ]
});

export default router;