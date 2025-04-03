<script setup lang="ts">
import { CodeSandboxOutlined, UserAddOutlined } from "@ant-design/icons-vue";
import { Dropdown, Flex, Menu, MenuItem } from "ant-design-vue";
import HomeFirstPage from "../../assets/Home1Pic.jpg";
import {UserOutlined} from "@ant-design/icons-vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCards } from "swiper/modules";
import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";
// @ts-ignore
import VueTyping from "@dmncodes/vue-typing";

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import { RouterLink } from "vue-router";
</script>

<template>
  <Flex vertical :gap="16" class="px-2 sm:w-sm sm:px-2 pt-5 overflow-x-hidden ">
    <Flex :vertical="false" justify="space-between" align="center" class="w-full" >
      <Flex :vertical="false" align="center" gap="8" class="select-none">
        <CodeSandboxOutlined class="text-3xl sm:text-2xl md:text-5xl" />
        <h1 class="text-2xl font-bold"><span>Find</span><span class="text-[#1890FF]">Soed</span></h1>
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
        <Dropdown>
            <template #overlay>
                <Menu>
                    <MenuItem>
                        <RouterLink to="/login">
                        <Flex align="center" gap="8">
                                <UserOutlined class="text-xs " />
                                <span class="text-xs ">Login</span>
                            </Flex>
                        </RouterLink>
                    </MenuItem>
                    <MenuItem >
                        <RouterLink to="/register">
                        <Flex align="center" gap="8">
                            <UserAddOutlined class="text-xs" />
                            <span class="text-xs">Daftar</span>
                        </Flex>
                    </RouterLink>
                    </MenuItem>
                </Menu>
            </template>
            <div class=" flex sm:hidden bg-black text-white justify-center items-center h-max px-4 py-1 hover:bg-slate-700 transition duration-300 select-none cursor-pointer rounded-md">
                Mulai
            </div>
        </Dropdown>
      </Flex>
    </Flex>
    <Flex justify="end">
      <img
        :src="HomeFirstPage"
        alt="FindSoed Logo"
        class="h-[200px] sm:h-[444px] object-cover rounded-xl"
      />
    </Flex>
    <Flex gap="16" >
      <h1 class="text-5xl sm:text-[100px] font-bold">Hei</h1>
      <h1 class="text-5xl text-[#1890FF] sm:text-[100px] font-bold">Jends</h1>
    </Flex>
    <h1 class="text-5xl flex-1 sm:text-[100px] font-bold min-h-[110px]">
        <VueTyping 
        :sentences="['Barang Hilang ?', 'HP apa Laptop ?','Dompet Apa Yang Lain ?']"
        :minTypeSpeed="50"
        :maxTypeSpeed="150"
        :eraseSpeed="10"
        :eraseDelay="1000"
        :writeDelay="0"
        caret=""
        :loop="true"
  />
    </h1>
    <Flex align="center" vertical gap="16" class="flex-1  h-full"   >
     
      <div class="hidden">
          <Flex justify="space-between" align="center" gap="8" >
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
      </div>
      <div class="w-[400px] max-w-max flex-1 justify-center align-center pt-10 ">
        <Swiper autoplay :slides-per-view="1" :space-between="50"  :modules="[EffectCards,Navigation,Autoplay]" effect="cards" :navigation="true" >
            <SwiperSlide>
                <Flex justify="center" class="h-[200px]" align="center">
                    <Flex class="p-4 bg-black rounded-lg w-[223px] text-white" :vertical="true">
                    <Flex align="center" gap="16">
                        <UserOutlined :style="{ fontSize: '20px', color: 'white' }" />
                        <div>imron029</div>
                    </Flex>
                    <div class="text-justify ">
                        Kak HP Infinix ku liat gak ya, soalnya aku lupa taruh dimana?
                    </div>
                    </Flex>
                </Flex>
            </SwiperSlide>
            <SwiperSlide>
                <Flex justify="center" class="h-[200px]" align="center">
                    <Flex class="p-4 bg-black rounded-lg w-[223px] text-white" :vertical="true">
                    <Flex align="center" gap="16">
                        <UserOutlined :style="{ fontSize: '20px', color: 'white' }" />
                        <div>naufal231</div>
                    </Flex>
                    <div class="text-justify ">
                        Kak HP Infinix ku liat gak ya, soalnya aku lupa taruh dimana?
                    </div>
                    </Flex>
                </Flex>
            </SwiperSlide>
            <SwiperSlide>
                <Flex justify="center" class="h-[200px]" align="center">
                    <Flex class="p-4 bg-black rounded-lg w-[223px] text-white" :vertical="true">
                    <Flex align="center" gap="16">
                        <UserOutlined :style="{ fontSize: '20px', color: 'white' }" />
                        <div>imron352</div>
                    </Flex>
                    <div class="text-justify ">
                        Kak HP Infinix ku liat gak ya, soalnya aku lupa taruh dimana?
                    </div>
                    </Flex>
                </Flex>
            </SwiperSlide>
        </Swiper>
      </div>
    </Flex>
  </Flex>
</template>
