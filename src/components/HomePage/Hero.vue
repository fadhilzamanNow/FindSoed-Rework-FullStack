<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import CenterImage from './CenterImage.vue';
import ParallaxImages from './ParallaxImages.vue';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion-v';


const sectionHeight = 1500;

const centerRef = useTemplateRef('center')
/* const text = ref();
 */

const textRef = useTemplateRef('textRef');

const {scrollYProgress} = useScroll({
    target : textRef,
    offset : ['start end', 'start center']
})



const opacity = useTransform(scrollYProgress, [0.5,1], [1,0] )



</script>

<template>
<div class="w-full relative h-[calc(1500px+100vh)]">
        <div ref="textRef" class="relative right-0 left-0  w-fit mx-auto top-[90vh] text-4xl sm:text-5xl font-bold text-black " >
            <motion.div :style="{opacity}">Barang Hilang ?</motion.div>
        </div>
            <CenterImage ref="center" />
        <ParallaxImages />
        <div class="absolute bottom-0 left-0 right-0 h-screen bg-gradien-to-b from-zinc-950/0 to-zin-950 ">
            
        </div>
        
       
</div>
</template>