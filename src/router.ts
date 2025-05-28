import {
    createRouter as createVueRouter,
    createMemoryHistory,
    createWebHistory,
  } from "vue-router";


import LoginPage from "./pages/LoginPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import ListPage from "./pages/ListPage.vue";
import AddPage from "./pages/AddPage.vue";

  

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
    {
      path : "/add",
      name : "add",
      component : AddPage
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