<script setup lang="ts">
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Navbar from "../components/Navbar/Navbar.vue";
import SettingsBox from "../components/SettingPage/SettingsBox.vue";
import { useSidebarStore } from "../stores/sidebarInfo";

const sidebar = useSidebarStore();
</script>

<template>
  <div class="flex relative h-screen overflow-hidden">
    <div class="h-full">
      <Sidebar active="Settings" :class="[sidebar.isExpand ? 'absolute z-10 ' : '']"  />
    </div>
    <div class="h-full flex-1 flex flex-col">
      <Navbar />
      <div class="flex flex-col h-full gap-6 p-4">
        <div class="flex-1">
          <SettingsBox />
        </div>
    </div>
      </div>
  </div>
</template>
