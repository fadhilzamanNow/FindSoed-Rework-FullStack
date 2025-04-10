<script setup lang="ts">
import { motion, useMotionTemplate, useScroll, useTransform } from 'motion-v';
import { ref } from 'vue';

const {src, start, end, width } = defineProps<{src : any, start : any, end : any, width : any}>()



const imgRef = ref()

console.log("width : ", width)





const {scrollYProgress} = useScroll({
    target : imgRef,
    offset : [`${start}px end`, `end ${end * -1}px`]
})



const opacity = useTransform(scrollYProgress, [0.75,1],[1,0])
const y = useTransform(scrollYProgress, [0,1],[start,end])
const scale = useTransform(scrollYProgress, [0,1], [1,0.85])
const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`

/* useMotionValueEvent(scrollProgYBg,'change', (l) => {
    console.log(`latest : ${l}`)
}) */

</script>

<template>
    <div class="" :class="width" ref="imgRef">
        <motion.img :src="src" class="object-cover h-full w-full " :style="{opacity : opacity, transform : transform, scale}" >
        
        </motion.img>
    </div>
</template>