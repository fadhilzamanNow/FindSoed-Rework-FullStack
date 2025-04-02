<script setup lang="ts">
import { Flex, Image, Avatar,Modal, Button, Input } from "ant-design-vue";
import CardPic from "../../assets/CardPic.jpg";
import Home1Pic from "../../assets/Home1Pic.jpg";
import Home2Pic from "../../assets/Home2Pic.jpg";
import {  ref, watchEffect } from "vue";
import { Swiper, SwiperSlide  } from "swiper/vue";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Scrollbar, EffectFade } from "swiper/modules";
import CommentCard from "./CommentCard.vue";
import { SendOutlined } from "@ant-design/icons-vue";


const listPic = ref<any[]>([CardPic, Home1Pic, Home2Pic])

const isModalOpen = ref<boolean>(false);

const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value
}

const commentVal = ref<string>("");



watchEffect(() => {
    console.log("isi comment Val : ", commentVal.value)
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
            <Flex vertical gap="20" >
                <Flex gap="10" align="center" class="min-w-[400px] border-b border-b-[#D8D5D5] pb-2">
                    <Avatar>Fa</Avatar>
                    <span class="text-[#6b6969] text-xs">Fadhil Isfadhillah</span>
                </Flex>
                <div class="grid grid-cols-2">
                    <Flex vertical gap="4">
                        <h1 class="text-xs font-medium">Nama</h1>
                        <span class="font-light text-xs">Redmi Note 9 Pro</span>
                    </Flex>
                    <Flex vertical gap="4">
                        <h1 class="text-xs font-medium">Kategori</h1>
                        <span class="font-light text-xs">Handphone</span>
                    </Flex>
                </div>
                <Flex vertical gap="4" class="border-b border-b-[#D8D5D5] pb-4">
                    <h1 class="text-xs font-medium">Detail</h1>
                    <Button type="primary" class="font-light text-xs  max-w-max px-2 py-1 rounded-sm  select-none" @click="toggleModal" size="small" :style="{fontSize : '12px'}" >Lihat Detail</Button>
                </Flex>
                <Flex vertical gap="8" class="h-[250px] overflow-y-hidden hover:overflow-y-scroll" >
                    <CommentCard v-for="i in 8" :key="i" />
                </Flex>
                <Flex>
                    <Input placeholder="Tambah Komentar" v-model:value="commentVal">
                        <template #suffix>
                            <SendOutlined :style="{fontSize : '16px'}" />
                        </template>
                    </Input>
                </Flex>
            </Flex>
    </Flex>
    <Modal v-model:visible="isModalOpen" title="Redmi Note 9 Pro" @ok="toggleModal" :centered="true" :footer="null" >
         <Flex vertical gap="20">
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
                    <span class="max-w-[350px]  overflow-x-hidden hover:overflow-y-scroll text-xs font-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur fugit expedita iusto debitis, accusamus quod eveniet aliquid. Facilis consectetur dignissimos officia omnis, dolore fuga, repellat magnam, dolorum exercitationem harum dolorem!</span>
                </Flex>
        
            </Flex>
    </Modal>
</template>

<style>

</style>

