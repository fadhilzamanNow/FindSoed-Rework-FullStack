<script setup lang="ts">
import { motion, useScroll, useSpring, useTransform } from "motion-v";
import FirstHome from "../components/HomePage/FirstHome.vue";
import SecondHome from "../components/HomePage/SecondHome.vue";
import ThirdHome from "../components/HomePage/ThirdHome.vue";
const { scrollYProgress, scrollY } = useScroll()
const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
})
const scrollIndicator = {
    scaleX: scaleX,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    originX: 0,
}





</script>

<template>
  <motion.div id="scroll-indicator" :style="scrollIndicator" class="bg-[#1890FF] h-[5px]"  />
  <div class="h-[100vh] overflow-y-hidden">
    <FirstHome />
  </div>
  <div class="h-[100vh] bg-black overflow-x-hidden">
    <SecondHome />
  </div>
  <div class="h-[100vh]">
    <ThirdHome />
  </div>
</template>


<style>
.ball {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgb(185, 109, 9);
}
</style>