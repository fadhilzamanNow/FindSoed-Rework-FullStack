<script setup lang="ts">
import { onMounted, watchEffect } from "vue";
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/authStore";
import { findUserInfo } from "./api/Auth/Auth";
import { storeToRefs } from "pinia";
import { useHead } from "@unhead/vue";

useHead({
  title: "Findsoed Rework",
});

const auth = useAuthStore();
const { authToken } = storeToRefs(auth);

onMounted(() => {
  const appElement = document.getElementById("root");
  if (appElement) {
    appElement.classList.remove("app-loading");
    appElement.classList.add("app-loaded");
    /*     appElement.classList.add("app-loaded");
     */
  }

  watchEffect(() => {
    if (authToken) {
      auth.setAuthToken(localStorage.getItem("authToken"));
      findInfo();
    }
  });
});

const findInfo = async () => {
  try {
    const response = await findUserInfo();
    if (response) {
      auth.setUserInfo({
        username: response.data.username,
        userId: response.data.userId,
        email: response.data.email,
        imageUrl: response.data.imageUrl,
        phoneNumber: response.data.phoneNumber,
      });
    }
  } catch (e) {
    auth.setAuthToken(null);
    auth.setUserInfo(null);
  }
};
</script>

<template>
  <RouterView />
</template>
