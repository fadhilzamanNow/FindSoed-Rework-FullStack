<script setup lang="ts">
import { Card, Flex } from "ant-design-vue";
import CardPic from "../../assets/CardPic.jpg";
import { Avatar } from "ant-design-vue";
import { CaretUpOutlined, MessageOutlined } from "@ant-design/icons-vue";




const {title = "", username = "", status = "Hilang", commentNum = 0, likeNum = 0} = defineProps<{title: string, status : string, username : string, commentNum : number, likeNum : number}>()
</script>

<template>
  <div class="w-[300px]">
    <Card
      class="rounded-md p-0 relative bg-gray-300"
      :bordered="true"
      :hoverable="true"
    >
      <template #cover>
        <img
          :src="CardPic"
          alt=""
          class="object-contain h-[122px] rounded-md bg-gray-300"
        />
      </template>

      <Flex vertical gap="10">
        <h1 class="text-base">{{ title }}</h1>
        <Flex gap="10" align="center" justify="space-between">
          <Flex align="center" gap="10">
            <Avatar>{{ username.slice(0,2) }}</Avatar>
            <span class="text-xs text-[#D8D5D5]">{{ username.slice(0,5) + "...." }}</span>
          </Flex>
          <Flex gap="16" class="text-[#aaa8a8]">
            <Flex gap="8" justify="center" align="center">
              <CaretUpOutlined />
              <span>{{likeNum}}</span>
            </Flex>
            <Flex gap="8" justify="center" align="center">
              <MessageOutlined />
              <span>{{ commentNum }}</span>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        class="py-1 px-2 text-white rounded-md absolute top-2 right-2" :class="[status === 'Hilang' ? 'bg-red-500' : 'bg-green-400']"
        >{{status}}</Flex
      >
    </Card>
  </div>
</template>
