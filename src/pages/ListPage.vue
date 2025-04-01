<script setup lang="ts">
import { Flex } from 'ant-design-vue';
import Sidebar from '../components/ListPage/Sidebar.vue';
import ListBox from '../components/ListPage/ListBox.vue';
import Navbar from '../components/Navbar/Navbar.vue';


</script>

<template>
    <Flex>
        <Sidebar active="Home" />
    </Flex>
    <Flex vertical flex="1">
        <Navbar />
        <ListBox />
    </Flex>
</template>