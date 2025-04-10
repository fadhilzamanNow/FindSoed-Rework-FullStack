<script setup lang="ts">
import Nav from './Nav.vue';
import Hero from './Hero.vue';
import { Button, Flex } from 'ant-design-vue';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion-v';
import { CodeSandboxOutlined, SearchOutlined, TeamOutlined } from '@ant-design/icons-vue';
import { onMounted, useTemplateRef } from 'vue';
import gsap from 'gsap';

const tweenedRef = useTemplateRef('domRef')
const tweenedRef2 = useTemplateRef('domRef2')
const tweenedRef3 = useTemplateRef('domRef3')


const userNum = useTemplateRef('userNumber')
const foundNum = useTemplateRef('foundNum')
const lostNum = useTemplateRef('lostNum')

const horizontalRef = useTemplateRef('horizontalRef');


const {scrollYProgress} = useScroll({
    target : horizontalRef,
    offset : ['start start', 'end end']
});

useMotionValueEvent(scrollYProgress,'change',(l) => {
    console.log(l)
})


const x = useTransform(scrollYProgress,[0,1],['0vw','-200vw'])





const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      gsap.from(userNum.value, {
        textContent : 0,
        duration : 1,
        snap : {textContent : 2},
        stagger : 1
      })
    }
  }) 
});

const observer2 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            gsap.from(lostNum.value, {
            textContent : 0,
            duration : 1,
            snap : {textContent : 2},
            stagger : 1
        })
        }
       
    })
})

const observer3 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            gsap.from(foundNum.value, {
        textContent : 0,
        duration : 1,
        snap : {textContent : 2},
        stagger : 1
      })
        }
        
    })
})


onMounted(() => {
  if(tweenedRef.value){
    observer.observe(tweenedRef.value)
  }
  if(tweenedRef2.value){
    observer2.observe(tweenedRef2.value)
  }
  if(tweenedRef3.value){
    observer3.observe(tweenedRef3.value)
  }
})
</script>



<template>
    <div class="">
        <Nav></Nav>
        <Hero />
        <div class="h-[100vh] flex flex-col  justify-center items-center">
            <div class="flex flex-col justify-center items-center text-center">
                <div class="text-7xl font-extrabold flex">
                    <h1 class="text-black">Find</h1>
                    <h1 class="text-[#1890FF]">Soed</h1>
                </div>
                <div class="font-semibold text-3xl">
                    Aplikasi Cari Barang Hilang terbaik di seluruh Indonesia
                </div>
            </div>
            <div class="bg-[#1890FF] px-4 py-2 text-white rounded-md mt-8" >
                <span class="text-2xl">
                    Coba Sekarang
                </span>
            </div>  
        </div>
        <div ref="horizontalRef" class="relative h-[300vh] w-[100vw]">
            <div class="sticky top-0 left-0 right-0">
                <motion.div class="flex h-[100vh]" :style="{x : x}">
                    <div class="h-[100vh] min-w-[100vw] justify-center items-center flex" ref="domRef">
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
                      class="rounded-lg p-4 min-w-[278px]  bg-white xl:min-w-[328px]"
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
                      <div class="text-3xl md:text-4xl xl:text-4xl font-semibold ">Pengguna</div>
                      <span class="mt-[5vh] w-[70vw] text-wrap text-center">  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum incidunt, natus deleniti accusantium vero provident pariatur hic harum illum! Ab quam similique odio dolorem porro quo quibusdam, accusantium recusandae accusamus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum incidunt, natus deleniti accusantium vero provident pariatur hic harum illum! Ab quam similique odio dolorem porro quo quibusdam, accusantium recusandae accusamus. 
                    </span>
                    </Flex>
                  </motion.div>
                    </div>
                    <div class="h-[100vh] min-w-[100vw] justify-center items-center flex" ref="domRef2">
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
                      class="rounded-lg p-4 min-w-[278px]  bg-white xl:min-w-[328px]"
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
                      <div class="text-3xl md:text-4xl xl:text-4xl font-semibold ">Hilang</div>
                      <span class="mt-[5vh] w-[70vw] text-wrap text-center">  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum incidunt, natus deleniti accusantium vero provident pariatur hic harum illum! Ab quam similique odio dolorem porro quo quibusdam, accusantium recusandae accusamus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum incidunt, natus deleniti accusantium vero provident pariatur hic harum illum! Ab quam similique odio dolorem porro quo quibusdam, accusantium recusandae accusamus. 
                    </span>
                    </Flex>
                  </motion.div>
                    </div>
                    <div class="h-[100vh] min-w-[100vw] justify-center items-center flex" ref="domRef3">
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
                      class="rounded-lg p-4 min-w-[278px]  bg-white xl:min-w-[328px]"
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
                      <div class="text-3xl md:text-4xl xl:text-4xl font-semibold ">Ditemukan</div>
                      <span class="mt-[5vh] w-[70vw] text-wrap text-center">  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum incidunt, natus deleniti accusantium vero provident pariatur hic harum illum! Ab quam similique odio dolorem porro quo quibusdam, accusantium recusandae accusamus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum incidunt, natus deleniti accusantium vero provident pariatur hic harum illum! Ab quam similique odio dolorem porro quo quibusdam, accusantium recusandae accusamus. 
                    </span>
                    </Flex>
                  </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    </div>
</template>