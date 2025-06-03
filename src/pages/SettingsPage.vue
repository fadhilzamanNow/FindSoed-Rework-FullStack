<script setup lang="ts">
import Navbar from "../components/LandingPage/Navbar.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import SettingsBox from "../components/SettingPage/SettingsBox.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";
import { useSeoMeta } from "@unhead/vue";
import { watch } from "vue";

useSeoMeta({
  title: "SSR RSbuild Setting Page - Findsoed Rework",
  description:
    "SSR Rsbuild Halaman Setting Page untuk Findsoed Rework yang dapat digunakan untuk mengatur profil dan history barang pengguna",
  ogTitle: "SSR Rsbuild Home Page - Findsoed Rework",
  ogDescription:
    "SSR Rsbuild Halaman Setting Page untuk Findsoed Rework yang dapat digunakan untuk mengatur profil dan history barang pengguna",
  ogUrl: "http://localhost:3500/setting",
  ogSiteName: "Findsoed Rework",
  ogType: "website",
  author: "Muhammad Ilham Isfadhillah",
  twitterTitle: "SSR Rsbuild Setting Page - Findsoed Rework",
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
  <div class="flex relative h-screen">
    <Navbar />
    <Sidebar active="Home" />
    <SettingsBox />
  </div>
</template>
