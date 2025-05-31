<script setup lang="ts">
import Navbar from "../components/LandingPage/Navbar.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import SettingsBox from "../components/SettingPage/SettingsBox.vue";
import { useSidebarStore } from "../stores/sidebarInfo";
import { onMounted, onUnmounted, watch } from "vue";
import { useViewPortStore } from "../stores/viewportStore";
import MiniSideBar from "../components/Sidebar/MiniSideBar.vue";
import { useViewStore } from "../stores/viewStore";
import { storeToRefs } from "pinia";
import { useSideStore } from "../stores/sideStore";
import { useAuthStore } from "../stores/authStore";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";


const auth = useAuthStore();
const {authToken} = storeToRefs(auth)
const navigate = useRouter();



watch(authToken,() => {
  if(authToken.value){
    const myToken = jwtDecode(authToken.value)
    if(Number(Date.now()/ 1000) > Number(myToken.exp)){
      localStorage.removeItem("authToken")
      auth.setAuthToken(null)
      navigate.push("/login")
    }
  }
},{
  immediate : true
})
</script>

<template>

  <div class="flex relative h-screen">
    <Navbar />
    <Sidebar active="Home"  />
    <SettingsBox />
   <!--  <div v-if="!authToken">
      <div className="w-full h-full absolute z-[100] bg-black/10 flex items-center justify-center text-5xl text-[#1899FF]">
        <Modal v-bind="modalAuth">
          <template #footer>
            <Button  danger @click="() => navigate.push('login')" >Back</Button>
          </template>
        <p>Anda tidak dapat masuk karena belum login</p>
        </Modal>
        </div>
    </div> -->
  </div>
</template>
