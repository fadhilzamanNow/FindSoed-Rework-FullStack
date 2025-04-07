<script setup lang="ts">
import { Card, Flex } from "ant-design-vue";
import CardPic from "../../assets/CardPic.jpg";
import { Avatar } from "ant-design-vue";
import { CaretUpOutlined, MessageOutlined } from "@ant-design/icons-vue";
import { RouterLink } from "vue-router";
import { computed, onMounted, onUnmounted, ref } from "vue";

const {title = "", username = "", status = "Hilang", commentNum = 0, likeNum = 0, id = 0} = defineProps<{title: string, status : string, username : string, commentNum : number, likeNum : number, id : number}>()

const linkRef = computed<string>(() => {
    return `detail/${id}`
})


let windowWidth = ref<number>(window.innerWidth);


onMounted(() => {
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })
})

</script>

<template>
  <div class="w-[120px] xss:w-[150px] xs:w-[180px] sm:w-[220px] transition-all duration-300">
    <RouterLink :to="linkRef" >
    <Card
      class="rounded-md p-0 relative bg-gray-300"
      :bordered="true"
      :hoverable="true"
    >
      <template #cover>
        <img
          :src="CardPic"
          alt=""
          class="object-contain h-[102px] rounded-md bg-gray-300"
        />
      </template>

      <div class="flex flex-col gap-1" >
        <h1 class="text-xs text-nowrap overflow-x-hidden">{{ windowWidth < 400 ? title.slice(0,10) + '...' : title }}</h1>
        <Flex gap="10" align="center" justify="space-between">
          <div class="flex items-center gap-2" >
            <Avatar class="flex justify-center items-center " shape="square"><span class="text-xs">{{ username.slice(0,2) }}</span></Avatar>
            <span class="text-[10px] text-[#D8D5D5] text-nowrap">{{ username.slice(0,5) + "..." }}</span>
          </div>
          <div class="gap-2 text-[#aaa8a8] hidden sm:flex">
            <Flex gap="8" justify="center" align="center">
              <CaretUpOutlined />
              <span>{{likeNum}}</span>
            </Flex>
            <Flex gap="8" justify="center" align="center">
              <MessageOutlined />
              <span>{{ commentNum }}</span>
            </Flex>
          </div>
        </Flex>
      </div>

      <Flex
        class="py-1 px-2 text-white rounded-md absolute top-2 right-2" :class="[status === 'Hilang' ? 'bg-red-500' : 'bg-green-400']"
        >{{status}}</Flex
      >
    </Card>
</RouterLink>

  </div>
</template>
