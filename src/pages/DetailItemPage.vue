<script setup lang="ts">
import DetailItem from '../components/DetailPage/DetailItem.vue';
import Sidebar from '../components/Sidebar/Sidebar.vue';
import Navbar from '../components/Navbar/Navbar.vue';
import { onMounted, onUnmounted } from 'vue';
import { useViewPortStore } from '../stores/viewportStore';
import { useSidebarStore } from '../stores/sidebarInfo';
import MiniSideBar from '../components/Sidebar/MiniSideBar.vue';
import { useSideStore } from '../stores/sideStore';
import { storeToRefs } from 'pinia';
import { useViewStore } from '../stores/viewStore';

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
    <main class="flex relative h-screen">
        <div class="h-full fixed z-9999 top-0 left-0">
            <Sidebar active="Home" :class="[isExpand && (width < height) ? 'z-10 ' : 'z-10']"  />
        </div>
        <div class="h-full flex flex-1 flex-col" :class="width > 1000 && 'ml-16'">
          <div class="sticky top-0 z-999">
            <Navbar/>
          </div>
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