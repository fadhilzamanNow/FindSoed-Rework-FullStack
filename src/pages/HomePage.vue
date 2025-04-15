<script setup lang="ts">
import { motion, useScroll, useSpring, useTransform } from "motion-v";
/* import FirstHome from "../components/HomePage/FirstHome.vue"; */
import SecondHome from "../components/HomePage/SecondHome.vue";
import ThirdHome from "../components/HomePage/ThirdHome.vue";
import Lenis from "lenis";
import { onMounted, ref, useTemplateRef, watchEffect } from "vue";
import ParallaxZoom from "../components/HomePage/ParallaxZoom.vue";
import { getAllJSDocTagsOfKind } from "typescript";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SmoothScroll from "../components/HomePage/SmoothScroll.vue";
gsap.registerPlugin(ScrollTrigger);
const { scrollYProgress } = useScroll();
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
const fourthone = ref()

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
    /* gsap.from(thirdone.value, {
      scrollTrigger: fourthone.value,
      scale: 0.8,
      duration: 2,
    }); */
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
  <div ref="container" >
   <!--  <ParallaxZoom v-if="container" :progress="progress" /> -->
    <div class="p-4">
        <div class="bg-[#1890FF] text-white rounded-lg h-[80vh] w-full">

        </div>
    </div>
    <!-- <SmoothScroll /> -->
  
   <!--  <ThirdHome /> -->
  </div>

</template>
