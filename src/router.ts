import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
import Loading from "./Loading/Loading.vue";
import Error from "./Loading/Error.vue";


const LazyHomePage = defineAsyncComponent({
    loader : () => import("./pages/HomePage.vue"),
    loadingComponent : Loading,
    errorComponent : Error
})

const LazyLoginPage = defineAsyncComponent({
    loader : () => import("./pages/LoginPage.vue"),
    loadingComponent : Loading,
    errorComponent : Error
})

const LazyRegisterPage = defineAsyncComponent({
    loader : () => import("./pages/RegisterPage.vue"),
    loadingComponent : Loading,
    errorComponent : Error
})


const routes = [
    {path : "/", component : LazyHomePage},
    {path : "/login", component : LazyLoginPage},
    {path : "/register", component : LazyRegisterPage}
]

export const router = createRouter({
    history : createWebHistory(),
    routes : routes
})