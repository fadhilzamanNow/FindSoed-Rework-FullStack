<script setup lang="ts">
import { Flex } from "ant-design-vue";
import HomeFirstPage from "../../assets/Home1Pic.jpg";

// @ts-ignore
import VueTyping from "@dmncodes/vue-typing";


import { motion } from "motion-v";
import Navbar from "../Navbar/Navbar.vue";




</script>

<template>
    <Flex vertical :gap="16" class="w-full overflow-x-hidden overflow-y-hidden ">
        <Navbar />
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
                </div>
            </Flex>
        </div>
    </Flex>
</template>
