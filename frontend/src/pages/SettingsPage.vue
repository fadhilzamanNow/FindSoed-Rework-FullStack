<script setup lang="ts">
import Sidebar from "../components/Sidebar/Sidebar.vue";
import PrivateNavbar from "../components/Navbar/PrivateNavbar.vue";
import SettingsBox from "../components/SettingPage/SettingsBox.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import { useSeoMeta } from "@unhead/vue";
import { onMounted, watchEffect } from "vue";

useSeoMeta({
  title: "Settings - FindSoed",
  description: "Atur profil dan history barang",
  ogTitle: "Settings - FindSoed",
  ogDescription: "Atur profil dan history barang",
  ogUrl: "http://localhost:3500/setting",
  ogSiteName: "FindSoed",
  ogType: "website",
  author: "Muhammad Ilham Isfadhillah",
  twitterTitle: "Settings - FindSoed",
  robots: "index, follow",
});

const auth = useAuthStore();
const { authToken } = storeToRefs(auth);
const navigate = useRouter();

watchEffect(() => {
  if (!authToken.value) {
    navigate.push("/login");
  }
});

onMounted(() => {
  window.scroll(0, 0);
});
</script>

<template>
  <div class="min-h-screen overflow-auto w-full">
    <PrivateNavbar />
    <Sidebar />
    <SettingsBox />
  </div>
</template>
