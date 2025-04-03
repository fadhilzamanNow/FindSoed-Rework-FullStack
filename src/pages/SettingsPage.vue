<script setup lang="ts">
import { Flex } from "ant-design-vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Navbar from "../components/Navbar/Navbar.vue";
import SettingsBox from "../components/SettingPage/SettingsBox.vue";
</script>

<template>
  <Flex>
    <Sidebar active="Settings" />
    <Flex flex="1" vertical>
      <Navbar />
      <SettingsBox />
    </Flex>
  </Flex>
</template>
