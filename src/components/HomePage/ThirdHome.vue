<script setup lang="ts">
import { Flex } from "ant-design-vue";
import HomePic from "../../assets/Home3Pic.svg"
import { CodeSandboxOutlined, SearchOutlined, TeamOutlined } from "@ant-design/icons-vue";
import { motion } from "motion-v";





</script>

<template>
  <Flex vertical gap="20">
    <motion.div :initial="{y : -50}" :while-in-view="{y : 0}" :transition="{duration : 1}">
      <Flex justify="space-between" align="center"  class="w-full h-full px-10 pt-20" >
        <Flex vertical gap="20">
          <Flex>
            <h1 class="text-black text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">Find</h1>
            <h1 class="text-[#1890FF] text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">Soed</h1>
          </Flex>
          <Flex>
            <h1 class="text-black text-sm font-semibold sm:text-2xl lg:text-3xl ">Aplikasi Pencarian Barang Hilang</h1>
          </Flex>
        </Flex>
        <Flex>
          <img :src="HomePic" alt="" class="h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] md:w-[400px] md:h-[400px]" />
        </Flex>
      </Flex>
    </motion.div>
    <div vertical justify="center" align="center" class="flex flex-col sm:flex-row gap-2 justify-center items-center w-full flex-wrap md:gap-4 lg:gap-8 xl:gap-16 " >    
      <motion.div :initial="{x : -50}" :while-in-view="{x : 0}" :transition="{duration : 0.5}" :while-hover="{scale : 1.02}" >
          <Flex vertical gap="8" justify="center" align="center" class="rounded-lg p-4 min-w-[278px]  shadow-2xl bg-white" >
            <TeamOutlined class="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl" />
            <div class="text-3xl text-[#1890FF] text-center sm:text-4xl md:text-5xl lg:text-6xl">
              100+
            </div>
            <div class="text-3xl md:text-4xl xl:text-4xl">Pengguna</div>
        </Flex>
        </motion.div>
        <motion.div :initial="{x : 50}" :while-in-view="{x : 0}" :transition="{duration : 0.5}" :while-hover="{scale : 1.02}">
        <Flex vertical gap="8" justify="center" align="center" class="rounded-lg p-4 min-w-[278px] shadow-2xl bg-white" >
            <CodeSandboxOutlined class="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl" />
            <div class="text-3xl text-[#1890FF] text-center sm:text-4xl md:text-5xl lg:text-6xl">25+</div>
            <div class="text-3xl md:text-4xl xl:text-4xl">Hilang</div>
        </Flex>
        </motion.div>
        <motion.div :initial="{x : -50}" :while-in-view="{x : 0}" :transition="{duration : 0.5}" :while-hover="{scale : 1.02}">
        <Flex vertical gap="8" justify="center" align="center" class="rounded-lg p-4 min-w-[278px] shadow-2xl bg-white" >
            <SearchOutlined class="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl" />
            <div class="text-3xl text-[#1890FF] text-center sm:text-4xl md:text-5xl lg:text-6xl">10+</div>
            <div class="text-3xl md:text-4xl xl:text-4xl  ">Ditemukan</div>
        </Flex>
        </motion.div>
      </div>
  </Flex>
</template>
