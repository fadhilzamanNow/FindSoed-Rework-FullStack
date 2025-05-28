<script setup lang="ts">
import { Avatar, Flex } from "ant-design-vue";

type CommentType = {
  userName: string;
  userProfile: string;
  message: string;
  created_at: string;
};

const {userName,userProfile, message, created_at } = defineProps<CommentType>();


</script>

<template>
  <div  class="h-full flex flex-col gap-2 p-1">
    <div class="flex  gap-2.5">
      <div class="text-xs self-start">
        <Avatar v-if="userProfile" :src="`http://localhost:3500/static/images/${userProfile}`" shape="square" class="select-none " />
        <Avatar v-else shape="square">{{ userName }}</Avatar>
      </div>
      <Flex vertical gap="8">
        <Flex align="start" gap="6" class="">
          <span class="text-[8px] text-black/40 font-normal ">
          {{userName}}
              </span>
              <span className="text-[8px] text-black/40 font-normal   ">
                {{created_at}}
              </span>
        </Flex>
        <p class="text-[10px] font-light w-full text-black/80 text-wrap wrap-break-word">
          {{ message }}
        </p>
      </Flex>
    </div>
  </div>
</template>
