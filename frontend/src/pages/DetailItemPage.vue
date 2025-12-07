<script setup lang="ts">
import Sidebar from "../components/Sidebar/Sidebar.vue";
import PrivateNavbar from "../components/Navbar/PrivateNavbar.vue";
import { watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import DetailItem from "../components/DetailPage/DetailItem.vue";
import { useSeoMeta } from "@unhead/vue";

useSeoMeta({
  title: "Detail Barang - FindSoed",
  description: "Lihat detail barang hilang",
  ogTitle: "Detail Barang - FindSoed",
  ogDescription: "Lihat detail barang hilang",
  ogUrl: "http://localhost:3500/detail",
  ogSiteName: "FindSoed",
  ogType: "website",
  author: "Muhammad Ilham Isfadhillah",
  twitterTitle: "Detail Barang - FindSoed",
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
</script>

<template>
  <div class="min-h-screen w-full overflow-hidden">
    <PrivateNavbar />
    <Sidebar />
    <DetailItem />
  </div>
</template>
