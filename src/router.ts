import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
import Loading from "./Loading/Loading.vue";
import Error from "./Loading/Error.vue";

const LazyHomePage = defineAsyncComponent({
    loader : () => import("./pages/HomePage.vue"),
    loadingComponent : Loading,
    errorComponent : Error
})

const LazySecond = defineAsyncComponent({
    loader : () => import("./pages/Second.vue"),
    loadingComponent : Loading,
    errorComponent : Error
})

const LazyThird = defineAsyncComponent({
    loader : () => import("./pages/Third.vue"),
    loadingComponent : Loading,
    errorComponent : Error
})

const routes = [
    {path : "/", component : LazyHomePage},
    {path : "/second", component : LazySecond},
    {path : "/third", component : LazyThird}
]

export const router = createRouter({
    history : createWebHistory(),
    routes : routes
})