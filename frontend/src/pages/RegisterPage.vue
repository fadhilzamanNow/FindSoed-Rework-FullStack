<script setup lang="ts">
import RegisterBox from "../components/RegisterPage/RegisterBox.vue";
import Navbar from "../components/LandingPage/Navbar.vue";
import Footer from "../components/LandingPage/Footer.vue";
import { ref, watchEffect } from "vue";
import { useAuthStore } from "../stores/authStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { useSeoMeta } from "@unhead/vue";

useSeoMeta({
  title: "Daftar - FindSoed",
  description: "Daftar akun FindSoed untuk mulai melaporkan dan mencari barang hilang",
  ogTitle: "Daftar - FindSoed",
  ogDescription: "Daftar akun FindSoed untuk mulai melaporkan dan mencari barang hilang",
  ogUrl: "http://localhost:3500/register",
  ogSiteName: "FindSoed",
  ogType: "website",
  author: "Muhammad Ilham Isfadhillah",
  twitterTitle: "Daftar - FindSoed",
  robots: "index, follow",
});

const auth = useAuthStore();
const { authToken } = storeToRefs(auth);
const navigate = useRouter();
const registerLoading = ref(false);

watchEffect(() => {
  if (authToken.value) {
    navigate.push("/home");
  }
});

const handleLoading = () => {
  registerLoading.value = !registerLoading.value;
};
</script>

<template>
  <div>
    <!-- Main section - full viewport -->
    <div class="h-screen flex flex-col bg-gradient-to-br from-blue-50 to-slate-100">
      <Navbar />
      <div class="flex-1 flex items-center justify-center">
        <RegisterBox @toggle-loading="handleLoading" />
      </div>
    </div>

    <!-- Footer below -->
    <Footer />

    <!-- Loading Overlay -->
    <div
      v-if="registerLoading"
      class="fixed inset-0 flex justify-center items-center bg-black/30 z-50"
    >
      <LoadingOutlined class="text-5xl text-blue-600" />
    </div>
  </div>
</template>
