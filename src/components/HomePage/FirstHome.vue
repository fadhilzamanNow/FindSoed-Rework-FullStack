<script setup lang="ts">
import { CodeSandboxOutlined, UserAddOutlined } from "@ant-design/icons-vue";
import { Dropdown, Flex, Menu, MenuItem } from "ant-design-vue";
import HomeFirstPage from "../../assets/Home1Pic.jpg";
import { UserOutlined } from "@ant-design/icons-vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCards } from "swiper/modules";
import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";
// @ts-ignore
import VueTyping from "@dmncodes/vue-typing";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { RouterLink } from "vue-router";
import { motion } from "motion-v";

</script>

<template>
    <Flex vertical :gap="16" class="w-full overflow-x-hidden overflow-y-hidden ">
        <motion.div :initial="{x : -50}" :while-in-view="{x : 0}" :transition="{duration : 0.3}">
                <Flex align="center" class="w-full border-b border-b-gray-300 py-1 px-2">
                    <Flex
                        :vertical="false"
                        justify="space-between"
                        align="center"
                        class="w-full"
                    >
                        <Flex :vertical="false" align="center" gap="8" class="select-none">
                            <CodeSandboxOutlined class="text-3xl sm:text-2xl md:text-5xl" />
                            <h1 class="text-2xl font-bold">
                                <span>Find</span><span class="text-[#1890FF]">Soed</span>
                            </h1>
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
                                                    <UserOutlined class="text-xs" />
                                                    <span class="text-xs">Login</span>
                                                </Flex>
                                            </RouterLink>
                                        </MenuItem>
                                        <MenuItem>
                                            <RouterLink to="/register">
                                                <Flex align="center" gap="8">
                                                    <UserAddOutlined class="text-xs" />
                                                    <span class="text-xs">Daftar</span>
                                                </Flex>
                                            </RouterLink>
                                        </MenuItem>
                                    </Menu>
                                </template>
                                <div
                                    class="flex sm:hidden bg-black text-white justify-center items-center h-max px-4 py-1 hover:bg-slate-700 transition duration-300 select-none cursor-pointer rounded-md"
                                >
                                    Mulai
                                </div>
                            </Dropdown>
                        </Flex>
                    </Flex>
                </Flex>
        </motion.div>
        <motion.div :initial="{x : 200}" :while-in-view="{x : 0}" :transition="{duration : 1.05}" >
            <Flex justify="end" class="rounded-xl">
                    <img
                    :src="HomeFirstPage"
                    alt="FindSoed Logo"
                    class="h-[200px] sm:h-[300px] md:h-[400px] xl:h-[400px] w-full pt-0 sm:pl-10 md:pl-30 xl:pl-50 object-cover sm:rounded-xl"
                />
            </Flex>
        </motion.div>
        <motion.div :initial="{x : -200}" :while-in-view="{x : 0}" :transition="{duration : 1}" >
            <Flex gap="16">
                <h1 class="text-5xl sm:text-[50px] xl:text-[70px] font-bold">
                    Hei
                </h1>
                <h1
                    class="text-5xl text-[#1890FF] sm:text-[50px] xl:text-[70px] font-bold"
                >
                    Jends
                </h1>
            </Flex>
        </motion.div>
        <div class="flex flex-col lg:flex-row xl:items-center">
            <motion.div :initial="{x : 200}" :while-in-view="{x : 0}" :transition="{duration : 1}" class="w-[100%] lg:w-[50%]">
                <h1
                    class="text-5xl flex-1 sm:text-[60px] font-bold min-h-[110px] xl:text-[70px] sm:min-h-max"
                >
                    <VueTyping
                        :sentences="[
                            'Barang Hilang ?',
                            'HP apa Laptop ?',
                            'Dompet Apa Yang Lain ?',
                        ]"
                        :minTypeSpeed="50"
                        :maxTypeSpeed="150"
                        :eraseSpeed="10"
                        :eraseDelay="1000"
                        :writeDelay="0"
                        caret=""
                        :loop="true"
                    />
                </h1>
            </motion.div>
            <Flex align="center" vertical gap="16" class="flex-1 h-full">
                <div
                    class="w-[400px] xl:w-[600px] max-w-max flex-1 justify-center align-center pt-10 sm:pt-0 pb-2 "
                >
                    <Swiper
                        autoplay
                        :slides-per-view="1"
                        :space-between="50"
                        :modules="[EffectCards, Navigation, Autoplay]"
                        effect="cards"
                        :navigation="true"
                    >
                        <SwiperSlide>
                            <Flex
                                justify="center"
                                class="h-full"
                                align="center"
                            >
                                <Flex
                                    class="p-4 bg-black rounded-lg w-[203px] xl:w-[403px] xl:h-[143px] text-white"
                                    :vertical="true"
                                >
                                    <Flex align="center" gap="16">
                                        <UserOutlined
                                            :style="{
                                                fontSize: '20px',
                                                color: 'white',
                                            }"
                                        />
                                        <div>imron029</div>
                                    </Flex>
                                    <div class="text-justify">
                                        Kak HP Infinix ku liat gak ya, soalnya
                                        aku lupa taruh dimana?
                                    </div>
                                </Flex>
                            </Flex>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Flex
                                justify="center"
                                class="h-full"
                                align="center"
                            >
                                <Flex
                                    class="p-4 bg-black rounded-lg w-[223px] xl:w-[403px] xl:h-[143px] text-white"
                                    :vertical="true"
                                >
                                    <Flex align="center" gap="16">
                                        <UserOutlined
                                            :style="{
                                                fontSize: '20px',
                                                color: 'white',
                                            }"
                                        />
                                        <div>naufal231</div>
                                    </Flex>
                                    <div class="text-justify">
                                        Kak HP Infinix ku liat gak ya, soalnya
                                        aku lupa taruh dimana?
                                    </div>
                                </Flex>
                            </Flex>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Flex
                                justify="center"
                                class="h-full"
                                align="center"
                            >
                                <Flex
                                    class="p-4 bg-black rounded-lg w-[223px] xl:w-[403px] xl:h-[143px] text-white"
                                    :vertical="true"
                                >
                                    <Flex align="center" gap="16">
                                        <UserOutlined
                                            :style="{
                                                fontSize: '20px',
                                                color: 'white',
                                            }"
                                        />
                                        <div>imron352</div>
                                    </Flex>
                                    <div class="text-justify">
                                        Kak HP Infinix ku liat gak ya, soalnya
                                        aku lupa taruh dimana?
                                    </div>
                                </Flex>
                            </Flex>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </Flex>
        </div>
    </Flex>
</template>
