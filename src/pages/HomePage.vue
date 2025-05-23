<script setup lang="ts">
import { motion, useScroll, useSpring, useTransform } from "motion-v";
import Lenis from "lenis";
import { onMounted, ref, watchEffect } from "vue";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SmoothScroll from "../components/HomePage/SmoothScroll.vue";
import ShowPics from "../components/HomePage/ShowPics.vue";
import { useRouter } from "vue-router";

const navigate = useRouter();
gsap.registerPlugin(ScrollTrigger);
const { scrollYProgress } = useScroll();

navigate.push("/login")
const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
});
const scrollIndicator = {
  scaleX: scaleX,
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  originX: 0,
};

const secondone = ref()
const thirdone = ref()

watchEffect(() => {
  const lenis = new Lenis();
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
});


onMounted(() => {
  
  if (secondone.value && thirdone.value) {
    gsap.to(secondone.value, {
      scrollTrigger: {
        trigger : thirdone.value,
        start : 'top bottom',
        end : 'top top',
        toggleActions : 'play reverse none none'
      },
      scale : 0.8,
      rotate : -10,
      duration : 2
    });

  }
});

const container = ref()


const progress = ref();


onMounted(() => {

    if(container.value){
    const { scrollYProgress} = useScroll({
    target : container.value,
    offset : ['start start', 'end end']
    })

    progress.value = scrollYProgress
      
}
})




onMounted(() => {
  if (container.value) {
    const containerProgress = useScroll({
      target: container.value,
      offset: ["start start", "end end"],
    }).scrollYProgress;

    progress.value = containerProgress;

    console.log("ada valuenya");
  } else {
    console.log("ga ada valuenya");
  }
});
</script>

<template>
  <div ref="container h-full w-full" >
   <!--  <ParallaxZoom v-if="container" :progress="progress" /> -->
     <!-- <div class="w-[800px] mx-auto">
       <div class="w-full p-4 flex gap-4">
         <div class="text-4xl text-black font-bold flex flex-col">
          <span>
            Cari Barang Hilangmu
          </span>
          <span>menggunakan Findsoed</span>
         </div>
         <div>

         </div>
       </div>
     </div> -->
     <!-- <SmoothScroll /> -->
   <!--  <ThirdHome /> -->
     <ShowPics />
  </div>

</template>
