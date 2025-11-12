// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ProjectPage from '@/views/ProjectPage.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage },
    {
        path: '/projects/:slug',
        name: 'project',
        component: ProjectPage,
        props: true },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/AboutPage.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
