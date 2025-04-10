<script setup lang="ts">
import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from 'motion-v';
import Wallet from "../../assets/wallet2.jpg"
import { useHeroStore } from '../../stores/heroInfo';
import { ref } from 'vue';
import { Button } from 'ant-design-vue';


const {scrollY} = useScroll()



const opacity = useTransform(scrollY, [1500,2000],[1,0])

const bgSize = useTransform(scrollY, [0,2000],["270%",'100%'])
const clip1 = useTransform(scrollY, [0,1500], [25,0]);
const clip2 = useTransform(scrollY, [0,1500],[75,100])
const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`
</script>

<template>
        <motion.div :initial="{opacity : 0, y : 20}" :animate="{opacity : 1, y : 0}" :transition="{duration : 2, ease : 'easeInOut'}"  class="sticky top-0 h-screen w-full bg-no-repeat customImage  bg-center flex justify-center items-center" :style="{opacity, backgroundSize : bgSize, clipPath}" >
        </motion.div>

</template>