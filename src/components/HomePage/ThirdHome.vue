<script setup lang="ts">
import { Flex } from "ant-design-vue";
import HomePic from "../../assets/Home3Pic.svg"
import { CodeSandboxOutlined, SearchOutlined, TeamOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <Flex vertical gap="40">
    <Flex justify="space-between" align="center"  class="w-full h-full px-10 pt-20" v-motion-slide-visible-top>
      <Flex vertical gap="20">
        <Flex class="text-9xl">
          <h1 class="text-black text-4xl font-extrabold">Find</h1>
          <h1 class="text-[#1890FF] text-4xl font-extrabold">Soed</h1>
        </Flex>
        <Flex>
          <h1 class="text-black text-sm font-semibold">Aplikasi Pencarian Barang Hilang</h1>
        </Flex>
      </Flex>
      <Flex>
        <img :src="HomePic" alt="" class="h-[200px] w-[200px]" />
      </Flex>
    </Flex>
    <Flex vertical justify="center" align="center" class="" gap="8">      
        <Flex vertical gap="8" justify="center" align="center" class="rounded-lg p-4 min-w-[278px] shadow-2xl bg-white" v-motion-slide-visible-right>
            <TeamOutlined class="text-center text-5xl" />
            <div class="text-3xl text-[#1890FF] text-center">100+</div>
            <div class="text-3xl">Pengguna</div>
        </Flex>
        <Flex vertical gap="8" justify="center" align="center" class="rounded-lg p-4 min-w-[278px] shadow-2xl bg-white" v-motion-slide-visible-left>
            <CodeSandboxOutlined class="text-center text-5xl" />
            <div class="text-3xl text-[#1890FF] text-center">25+</div>
            <div class="text-3xl">Barang Hilang</div>
        </Flex>
        <Flex vertical gap="8" justify="center" align="center" class="rounded-lg p-4 min-w-[278px] shadow-2xl bg-white" v-motion-slide-visible-right>
            <SearchOutlined class="text-center text-5xl" />
            <div class="text-3xl text-[#1890FF] text-center ">10+</div>
            <div class="text-3xl">Barang Ditemukan</div>
        </Flex>
    </Flex>
  </Flex>
</template>
