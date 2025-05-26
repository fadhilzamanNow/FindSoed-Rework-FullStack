<script setup lang="ts">
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Navbar from "../components/Navbar/Navbar.vue";
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


const {view, handleViewport} = useViewPortStore();
const sidebar = useSideStore()
const {isExpand} = storeToRefs(sidebar);
const views = useViewStore()
const {width, height} = storeToRefs(views);
const auth = useAuthStore();
const {authToken} = storeToRefs(auth)
const navigate = useRouter();
onMounted(() => {
  window.addEventListener('resize', handleViewport)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleViewport)
})

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
  <div class="flex  h-screen w-full">
    <div class="fixed h-full z-9999 top-0 left-0 ">
      <Sidebar active="Home" :class="[isExpand && (width < height) ? ' z-10  ' : 'z-10']"  />
    </div>
    <div class="h-full flex-1 flex flex-col" :class="width > 1000 && 'ml-16'">
      <div class="sticky z-999 top-0">
        <Navbar />
      </div>
      <div class="flex flex-col h-full gap-6 p-3.5">
        <div class="relative w-full h-full">
        <div class="absolute w-full h-full z-[2]">
          <div class="flex flex-col h-full gap-6 p-3.5">
                <SettingsBox />
          </div>        
        </div>
          <MiniSideBar />
      </div>
    </div>
      </div>
  </div>
</template>
