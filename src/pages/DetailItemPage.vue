<script setup lang="ts">
import { Flex } from 'ant-design-vue';
import DetailItem from '../components/DetailPage/DetailItem.vue';
import Sidebar from '../components/Sidebar/Sidebar.vue';
import Navbar from '../components/Navbar/Navbar.vue';
import BreadCrumbComp from '../components/BreadCrumb/BreadCrumbComp.vue';
import DetailComment from '../components/DetailPage/DetailComment.vue';


</script>

<template>
    <Flex>
        <Sidebar active="Home" />
        <Flex vertical flex="1">
            <Navbar />
            <BreadCrumbComp />
            <Flex class="h-full " justify="center" align="center" vertical>
                <DetailItem />
                
            </Flex>
        </Flex>
    </Flex>
    
</template>