import { createRouter, createWebHistory } from 'vue-router';
import UserView from '../views/user/UserView.vue';

const routes = [

    {
        path: '/',
        name: 'userlist',
        component: UserView,
        meta: {
            title: 'Usuarios'
        }
    },

    {
        path: '/:catchAll(.*)',
        redirect: 'userList'
    }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Títulos de las vistas o rutas
router.beforeEach((to, from, next) => {
    // Obtén el título de la meta información de la ruta
    const title = to.meta.title || 'Mi Aplicación'; // 'Mi Aplicación' es el título por defecto
    document.title = title;
    next();
});

export default router;
