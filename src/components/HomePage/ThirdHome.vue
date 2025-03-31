<script setup lang="ts">
import { Flex } from "ant-design-vue";
import HomePic from "../../assets/Home3Pic.svg"
import { CodeSandboxOutlined, SearchOutlined, TeamOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <Flex vertical gap="40">
    <Flex justify="space-between" align="center" class="w-full h-full px-20">
      <Flex vertical gap="20">
        <Flex class="text-9xl">
          <h1 class="text-black text-9xl font-extrabold">Find</h1>
          <h1 class="text-[#CFC922] text-9xl font-extrabold">Soed</h1>
        </Flex>
        <Flex>
          <h1 class="text-black text-5xl font-semibold">Aplikasi Pencarian Barang Hilang</h1>
        </Flex>
      </Flex>
      <Flex>
        <img :src="HomePic" alt="" class="h-[500px] w-[500px]" />
      </Flex>
    </Flex>
    <Flex justify="space-between" align="center" class="px-90">
        <Flex vertical gap="8" justify="center" align="center" class="rounded-lg p-4 min-w-[308px] shadow-2xl">
            <TeamOutlined :style="{fontSize : '78px', textAlign : 'center'}" />
            <div class="text-6xl text-[#CFC922] text-center">100+</div>
            <div class="text-5xl">Pengguna</div>
        </Flex>
        <Flex vertical gap="8" justify="center" align="center" class="border border-[#615e5e48] rounded-lg p-4 min-w-[308px] drop-shadow-md">
            <CodeSandboxOutlined :style="{fontSize : '78px', textAlign : 'center'}" />
            <div class="text-6xl text-[#CFC922] text-center">25+</div>
            <div class="text-5xl">Hilang</div>
        </Flex>
        <Flex vertical gap="8" justify="center" align="center" class="border border-[#615e5e48] rounded-lg p-4 min-w-[308px]">
            <SearchOutlined  :style="{fontSize : '78px', textAlign : 'center'}" />
            <div class="text-6xl text-[#CFC922] text-center">100+</div>
            <div class="text-5xl">Ditemukan</div>
        </Flex>
    </Flex>
  </Flex>
</template>
