<script setup lang="ts">
import { Flex } from "ant-design-vue";
import HomePic from "../../assets/Home3Pic.svg";
import {
  CodeSandboxOutlined,
  SearchOutlined,
  TeamOutlined,
} from "@ant-design/icons-vue";
import {
  animate,
  motion,
  useMotionValue,
  RowValue,
  useTransform,
  useInView,
} from "motion-v";
import { onMounted, onUnmounted, ref, toRaw, useTemplateRef, watch, watchEffect, watchPostEffect } from "vue";
import gsap from "gsap";
import { updateLanguageServiceSourceFile } from "typescript";
import SmallBox from "./SmallBox.vue";


const tweenedRef = useTemplateRef('domRef')
const userNum = useTemplateRef('userNumber')
const lostNum = useTemplateRef('lostRef')
const foundNum = useTemplateRef('foundRef')


const domRef = ref();
const isView = useInView(domRef);


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      gsap.from(userNum.value, {
        textContent : 0,
        duration : 1,
        snap : {textContent : 2},
        stagger : 1
      })
      gsap.from(lostNum.value, {
        textContent : 0,
        duration : 1,
        snap : {textContent : 2},
        stagger : 1
      })
      gsap.from(foundNum.value, {
        textContent : 0,
        duration : 1,
        snap : {textContent : 2},
        stagger : 1
      })
    }
  }) 
});


onMounted(() => {
  if(tweenedRef.value){
    observer.observe(tweenedRef.value)
  }
})




/* const {progress} = defineProps<{progress : any}>();

console.log("nilai progress 3 :", toRaw(progress))

const scale = useTransform(toRaw(progress), [0,1], [0.8, 1.01]) */


</script>

<template>
  <motion.div  class="h-screen flex flex-col gap-5 bg-white z-[-1] border rounded-md border-gray-200 ">
    <motion.div
      :initial="{ y: -50 }"
      :while-in-view="{ y: 0 }"
      :transition="{ duration: 1 }"
    >
      <Flex
        justify="space-between"
        align="center"
        class="w-full h-full px-10 pt-20"
      >
        <Flex vertical gap="20">
          <Flex>
            <h1
              class="text-black text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Find
            </h1>
            <h1
              class="text-[#1890FF] text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Soed
            </h1>
          </Flex>
          <Flex>
            <h1
              class="text-black text-sm font-semibold sm:text-2xl lg:text-3xl"
            >
              Aplikasi Pencarian Barang Hilang
            </h1>
          </Flex>
        </Flex>
        <Flex>
          <img
            :src="HomePic"
            alt=""
            class="h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] md:w-[400px] md:h-[400px]"
          />
        </Flex>
      </Flex>
    </motion.div>
    <div
      ref="domRef"
      vertical
      justify="center"
      align="center"
      class="flex flex-col sm:flex-row gap-2 justify-center items-center w-full flex-wrap md:gap-4 lg:gap-8 xl:gap-16"
    >
      <motion.div
        :initial="{ x: -50 }"
        :while-in-view="{ x: 0 }"
        :transition="{ duration: 0.5 }"
        :while-hover="{ scale: 1.02 }"
      >
        <Flex
          vertical
          gap="8"
          justify="center"
          align="center"
          class="rounded-lg p-4 min-w-[278px] shadow-2xl bg-white xl:min-w-[328px]"
        >
          <TeamOutlined
            class="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
          />
          <div
            class="text-3xl text-[#1890FF] text-center sm:text-4xl md:text-5xl lg:text-6xl flex gap-x-2"
          >
            <div ref="userNumber">50</div>
            <span>+</span>
          </div>
          <div class="text-3xl md:text-4xl xl:text-4xl">Pengguna</div>
        </Flex>
      </motion.div>
      <motion.div
        :initial="{ x: 50 }"
        :while-in-view="{ x: 0 }"
        :transition="{ duration: 0.5 }"
        :while-hover="{ scale: 1.02 }"
      >
        <Flex
          vertical
          gap="8"
          justify="center"
          align="center"
          class="rounded-lg p-4 min-w-[278px] xl:min-w-[328px] shadow-2xl bg-white"
        >
          <CodeSandboxOutlined
            class="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
          />
          <div
            class="text-3xl text-[#1890FF] text-center sm:text-4xl md:text-5xl lg:text-6xl flex gap-x-2"
          >
            <div ref="lostRef">25</div>
            <span>+</span>
          </div>
          <div class="text-3xl md:text-4xl xl:text-4xl">Hilang</div>
        </Flex>
      </motion.div>
      <motion.div
        :initial="{ x: -50 }"
        :while-in-view="{ x: 0 }"
        :transition="{ duration: 0.5 }"
        :while-hover="{ scale: 1.02 }"
      >
        <Flex
          vertical
          gap="8"
          justify="center"
          align="center"
          class="rounded-lg p-4 min-w-[278px] shadow-2xl bg-white xl:min-w-[328px]"
        >
          <SearchOutlined
            class="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
          />
          <div
            class="text-3xl text-[#1890FF] text-center sm:text-4xl md:text-5xl lg:text-6xl flex gap-x-2"
          >
            <div ref="foundRef">20</div>
            <span>+</span>
          </div>
          <div class="text-3xl md:text-4xl xl:text-4xl">Ditemukan</div>
        </Flex>
      </motion.div>
    </div>
  </motion.div>
</template>
