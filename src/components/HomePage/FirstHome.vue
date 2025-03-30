<script setup lang="ts">
import { CodeSandboxOutlined } from "@ant-design/icons-vue";
import { Flex } from "ant-design-vue";
import HomeFirstPage from "./Home1Pic.jpg";
import {UserOutlined} from "@ant-design/icons-vue";
</script>

<template>
  <Flex vertical :gap="16" class="px-20 pt-5">
    <Flex :vertical="false" justify="space-between" align="center">
      <Flex :vertical="false" align="center" gap="8" class="select-none">
        <CodeSandboxOutlined :style="{ fontSize: '64px' }" />
        <h1 class="text-3xl font-bold">FindSoed</h1>
      </Flex>
      <Flex class="text-sm" gap="8">
        <div
          class="bg-black text-white rounded-sm flex justify-center items-center h-max px-4 py-1 hover:bg-slate-700 transition duration-300 select-none cursor-pointer"
        >
          DAFTAR
        </div>
        <div
          class="bg-white text-black rounded-sm flex justify-center items-center h-max px-4 py-1 hover:bg-slate-200 transition duration-300 select-none cursor-pointer"
        >
          MASUK
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
