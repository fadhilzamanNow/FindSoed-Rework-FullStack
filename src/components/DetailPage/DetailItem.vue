<script setup lang="ts">
import { Flex, Image, Avatar} from "ant-design-vue";
import CardPic from "../../assets/CardPic.jpg";
import Home1Pic from "../../assets/Home1Pic.jpg";
import Home2Pic from "../../assets/Home2Pic.jpg";
import {  ref, watchEffect } from "vue";
import { Swiper, SwiperSlide,  } from "swiper/vue";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Scrollbar, EffectFade } from "swiper/modules";


const listPic = ref<any[]>([])

watchEffect(() => {
    listPic.value = [CardPic, Home1Pic, Home2Pic]
})

</script>

<template>
    <Flex class="bg-white p-4 rounded-md border border-gray-300" gap="20">
            <Flex class="w-[750px] max-w-max bg-gray-400 rounded-md" justify="center" align="center">   
            <Swiper autoplay :slides-per-view="1" :space-between="60" :modules="[EffectFade,Navigation,Scrollbar]"  navigation :pagination="{ clickable: true }" effect="slide"
            :scrollbar="{ draggable: true }" class="w-100%"  >
                    <SwiperSlide v-for="item in 3" class="w-[100%]">
                         <Image :src="listPic[item-1]" class="rounded-md object-contain" />
                    </SwiperSlide>
            </Swiper>
            </Flex>
            <Flex vertical gap="20">
                <Flex justify="space-between" align="center" class="max-w-[350px] ">
                    <span class="text-base font-medium">Redmi Note 12 Pro</span>
                    <Flex gap="8" align="center">
                        <Avatar :size="20" >Dh</Avatar>
                        <span class="text-[8px] text-[#D8D5D5]">Dhilz</span>
                    </Flex>
                </Flex>
                <div class="grid grid-cols-2">
                    <Flex vertical gap="4">
                        <h1 class="text-xs font-medium">Kategori</h1>
                        <span class="font-light text-xs">Handphone</span>
                    </Flex>
                    <Flex vertical gap="4">
                        <h1 class="text-xs font-medium">Kontak</h1>
                        <span class="font-light text-xs">089503908873</span>
                    </Flex>
                </div>
                <div class="grid grid-cols-2">
                    <Flex vertical gap="4">
                        <h1 class="text-xs font-medium">Tanggal Hilang</h1>
                        <span class="font-light text-xs">20-03-25</span>
                    </Flex>
                    <Flex vertical gap="4">
                        <h1 class="text-xs font-medium">Status Barang</h1>
                        <span class="px-2 py-0.5 rounded-md text-white bg-red-500 max-w-max text-xs">Hilang</span>
                    </Flex>
                </div>
                <Flex vertical gap="4">
                    <h1 class="text-xs font-medium">Deskripsi</h1>
                    <span class="max-w-[350px] max-h-[100px] overflow-x-hidden hover:overflow-y-scroll text-xs font-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur fugit expedita iusto debitis, accusamus quod eveniet aliquid. Facilis consectetur dignissimos officia omnis, dolore fuga, repellat magnam, dolorum exercitationem harum dolorem!</span>
                </Flex>
        
            </Flex>
        
    </Flex>
</template>

<style>

</style>

