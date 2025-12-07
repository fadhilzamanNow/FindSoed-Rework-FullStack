<script setup lang="ts">
import Sidebar from "../components/Sidebar/Sidebar.vue";
import PrivateNavbar from "../components/Navbar/PrivateNavbar.vue";
import AddBox from "../components/AddPage/AddBox.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import { useSeoMeta } from "@unhead/vue";
import { watchEffect, onMounted } from "vue";

useSeoMeta({
  title: "Tambah Barang - FindSoed",
  description: "Laporkan barang hilang",
  ogTitle: "Tambah Barang - FindSoed",
  ogDescription: "Laporkan barang hilang",
  ogUrl: "http://localhost:3500/add",
  ogSiteName: "FindSoed",
  ogType: "website",
  author: "Muhammad Ilham Isfadhillah",
  twitterTitle: "Tambah Barang - FindSoed",
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
  <div class="min-h-screen w-full overflow-auto">
    <PrivateNavbar />
    <Sidebar />
    <AddBox />
  </div>
</template>
