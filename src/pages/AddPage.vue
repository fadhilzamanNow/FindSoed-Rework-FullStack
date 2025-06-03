<script setup lang="ts">
import Navbar from "../components/LandingPage/Navbar.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import AddBox from "../components/AddPage/AddBox.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
import { useSeoMeta } from "@unhead/vue";
import { watch } from "vue";

useSeoMeta({
  title: "SSR RSbuild Add Page - Findsoed Rework",
  description:
    "SSR Rsbuild Halaman Add Page untuk Findsoed Rework yang dapat digunakan untuk menambahkan barang hilang",
  ogTitle: "SSR Rsbuild Home Page - Findsoed Rework",
  ogDescription:
    "SSR Rsbuild Halaman Add Page untuk Findsoed Rework yang dapat digunakan untuk menambahkan barang hilang",
  ogUrl: "http://localhost:3500/add",
  ogSiteName: "Findsoed Rework",
  ogType: "website",
  author: "Muhammad Ilham Isfadhillah",
  twitterTitle: "SSR Rsbuild Add Page - Findsoed Rework",
  robots: "index, follow",
});

const auth = useAuthStore();
const { authToken } = storeToRefs(auth);
const navigate = useRouter();

watch(
  [authToken.value, navigate],
  () => {
    if (authToken.value && localStorage.getItem("authToken")) {
      const myToken = jwtDecode(authToken.value);
      if (Number(Date.now() / 1000) > Number(myToken.exp)) {
        localStorage.removeItem("authToken");
        auth.setAuthToken(null);
        navigate.push("/login");
      }
    } else {
      auth.setAuthToken(null);
      navigate.push("/login");
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="min-h-screen w-full">
    <Navbar />
    <Sidebar active="Add" />
    <AddBox />
  </div>
</template>
