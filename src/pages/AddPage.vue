<script setup lang="ts">
import { Flex } from "ant-design-vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Navbar from "../components/Navbar/Navbar.vue";
import { onMounted, onUnmounted } from "vue";
import AddBox from "../components/AddPage/AddBox.vue";

onMounted(() => {
    console.log('Enter Add Page');
})

onUnmounted(() => {
    console.log('Exit Add Page')
})
</script>

<template>
  <Flex>
    <Sidebar active="Add" />
    <Flex flex="1" vertical>
      <Navbar />
      <AddBox />
    </Flex>
  </Flex>
</template>
