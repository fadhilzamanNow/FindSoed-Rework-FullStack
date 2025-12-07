<script setup lang="ts">
import LoginBox from "../components/LoginPage/LoginBox.vue";
import { ref, watchEffect } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useSeoMeta } from "@unhead/vue";
import Navbar from "../components/LandingPage/Navbar.vue";
import Footer from "../components/LandingPage/Footer.vue";
import { LoadingOutlined } from "@ant-design/icons-vue";

useSeoMeta({
  title: "Login - FindSoed",
  description: "Masuk ke akun FindSoed untuk melaporkan dan mencari barang hilang",
  ogTitle: "Login - FindSoed",
  ogDescription: "Masuk ke akun FindSoed untuk melaporkan dan mencari barang hilang",
  ogUrl: "http://localhost:3500/login",
  ogSiteName: "FindSoed",
  ogType: "website",
  author: "Muhammad Ilham Isfadhillah",
  twitterTitle: "Login - FindSoed",
  robots: "index, follow",
});

const auth = useAuthStore();
const { authToken } = storeToRefs(auth);
const loginLoading = ref(false);
const navigate = useRouter();

const toggleLoading = () => {
  loginLoading.value = !loginLoading.value;
};

watchEffect(() => {
  if (authToken.value) {
    navigate.push("/home");
  }
});
</script>

<template>
  <div>
    <!-- Main section - full viewport -->
    <div class="h-screen flex flex-col bg-gradient-to-br from-blue-50 to-slate-100">
      <Navbar />
      <div class="flex-1 flex items-center justify-center">
        <LoginBox @toggle-loading="toggleLoading" />
      </div>
    </div>
    
    <!-- Footer below -->
    <Footer />
    
    <!-- Loading Overlay -->
    <div
      v-if="loginLoading"
      class="fixed inset-0 flex justify-center items-center bg-black/30 z-50"
    >
      <LoadingOutlined class="text-5xl text-blue-600" />
    </div>
  </div>
</template>
