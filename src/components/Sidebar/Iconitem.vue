<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useSidebarStore } from '../../stores/sidebarInfo';

const sidebar = useSidebarStore();


const {link = "", name = "a" } =defineProps<{ link : string, name : string}>()

const {path} = useRoute();
</script>

<template>
 <RouterLink :to="link">
        <li class="relative flex justify-center items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors duration-300 group" :class="[path === link ? 'bg-[#1890FF] !text-white': 'hover:bg-[#188fffc4] text-black hover:text-white']" >
            <slot name="icon"></slot>
            <span :class="[sidebar.isExpand ? 'w-52 ml-3' : 'w-0', 'overflow-hidden transition-all duration-300']">{{ name }}</span>
            <span v-if="!sidebar.isExpand" class="absolute left-full rounded-md px-2 py-1 ml-6 invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:-translate-x-0 !text-white bg-[#188fffc4] z-10">{{ name }}</span>
        </li>
      </RouterLink>
</template>