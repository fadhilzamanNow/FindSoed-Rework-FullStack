<script setup lang="ts">
import { Card, Flex } from "ant-design-vue";
import CardPic from "../../assets/CardPic.jpg";
import { Avatar } from "ant-design-vue";
import { CaretUpOutlined, CommentOutlined, MessageOutlined } from "@ant-design/icons-vue";
import { RouterLink } from "vue-router";
import { computed, onMounted, onUnmounted, ref, toRaw } from "vue";


type PostType = {
    itemName : string,
    itemDetail : string,
    userName : string,
    itemCategory : string,
    status? : string | undefined,
    images : string[],
    commentNum : number,
    id : string,
    userProfile : string,
    statusName? : string,
    categoryName? : string | undefined
}

const {itemName, commentNum, id, images, userName, status, userProfile, itemDetail, itemCategory  } = defineProps<PostType>()

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

console.log("item category : ", itemCategory)


</script>

<template>
  <div class="w-[220px] transition-all duration-300 border-black/20 border rounded-md hover:shadow-md hover:shadow-gray-400/30">
    <RouterLink :to="linkRef" >
      <div class="flex flex-col gap-y-2">
        <div class="relative">
          <img :src="`http://localhost:3500/static/images/${images[0]}`" class="w-full h-[120px] object-cover rounded-t-md bg-gray-300">
          <span :class="['p-0.5 text-white rounded-md absolute top-2 right-2 text-xs', status === 'Hilang' ? 'bg-red-500' : 'bg-green-400']">{{ status }}</span>
          <div class="mx-2 flex flex-col gap-y-2 mb-2">
            <div class="w-full flex justify-between mt-2">
              <span class="text-xs font-medium">
                {{ itemName }}
              </span>
              <span class="rounded-sm border-gray-300 border p-1 bg-gray-500/40 text-gray-500 text-[8px] w-max">
                {{ itemCategory }}
              </span>
            </div>
            <span class="text-[10px] font-normal text-black/40">
              <span v-if="itemDetail.length > 30">
                {{ itemDetail.slice(0,35) }}
              </span>
              <span v-else>
                {{ itemDetail }}
              </span>
            </span>
          </div>
          <div class="w-full bg-gray-300 flex justify-between text-gray-500 py-1">
            <div class="flex justify-center items-cener gap-2 ml-2 text-xs">
              <CommentOutlined />
              <span>{{ commentNum }}</span>
            </div>
          </div>
        </div>
      </div>
    </RouterLink>

  </div>
</template>
