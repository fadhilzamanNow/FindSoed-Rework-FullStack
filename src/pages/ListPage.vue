<script setup lang="ts">
import ListBox from "../components/ListPage/ListBox.vue";
import Navbar from "../components/Navbar/Navbar.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import { useSidebarStore } from "../stores/sidebarInfo";

const sidebar = useSidebarStore();


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
          <ListBox />
        </div>
      </div>
    </div>
  </div>
</template>
