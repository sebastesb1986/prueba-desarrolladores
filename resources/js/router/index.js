import { createRouter, createWebHistory } from 'vue-router';
import UserView from '../views/user/UserView.vue';

const routes = [

    {
        path: '/',
        name: 'userlist',
        component: UserView,
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

export default router;
