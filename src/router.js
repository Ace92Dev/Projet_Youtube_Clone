import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import ConnexionPage from './pages/ConnexionPage.vue';
import InscriptionPage from './pages/InscriptionPage.vue';
import MonProfilPage from './pages/MonProfilPage.vue';
import MesVideosPage from './pages/MesVideosPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: ConnexionPage,
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: InscriptionPage,
  },
  {
    path: '/profil',
    name: 'profil',
    component: MonProfilPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/mes-videos',
    name: 'mes-videos',
    component: MesVideosPage,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = localStorage.getItem('user');
    if (!user || JSON.parse(user).isGuest) {
      next({ name: 'connexion' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;