<script setup lang="ts">
import { motion, useScroll, useSpring, useTransform } from "motion-v";
import Lenis from "lenis";
import { onMounted, ref, watch, watchEffect } from "vue";
import { jwtDecode } from "jwt-decode";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SmoothScroll from "../components/HomePage/SmoothScroll.vue";
import ShowPics from "../components/HomePage/ShowPics.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { storeToRefs } from "pinia";
import { Input } from "ant-design-vue";

const navigate = useRouter();
gsap.registerPlugin(ScrollTrigger);
const { scrollYProgress } = useScroll();
const auth = useAuthStore();
const { authToken } = storeToRefs(auth);

/* navigate.push("/login")
 */ const scaleX = useSpring(scrollYProgress, {
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

const secondone = ref();
const thirdone = ref();

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
        trigger: thirdone.value,
        start: "top bottom",
        end: "top top",
        toggleActions: "play reverse none none",
      },
      scale: 0.8,
      rotate: -10,
      duration: 2,
    });
  }
});

const container = ref();

const progress = ref();

/* 
onMounted(() => {

    if(container.value){
    const { scrollYProgress} = useScroll({
    target : container.value,
    offset : ['start start', 'end end']
    })

    progress.value = scrollYProgress
      
}
}) */

/* 
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
}); */

/* watch(navigate,() => {
  if(authToken.value){
    const myToken = jwtDecode(authToken.value)
    if(Number(Date.now()/ 1000) > Number(myToken.exp)){
      localStorage.removeItem("authToken")
      auth.setAuthToken(null)
      navigate.push("/login")
    }
  }
},{
  immediate : true
}) */

const open = ref(false);

watchEffect(() => {
  console.log("isi open : ", open.value);
});
</script>

<template>
  <div>
    <!-- Landing Page -->
    <div class="@container border after:content-['Hello']">
      <!-- Gradient -->
      <div
        class="w-[50px] h-[50px] @lg:bg-green-500 transform-3d rotate-x-32 rotate-z-50 bg-linear-to-r/oklch from-indigo-300 via-purple-500 to-pink-500"
      ></div>
    </div>
    <!-- Input -->
    <Input
      placeholder="test"
      class="caret-amber-400 !outline-none !border-none"
    />
    <!-- Starting -->
    <div>
      <button popovertarget="myPopover" popoveraction="toggle">
        Toggle Popover
    </button>

    <button popovertarget="myPopover" popoveraction="show">
        Show Popover
    </button>
<!-- NOT VARIANT W/O HOVER -->
    <button popovertarget="myPopover" popoveraction="hide" class="hover:bg-sky-300 not-hover:bg-blue-500 ">
        Hide Popover
    </button>
      <div
        popover="manual"
  
        id="myPopover"
        class="transition-discrete starting:open:opacity-0 ..."
      >
        <div class="h-[50px] w-[50px] bg-sky-300 text-white">

        </div>
      </div>
      <!-- ARBITRARY VALUE -->
       <div class="[width:200px] [height:200px] bg-[url('https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg')]">

       </div>
       <!-- H7 -->
       <h6>Test</h6>
       <h1 class="card full-green test"></h1>
      </div>
  </div>
</template>
