<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import ListBox from "../components/ListPage/ListBox.vue";
import Navbar from "../components/Navbar/Navbar.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import { useSidebarStore } from "../stores/sidebarInfo";
import { useViewPortStore } from "../stores/viewportStore";
import { useNavbarStore } from "../stores/navbarInfo";
import { storeToRefs } from "pinia";

const sidebar = useSidebarStore();
const {view, handleViewport} = useViewPortStore();
const {isNavbarOpen} = storeToRefs(useNavbarStore());

onMounted(() => {
  window.addEventListener('resize', handleViewport)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleViewport)
})


</script>

<template>
  <div class="flex relative h-screen">
    <div class="h-full">
      <Sidebar active="Home" :class="[sidebar.isExpand && (view.width < view.height) ? 'absolute z-10 ' : 'z-10']"  />
    </div>
    <div class="h-full flex-1 flex flex-col ">
      <Navbar />
      <div class="relative w-full h-full">
        <div class="absolute w-full h-full z-[2]">
          <div class="flex flex-col h-full gap-6 p-3.5">
                <ListBox />
          </div>        
        </div>
        <div class="h-full w-full absolute z-[3]">
          TEST
        </div>
      </div>
    </div>
  </div>
</template>
