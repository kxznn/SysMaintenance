import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'dashboard', component: () => import('../views/dashboard.vue') },
  { path: '/calendar', name: 'dalendar', component: () => import('../views/calendar.vue') },
  { path: '/list', name: 'daintenanceLsit', component: () => import('../views/maintenanceList.vue') },
  { path: '/list/:id', name: 'maintenanceSearch', component: () => import('../views/maintenanceSearch.vue'), props: true },
  { path: '/register', name: 'Register', component: () => import('../views/Register.vue') 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;