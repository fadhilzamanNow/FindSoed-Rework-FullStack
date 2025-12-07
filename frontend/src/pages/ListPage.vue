<script setup lang="ts">
import { onMounted } from "vue";
import ListBox from "../components/ListPage/ListBox.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import PrivateNavbar from "../components/Navbar/PrivateNavbar.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import { useSeoMeta } from "@unhead/vue";
import { watchEffect } from "vue";

useSeoMeta({
  title: "Home - FindSoed",
  description: "Lihat seluruh barang hilang yang tersedia",
  ogTitle: "Home - FindSoed",
  ogDescription: "Lihat seluruh barang hilang yang tersedia",
  ogUrl: "http://localhost:3500/home",
  ogSiteName: "FindSoed",
  ogType: "website",
  author: "Muhammad Ilham Isfadhillah",
  twitterTitle: "Home - FindSoed",
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
  <div class="min-h-screen bg-gray-50">
    <PrivateNavbar />
    <Sidebar />
    <ListBox />
  </div>
</template>
