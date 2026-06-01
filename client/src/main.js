import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import 'notyf/notyf.min.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

//Pages
import ErrorPage from './pages/ErrorPage.vue';
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
import LogoutPage from './pages/LogoutPage.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: HomePage
		},
		{
			path: '/login',
			name: 'Login',
			component: LoginPage
		},
		{
			path: '/register',
			name: 'Register',
			component: RegisterPage
		},
		{
			path: '/logout',
			name: 'Logout',
			component: LogoutPage
		},
		{
			path: '/:catchAll(.*)',
			name: 'NotFound',
			component: ErrorPage
		}
	]
});

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
