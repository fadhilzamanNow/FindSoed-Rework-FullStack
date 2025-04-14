<script setup lang="ts">
import Nav from "./Nav.vue";
import Hero from "./Hero.vue";
import { Flex } from "ant-design-vue";
import { motion, useScroll, useTransform } from "motion-v";
import {
  CodeSandboxOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  SearchOutlined,
  TeamOutlined,
  TwitterOutlined,
} from "@ant-design/icons-vue";
import { onMounted, useTemplateRef } from "vue";
import gsap from "gsap";

const tweenedRef = useTemplateRef("domRef");
const tweenedRef2 = useTemplateRef("domRef2");
const tweenedRef3 = useTemplateRef("domRef3");
const titleRef = useTemplateRef('titleRef')
const userNum = useTemplateRef("userNumber");
const foundNum = useTemplateRef("foundNum");
const lostNum = useTemplateRef("lostNum");

const horizontalRef = useTemplateRef("horizontalRef");
const horizontalRef2 = useTemplateRef("horizontalRef2");

const { scrollYProgress } = useScroll({
  target: horizontalRef,
  offset: ["start start", "end end"],
});


const scrollYProgress2 = useScroll({
  target: horizontalRef2,
  offset: ["-20vh start", "end end"],
}).scrollYProgress;

const scrollYProgress3 = useScroll({
  target: horizontalRef2,
  offset: ["start start", "end end"],
}).scrollYProgress;

const innerYProgress = useScroll({
  target: tweenedRef3,
  offset: ["20px start", "end start"],
}).scrollYProgress;

const titleProgress = useScroll({
    target : titleRef,
    offset : ["start end", "start start"]
}).scrollYProgress






const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-200vw"]);
const opacity20 = useTransform(scrollYProgress2, [0,0.2], [0,1])
const x2 = useTransform(scrollYProgress3,[0,1],['0vw','-100vw'])

const opacity = useTransform(innerYProgress, [0,0.5], [1,0])
const backgroundColor = useTransform(innerYProgress,[0.5,0.9],['#FFFFFF','#000000'])

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      gsap.from(userNum.value, {
        textContent: 0,
        duration: 1,
        snap: { textContent: 2 },
        stagger: 1,
      });
    }
  });
});

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      gsap.from(lostNum.value, {
        textContent: 0,
        duration: 1,
        snap: { textContent: 2 },
        stagger: 1,
      });
    }
  });
});

const observer3 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      gsap.from(foundNum.value, {
        textContent: 0,
        duration: 1,
        snap: { textContent: 2 },
        stagger: 1,
      });
    }
  });
});

onMounted(() => {
  if (tweenedRef.value) {
    observer.observe(tweenedRef.value);
  }
  if (tweenedRef2.value) {
    observer2.observe(tweenedRef2.value);
  }
  if (tweenedRef3.value) {
    observer3.observe(tweenedRef3.value);
  }
});


</script>

<template>
  <div class="">
    <Nav></Nav>
    <Hero />
    <div ref="titleRef" >
        <motion.div :initial="{y : 50, opacity : 0.2}" :while-in-view="{y : 0, opacity : 1}" :transition="{duration : 1, ease : 'easeIn'}" class="h-[100vh] flex flex-col justify-center items-center">
          <div class="flex flex-col justify-center items-center text-center">
            <div class="text-7xl font-extrabold flex">
              <h1 class="text-black">Find</h1>
              <h1 class="text-[#1890FF]">Soed</h1>
            </div>
            <div class="font-semibold text-3xl">
              Aplikasi Cari Barang Hilang terbaik di seluruh Indonesia
            </div>
          </div>
          <div class="bg-[#1890FF] px-4 py-2 text-white rounded-md mt-8">
            <span class="text-2xl"> Coba Sekarang </span>
          </div>
        </motion.div>
    </div>
    <div ref="horizontalRef" class="relative h-[300vh] w-[100vw] ">
      <div class="sticky top-0 left-0 right-0 overflow-hidden">
        <motion.div class="flex h-[100vh]" :style="{ x: x }">
          <div
            class="h-[100vh] min-w-[100vw] justify-center items-center flex"
            ref="domRef"
          >
            <motion.div
              :initial="{ x: -50 }"
              :while-in-view="{ x: 0 }"
              :transition="{ duration: 0.5 }"
              class="w-max"
            >
              <Flex
                vertical
                gap="8"
                justify="center"
                align="center"
                class="rounded-lg p-4 min-w-[278px] bg-white xl:min-w-[328px]"
              >
                <TeamOutlined
                  class="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                />
                <div
                  class="text-3xl text-[#1890FF] text-center sm:text-4xl md:text-5xl lg:text-6xl flex gap-x-2 items-center"
                >
                  <div ref="userNumber" class="text-7xl font-semibold">50</div>
                  <span class="text-5xl font-bold">+</span>
                </div>
                <div class="text-3xl md:text-4xl xl:text-4xl font-semibold">
                  Pengguna
                </div>
                <span class="mt-[5vh] w-[70vw] text-wrap text-center">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptatum incidunt, natus deleniti accusantium vero provident
                  pariatur hic harum illum! Ab quam similique odio dolorem porro
                  quo quibusdam, accusantium recusandae accusamus.Lorem ipsum
                  dolor sit amet consectetur, adipisicing elit. Voluptatum
                  incidunt, natus deleniti accusantium vero provident pariatur
                  hic harum illum! Ab quam similique odio dolorem porro quo
                  quibusdam, accusantium recusandae accusamus.
                </span>
              </Flex>
            </motion.div>
          </div>
          <div
            class="h-[100vh] min-w-[100vw] justify-center items-center flex"
            ref="domRef2"
          >
            <motion.div
              :initial="{ x: -50 }"
              :while-in-view="{ x: 0 }"
              :transition="{ duration: 0.5 }"
              class="w-max"
            >
              <Flex
                vertical
                gap="8"
                justify="center"
                align="center"
                class="rounded-lg p-4 min-w-[278px] bg-white xl:min-w-[328px]"
              >
                <CodeSandboxOutlined
                  class="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                />
                <div
                  class="text-3xl text-[#1890FF] text-center sm:text-4xl md:text-5xl lg:text-6xl flex gap-x-2 items-center"
                >
                  <div ref="lostNum" class="text-7xl font-semibold">46</div>
                  <span class="text-5xl font-bold">+</span>
                </div>
                <div class="text-3xl md:text-4xl xl:text-4xl font-semibold">
                  Hilang
                </div>
                <span class="mt-[5vh] w-[70vw] text-wrap text-center">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptatum incidunt, natus deleniti accusantium vero provident
                  pariatur hic harum illum! Ab quam similique odio dolorem porro
                  quo quibusdam, accusantium recusandae accusamus.Lorem ipsum
                  dolor sit amet consectetur, adipisicing elit. Voluptatum
                  incidunt, natus deleniti accusantium vero provident pariatur
                  hic harum illum! Ab quam similique odio dolorem porro quo
                  quibusdam, accusantium recusandae accusamus.
                </span>
              </Flex>
            </motion.div>
          </div>
          <div class="relative h-[300vh]">
              <div
                class="h-[100vh] min-w-[100vw] justify-center items-center flex"
                ref="domRef3"
              >
                <motion.div
                  :initial="{ x: -50 }"
                  :while-in-view="{ x: 0 }"
                  :transition="{ duration: 0.5 }"
                  class="w-max"
                  :style="{opacity, backgroundColor}"
                >
                  <Flex
                    vertical
                    gap="8"
                    justify="center"
                    align="center"
                    class="rounded-lg p-4 min-w-[278px] bg-white xl:min-w-[328px]"
                  >
                    <SearchOutlined
                      class="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
                    />
                    <div
                      class="text-3xl text-[#1890FF] text-center sm:text-4xl md:text-5xl lg:text-6xl flex gap-x-2 items-center"
                    >
                      <div ref="foundNum" class="text-7xl font-semibold">39</div>
                      <span class="text-5xl font-bold">+</span>
                    </div>
                    <div class="text-3xl md:text-4xl xl:text-4xl font-semibold">
                      Ditemukan
                    </div>
                    <span class="mt-[5vh] w-[70vw] text-wrap text-center">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Voluptatum incidunt, natus deleniti accusantium vero provident
                      pariatur hic harum illum! Ab quam similique odio dolorem porro
                      quo quibusdam, accusantium recusandae accusamus.Lorem ipsum
                      dolor sit amet consectetur, adipisicing elit. Voluptatum
                      incidunt, natus deleniti accusantium vero provident pariatur
                      hic harum illum! Ab quam similique odio dolorem porro quo
                      quibusdam, accusantium recusandae accusamus.
                    </span>
                  </Flex>
                </motion.div>
              </div>
          </div>
        </motion.div>
      </div>
    </div>
    <div ref="horizontalRef2" class="relative h-[200vh] w-[100vw] bg-white">
            <div class="sticky top-0 left-0 right-0">
                <motion.div :style="{opacity : opacity20}"  class="h-[100vh]  text-center flex flex-col gap-y-2 justify-center items-center text-4xl font-bold">
                   <motion.div :style="{x: x2}" class="flex max-w-[100vw] overflow-hidden">
                       <div class="min-w-[100vw] "> Karya dari sebuah Komunitas Fakultas Teknik Unsoed</div>
                       <div class="min-w-[100vw] "> Tunggu Karya Kami Selanjutnya</div>
   
                   </motion.div>
                    <div class="text-[#1890FF]">OSC Unsoed</div>
                </motion.div>
            </div>
             
         <div class="absolute left-0 bottom-0 right-0">
             <div class="flex flex-col w-full bg-black text-white pt-2 gap-2">
                <div class="w-fit flex mx-auto gap-2  ">
                    <span class="text-white hover:text-slate-200">
                        <InstagramOutlined />
                    </span>
                    <span class="text-white hover:text-slate-200">
                        <FacebookOutlined />
                    </span>
                    <span class="text-white hover:text-slate-200">
                        <LinkedinOutlined />
                    </span>
                    <span class="text-white hover:text-slate-200">
                        <TwitterOutlined />
                    </span>
                </div>
                <span class="self-center text-sm">&copy; 2025 Open Source Community Universitas Jenderal Soedirman, All Rights Reserved</span>
             </div>
         </div>
    </div>
  </div>
</template>
