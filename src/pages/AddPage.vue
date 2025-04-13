<script setup lang="ts">
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Navbar from "../components/Navbar/Navbar.vue";
import { onMounted, onUnmounted } from "vue";
import AddBox from "../components/AddPage/AddBox.vue";
import { useSidebarStore } from "../stores/sidebarInfo";
import FooterWave from "../components/Footer/FooterWave.vue";
import { useViewPortStore } from "../stores/viewportStore";
import BreadCrumbComp from "../components/BreadCrumb/BreadCrumbComp.vue";
import { storeToRefs } from "pinia";

const { handleViewport} = useViewPortStore();
const {view} = storeToRefs(useViewPortStore())
const sidebar = useSidebarStore()

onMounted(() => {
  window.addEventListener('resize', handleViewport)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleViewport)
})

</script>

<template>
  <div class="flex relative h-screen overflow-hidden">
    <div class="h-full">
      <Sidebar active="Home" :class="[sidebar.isExpand && (view.width < view.height) ? 'absolute z-10 ' : 'z-10']"  />
    </div>
    <div class="h-full flex-1 flex flex-col">
      <Navbar />
      <div class="flex flex-col h-full gap-6 p-3.5">
        <BreadCrumbComp title="Tambah Barang" />
        <div class="flex-1">
          <AddBox />
        </div>
    </div>
    <div class="w-full">
            <FooterWave />
        </div>
      </div>
  </div>
</template>
