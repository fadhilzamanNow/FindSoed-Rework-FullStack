<script setup lang="ts">
import { Flex } from "ant-design-vue";
import ListBox from "../components/ListPage/ListBox.vue";
import Navbar from "../components/Navbar/Navbar.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
</script>

<template>
  <Flex>
    <Sidebar active="Home" />
    <Flex flex="1" vertical>
      <Navbar />
      <ListBox />
    </Flex>
  </Flex>
</template>
