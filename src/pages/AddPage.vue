<script setup lang="ts">
import { Flex } from "ant-design-vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Navbar from "../components/Navbar/Navbar.vue";
import { onMounted, onUnmounted } from "vue";
import AddBox from "../components/AddPage/AddBox.vue";
import { useSidebarStore } from "../stores/sidebarInfo";
import FooterWave from "../components/Footer/FooterWave.vue";

const sidebar = useSidebarStore()

onMounted(() => {
    console.log('Enter Add Page');
})

onUnmounted(() => {
    console.log('Exit Add Page')
})
</script>

<template>
  <div class="flex relative h-screen">
    <div class="h-full">
      <Sidebar active="Home" :class="[sidebar.isExpand ? 'absolute z-10 ' : '']"  />
    </div>
    <div class="h-full flex-1 flex flex-col">
      <Navbar />
      <div class="flex flex-col h-full gap-6 p-4">
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
