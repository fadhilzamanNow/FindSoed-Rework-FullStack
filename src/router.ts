import {
    createRouter as createVueRouter,
    createMemoryHistory,
    createWebHistory,
  } from "vue-router";


import LoginPage from "./pages/LoginPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import ListPage from "./pages/ListPage.vue";

  

  const routes = [
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "about",
      component: RegisterPage,
    },
    {
      path: "/home",
      name: "list",
      component: ListPage,
    },
    
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