<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useSideStore } from '../../stores/sideStore';
import { storeToRefs } from 'pinia';

const sidebar = useSideStore();
const {isExpand} = storeToRefs(sidebar);


const {link = "", name = "a" } =defineProps<{ link : string, name : string}>()

const {path} = useRoute();
</script>

<template>
 <RouterLink :to="link">
        <li :class="`relative flex justify-center items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors duration-300 group ${path === link ? 'bg-blue-600 !text-white': 'hover:bg-blue-700 text-gray-600 hover:text-white'}`" >
            <slot name="icon"></slot>
            <span :class="[isExpand ? 'w-52 ml-3' : 'w-0', 'overflow-hidden transition-all duration-300']">{{ name }}</span>
            <span v-if="!isExpand" class="absolute left-full rounded-md px-2 py-1 ml-6 invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:-translate-x-0 !text-white bg-blue-700 z-10">{{ name }}</span>
        </li>
      </RouterLink>
</template>