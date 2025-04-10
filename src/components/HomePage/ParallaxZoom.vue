<script setup lang='ts'>
import { motion, useScroll, useTransform } from "motion-v"
import First from "../../assets/1.jpg"
import Second from "../../assets/2.jpg"
import Third from "../../assets/3.jpg"
import Fourth from "../../assets/4.jpg"
/* import Wallet from "../../assets/wallet.jpg" */
import Wallet from "../../assets/wallet2.jpg"


import { onMounted, reactive, ref, useTemplateRef, watchEffect } from "vue"
import Lenis from "lenis"
import ThirdHome from "./ThirdHome.vue"

const {progress } = defineProps<{progress : any}>()



let scale4 = ref()
let scale5 = ref()
let scale6 = ref()
let scale7 = ref()
let scale8 = ref()
let scale9 = ref()
let viewport = reactive<{height : number, width : number}>({
    height : window.innerHeight,
    width : window.innerWidth
})



let myImage = [
    {
        src : Wallet,
        clas : "h-full w-full object-cover",
        scale : scale9
    },
    {
        src : First,
        clas : "h-full w-full top-[-30vh] left-[5vw] w-[35vw] h-[30vh] absolute object-cover" ,
        scale : scale5
    },
    {
        src : First,
        clas : "h-full w-full absolute top-[-10vh] left-[-25vw] w-[20vw] h-[45vh] object cover" ,
        scale : scale6
    },
    {
        src : First,
        clas : "h-full w-full absolute left-[27.5vw] w-[25vw] h-[25vh] object-cover" ,
        scale : scale5
    },
    {
        src : First,
        clas : "h-full w-full absolute top-[27.5vh] left-[5vw] w-[20vw] h-[25vh] object-cover" ,
        scale : scale6
    },
    {
        src : First,
        clas : "h-full w-full absolute top-[27.5vh] left-[-22.5vw] w-[30vw] h-[25vh] object-cover" ,
        scale : scale8
    },
    {
        src : First,
        clas : "h-full w-full absolute top-[22.5vh] left-[25vw] w-[15vw] h-[15vh] object-cover" ,
        scale : scale9
    }
]

onMounted(() => {
    scale4.value = useTransform(progress, [0,1], [0,4])
    scale5.value = useTransform(progress, [0,1], [0,5])
    scale6.value = useTransform(progress, [0,1], [0,6])
    scale7.value = useTransform(progress, [0,1], [0,7])
    scale8.value = useTransform(progress, [0,1], [0,8])
    scale9.value = useTransform(progress, [0,1], [0,9])

})

watchEffect(() => {
  const lenis = new Lenis();
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});



</script>
<template>
    <div class="relative  h-[300vh] mt-[50vh] mb-[80vh] bg-white border-green-500 ">
        <div class="sticky top-0  text-white text-5xl h-[100vh] z-2 overflow-hidden flex justify-center items-center">
                <motion.div v-for="(v,i) in myImage" class="w-[100%] h-[100%] absolute top-0 flex justify-center items-center" :style="{scale : scale4}" :key="i">
                    <div class="relative w-[25vw] h-[25vh]">
                        <img
                            :src="v.src"
                            :class="v.clas"
                        >
                    </div>
                </motion.div>
        </div>
    </div>
</template>