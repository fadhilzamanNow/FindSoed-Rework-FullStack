<script setup lang="ts">
import { motion, useMotionTemplate, useScroll, useTransform } from 'motion-v';



const {scrollY} = useScroll()



const opacity = useTransform(scrollY, [1500,2000],[1,0])

const bgSize = useTransform(scrollY, [0,2000],["270%",'cover'])
const clip1 = useTransform(scrollY, [0,1500], [25,0]);
const clip2 = useTransform(scrollY, [0,1500],[75,100])
const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`
const textOpacity = useTransform(scrollY,[750,1500],[0,1])


</script>

<template>
        <motion.div :initial="{opacity : 0, y : 20}" :animate="{opacity : 1, y : 0}" :transition="{duration : 2, ease : 'easeInOut'}"  class="sticky top-0 h-screen w-full bg-no-repeat customImage  bg-center flex justify-center items-end" :style="{opacity, backgroundSize : bgSize, clipPath}" >
            <div>
                <motion.div :style="{opacity : textOpacity}" class="text-center text-4xl sm:text-5xl font-bold text-[#1890FF] mb-[20vh]">Butuh Bantuan ?</motion.div>
            </div>
        </motion.div>

</template>