<script setup lang="ts">
import DetailItem from '../components/DetailPage/DetailItem.vue';
import Sidebar from '../components/Sidebar/Sidebar.vue';
import Navbar from '../components/Navbar/Navbar.vue';
import { onMounted, onUnmounted } from 'vue';
import { useViewPortStore } from '../stores/viewportStore';
import { useSidebarStore } from '../stores/sidebarInfo';
import MiniSideBar from '../components/Sidebar/MiniSideBar.vue';

const {view, handleViewport} = useViewPortStore();
const sidebar = useSidebarStore()

onMounted(() => {
  window.addEventListener('resize', handleViewport)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleViewport)
})

</script>

<template>
    <main class="flex relative h-screen">
        <div class="h-full">
            <Sidebar active="Home" :class="[sidebar.isExpand && (view.width < view.height) ? 'absolute z-10 ' : 'z-10']"  />
        </div>
        <div class="h-full flex flex-1 flex-col">
            <Navbar/>
            <div class="relative w-full h-full">
        <div class="absolute w-full h-full z-[2]">
          <div class="flex flex-col h-full gap-6 p-3.5">
                <DetailItem />
          </div>        
        </div>
          <MiniSideBar />
      </div>
        </div>
    </main>
</template>