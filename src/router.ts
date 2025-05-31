import {
    createRouter as createVueRouter,
    createMemoryHistory,
    createWebHistory,
  } from "vue-router";


/* import LoginPage from "./pages/LoginPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import ListPage from "./pages/ListPage.vue";
import AddPage from "./pages/AddPage.vue";
import SettingsPage from "./pages/SettingsPage.vue";
import DetailItemPage from "./pages/DetailItemPage.vue";
import LandingPage from "./pages/LandingPage.vue"; */
import { defineAsyncComponent } from "vue";

  const LazyLandingPage = defineAsyncComponent(() => import("./pages/LandingPage.vue"))
  const LazyLoginPage = defineAsyncComponent(() => import("./pages/LoginPage.vue"))
  const LazyRegisterPage = defineAsyncComponent(() => import("./pages/RegisterPage.vue"))
  const LazyListPage = defineAsyncComponent(() => import("./pages/ListPage.vue"))
  const LazyAddPage = defineAsyncComponent(() => import("./pages/AddPage.vue"))
  const LazySettingPage =defineAsyncComponent(() => import("./pages/SettingsPage.vue"))
  const LazyDetailPage = defineAsyncComponent(() => import("./pages/DetailItemPage.vue"))
  

  const routes = [
    {
      path : "/",
      name : "landing",
      component : LazyLandingPage
    },
    {
      path: "/login",
      name: "login",
      component: LazyLoginPage,
    },
    {
      path: "/register",
      name: "about",
      component: LazyRegisterPage,
    },
    {
      path: "/home",
      name: "list",
      component: LazyListPage,
    },
    {
      path : "/add",
      name : "add",
      component : LazyAddPage
    },
    {
      path : "/setting",
      name : "setting",
      component : LazySettingPage
    },
    {
      path : "/detail/:id",
      name : "detail",
      component : LazyDetailPage
    }
    
  ];

  console.log("typeof window : ", typeof window)
  
  const isServer = typeof window === "undefined";
  

  const createRouter = () =>
    createVueRouter({
      history: isServer
        ? createMemoryHistory("/")
        : createWebHistory(process.env.BASE_URL),
      routes,
    });
  export default createRouter;