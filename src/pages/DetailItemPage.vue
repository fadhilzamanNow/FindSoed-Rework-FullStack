<script setup lang="ts">
import { Flex } from 'ant-design-vue';
import DetailItem from '../components/DetailPage/DetailItem.vue';
import Sidebar from '../components/Sidebar/Sidebar.vue';
import Navbar from '../components/Navbar/Navbar.vue';
import BreadCrumbComp from '../components/BreadCrumb/BreadCrumbComp.vue';


</script>

<template>
    <main class="flex relative h-screen">
        <div class="h-full">
            <Sidebar active="Home" />
        </div>
        <div class="h-full flex flex-1 flex-col">
            <Navbar/>
                <div class="h-full flex flex-col justify-center p-4 " >
                    <DetailItem />
                </div>
        </div>
    </main>
    
</template>