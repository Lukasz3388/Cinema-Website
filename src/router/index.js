import { createRouter, createWebHistory } from 'vue-router';
import AppLogin from '@/components/LoginPage.vue';
import AppHome from '@/components/MainPage.vue';
import AppRegister from '@/components/RegisterPage.vue';
import AppRenewPass from '@/components/RenewPasswordPage.vue';
import AppStorage from '@/components/StoragePage.vue';
import LogoutPage from '@/components/LogoutPage.vue';
import ProfilePage from "@/components/ProfilePage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: AppHome},
        {path: '/login', component: AppLogin},
        {path: '/register', component: AppRegister},
        {path: '/renew', component: AppRenewPass},
        //{path: '/storage', component: AppStorage},
        { path: '/logout', component: LogoutPage },
        { path: '/profile', component: ProfilePage },
        {path: '/:notFound(.*)', redirect: '/'}
    ]
});
export default router;