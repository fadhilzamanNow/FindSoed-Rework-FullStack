<script setup lang="ts">
import { Flex, Image, Avatar, Modal, Button, Input } from "ant-design-vue";
import CardPic from "../../assets/CardPic.jpg";
import Home1Pic from "../../assets/Home1Pic.jpg";
import Home2Pic from "../../assets/Home2Pic.jpg";
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Scrollbar, EffectFade, Autoplay } from "swiper/modules";
import CommentCard from "./CommentCard.vue";
import { LoadingOutlined, SendOutlined } from "@ant-design/icons-vue";
import BreadCrumbComp from "../BreadCrumb/BreadCrumbComp.vue";
import { listComment } from "../../dummy/commentDummy";
import type { CommentTypes } from "../../dummy/commentDummy";

//@ts-ignore
import("swiper/css")
//@ts-ignore
import("swiper/css/autoplay")
//@ts-ignore
import("swiper/css/navigation")
//@ts-ignore
import("swiper/css/effect-fade")

const commentListItem = ref<Array<CommentTypes>>(listComment())
const listPic = ref<any[]>([CardPic, Home1Pic, Home2Pic]);
const isModalOpen = ref<boolean>(false);
const width = ref<number>(window.innerWidth);
const height = ref<number>(window.innerHeight);
const commentVal = ref<string>("");
const isBeingSent = ref<boolean>(false);
  
const handleViewport = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
}

onMounted(() => {
    window.addEventListener('resize', handleViewport)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleViewport)
})

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const handleSend = () => {
  console.log(`${commentVal.value}`)
 
  isBeingSent.value = true;
  setTimeout(() => {
    isBeingSent.value = false
    commentListItem.value = [...commentListItem.value, {
    id : 1,
    postingId : 1,
    userId : 1,
    userName : "Fadhil",
    comment : commentVal.value
  }]
  commentVal.value = ""

  },1000)

};


</script>

<template>
  <div class="flex flex-col h-full gap-4 w-full" >
    <div class="flex justify-between ">
      <BreadCrumbComp title="Detail Barang" />
    </div>
    <div class="w-full flex lg:justify-center">
      <div
        class="flex-1 flex flex-col bg-white p-4 items-center rounded-md border border-gray-300 w-full overflow-x-hidden gap-3 lg:max-w-[1024px] "
      >
      <div class="w-full flex justify-center flex-col lg:flex-row gap-3 lg:border-b border-b-[#D8D5D5] pb-3 lg:max-w-max rounded-md">
        <div class="flex justify-center items-center w-full lg:max-w-max lg:justify-start">
          <div
            class="flex justify-center items-center w-[230px] xss:w-[300px] xs:w-[350px] sm:w-[400px] md:w-[450px] lg:w-[550px]  max-w-max bg-gray-400 rounded-md  "
          >
            <Swiper
              autoplay
              :slides-per-view="1"
              :space-between="60"
              :modules="[EffectFade, Navigation, Scrollbar, Autoplay]"
              navigation
              :pagination="{ clickable: true }"
              effect="slide"
              :scrollbar="{ draggable: true }"
            >
              <SwiperSlide v-for="item in 3" class="w-[100%]">
                <Image :src="listPic[item - 1]" class="rounded-md object-contain" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div class="flex flex-col gap-5 w-full">
            <Flex
              gap="10"
              align="center"
              class="w-full sm:min-w-[400px] border-b border-b-[#D8D5D5] pb-2"
            >
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
            <Flex vertical gap="4" class="border-b border-b-[#D8D5D5] pb-2 ">
              <h1 class="text-xs font-medium">Detail</h1>
              <Button
                type="primary"
                class="font-light text-xs max-w-max px-2 py-1 rounded-sm select-none"
                @click="toggleModal"
                size="small"
                :style="{ fontSize: '12px' }"
                >Lihat Detail</Button
              >
            </Flex>
        </div>
      </div>
        <Flex vertical gap="20" class="w-full flex-1">
       
          <div class="flex-1 border-b border-b-[#D8D5D5] overflow-auto  " :class="[height < 800 ? 'max-h-[25vh]' : 'max-h-[35vh]']">
              <div class="h-max">
                  <CommentCard v-for="(v,i) in commentListItem" :key="i" :comment="v.comment" :userName="v.userName" >
                      <template v-slot:name>
                          {{ v.userName }}
                      </template>
                  </CommentCard>
              </div>
          </div>
          <div class="flex ">
            <Input placeholder="Tambah Komentar" v-model:value="commentVal" @press-enter="handleSend">
              <template #suffix>
                <SendOutlined :style="{ fontSize: '16px' }" v-if="!isBeingSent" />
                <LoadingOutlined :syle="{fontSize : '16px'}" v-else />
              </template>
            </Input>
          </div>
        </Flex>
      </div>
    </div>
  </div>
  <Modal
    v-model:visible="isModalOpen"
    title="Redmi Note 9 Pro"
    @ok="toggleModal"
    :centered="true"
    :footer="null"
  >
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
          <span
            class="px-2 py-0.5 rounded-md text-white bg-red-500 max-w-max text-xs"
            >Hilang</span
          >
        </Flex>
      </div>
      <Flex vertical gap="4">
        <h1 class="text-xs font-medium">Deskripsi</h1>
        <span
          class="max-w-[350px] overflow-x-hidden hover:overflow-y-scroll text-xs font-light"
          >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur
          fugit expedita iusto debitis, accusamus quod eveniet aliquid. Facilis
          consectetur dignissimos officia omnis, dolore fuga, repellat magnam,
          dolorum exercitationem harum dolorem!</span
        >
      </Flex>
    </Flex>
  </Modal>
</template>

