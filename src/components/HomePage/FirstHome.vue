<script setup lang="ts">
import { CodeSandboxOutlined } from "@ant-design/icons-vue";
import { Flex } from "ant-design-vue";
import HomeFirstPage from "../../assets/Home1Pic.jpg";
import {UserOutlined} from "@ant-design/icons-vue";
</script>

<template>
  <Flex vertical :gap="16" class="px-2 sm:w-sm sm:px-2 pt-5 ">
    <Flex :vertical="false" justify="space-between" align="center" class="w-full" >
      <Flex :vertical="false" align="center" gap="8" class="select-none">
        <CodeSandboxOutlined class="text-3xl sm:text-2xl md:text-5xl" />
        <h1 class="text-2xl font-bold"><span>Find</span><span class="text-amber-300">Soed</span></h1>
      </Flex>
      <Flex class="text-sm" gap="8">
        <div
          class="hidden bg-black text-white rounded-sm sm:flex justify-center items-center h-max px-4 py-1 hover:bg-slate-700 transition duration-300 select-none cursor-pointer"
        >
          DAFTAR
        </div>
        <div
          class="hidden bg-white text-black rounded-sm sm:flex justify-center items-center h-max px-4 py-1 hover:bg-slate-200 transition duration-300 select-none cursor-pointer"
        >
          MASUK
        </div>
        <div class="flex sm:hidden bg-black text-white justify-center items-center h-max px-4 py-1 hover:bg-slate-700 transition duration-300 select-none cursor-pointer rounded-md">
            Start
        </div>
      </Flex>
    </Flex>
    <Flex justify="end">
      <img
        :src="HomeFirstPage"
        alt="FindSoed Logo"
        class="h-[444px] w-[1040px] object-cover rounded-xl"
      />
    </Flex>
    <Flex gap="16" class="">
      <h1 class="text-[100px] font-bold">Hei</h1>
      <h1 class="text-[#CFC922] text-[100px] font-bold">Jends</h1>
    </Flex>
    <Flex justify="space-between" align="center">
      <h1 class="flex-1 text-[100px] font-bold">Barang Hilang?</h1>
      <Flex justify="space-between" align="center" gap="8">
        <Flex class="p-4 bg-black rounded-lg w-[223px] text-white" :vertical="true">
          <Flex align="center" gap="16">
            <UserOutlined :style="{ fontSize: '20px', color: 'white' }" />
            <div>imron298</div>
          </Flex>
          <div class="text-justify">
            Kak HP Infinix ku liat gak ya, soalnya aku lupa taruh dimana?
          </div>
        </Flex>
        <Flex class="p-4 bg-black rounded-lg w-[223px] text-white" :vertical="true">
          <Flex align="center" gap="16">
            <UserOutlined :style="{ fontSize: '20px', color: 'white', fontWeight : 'bold' }" />
            <div class="font-semibold">imron2981</div>
          </Flex>
          <div class="text-justify">
            Kak HP Infinix ku liat gak ya, soalnya aku lupa taruh dimana?
          </div>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
</template>
