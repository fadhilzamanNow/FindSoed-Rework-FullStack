<script setup lang="ts">
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Navbar from "../components/Navbar/Navbar.vue";
import SettingsBox from "../components/SettingPage/SettingsBox.vue";
import { useSidebarStore } from "../stores/sidebarInfo";
import { onMounted, onUnmounted } from "vue";
import { useViewPortStore } from "../stores/viewportStore";
import MiniSideBar from "../components/Sidebar/MiniSideBar.vue";
import { useViewStore } from "../stores/viewStore";
import { storeToRefs } from "pinia";
import { useSideStore } from "../stores/sideStore";

const {view, handleViewport} = useViewPortStore();
const sidebar = useSideStore()
const {isExpand} = storeToRefs(sidebar);
const views = useViewStore()
const {width, height} = storeToRefs(views);
onMounted(() => {
  window.addEventListener('resize', handleViewport)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleViewport)
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
