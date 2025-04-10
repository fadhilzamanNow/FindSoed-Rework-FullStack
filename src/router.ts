import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
import Loading from "./Loading/Loading.vue";
import Error from "./Loading/Error.vue";
/* import HomePage from "./pages/HomePage.vue"; */
/* import LoginPage from "./pages/LoginPage.vue";
import RegisterPage from "./pages/RegisterPage.vue"; */
/* import ListPage from "./pages/ListPage.vue";
import AddPage from "./pages/AddPage.vue";
import SettingsPage from "./pages/SettingsPage.vue";
import DetailItemPage from "./pages/DetailItemPage.vue"; */




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

/* const LazyListPage = defineAsyncComponent({
    loader : () => import("./pages/ListPage.vue"),
    loadingComponent : Loading,
    errorComponent : Error
})

const LazyAddPage = defineAsyncComponent({
    loader : () => import("./pages/AddPage.vue"),
    loadingComponent : Loading,
    errorComponent : Error
}) */

const LazySettingPage = defineAsyncComponent({
    loader : () => import("./pages/SettingsPage.vue"),
    loadingComponent : Loading,
    errorComponent : Error
})

/* const LazyDetailPage = defineAsyncComponent({
    loader : () => import("./pages/DetailItemPage.vue"),
    loadingComponent : Loading,
    errorComponent : Error
}) */


const routes = [
    {path : "/", component : LazyHomePage},
    {path : "/login", component : LazyLoginPage},
    {path : "/register", component : LazyRegisterPage},
    /* {path : "/list", component : LazyListPage},
    {path : "/add", component : LazyAddPage}, */
    {path : "/setting", component : LazySettingPage},
    /* {path : "/detail/:id", component : LazyDetailPage}, */
   /*  {path : "/", component : HomePage},
    {path : "/login", component : LoginPage},
    {path : "/register", component : RegisterPage},
    {path : "/list", component : ListPage},
    {path : "/add", component : AddPage},
    {path : "/setting", component : SettingsPage},
    {path : "/detail/:id", component : DetailItemPage} */
]

export const router = createRouter({
    history : createWebHistory(),
    routes : routes
})