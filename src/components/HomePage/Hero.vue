<script setup lang="ts">
import { useTemplateRef } from 'vue';
import CenterImage from './CenterImage.vue';
import ParallaxImages from './ParallaxImages.vue';


const sectionHeight = 1500;



</script>

<template>
<div class="w-full relative h-[calc(1500px+100vh)]">
        <CenterImage />
        <ParallaxImages />
        <div class="absolute bottom-0 left-0 right-0 h-screen bg-gradien-to-b from-zinc-950/0 to-zin-950 ">
            
        </div>
        
       
</div>
</template>