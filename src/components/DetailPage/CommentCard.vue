<script setup lang="ts">
import { Avatar, Flex } from "ant-design-vue";

const {comment = '', userName = ''} = defineProps<{comment : string, userName : string}>();

</script>

<template>
  <div  class="h-full flex flex-col gap-2 p-1">
    <div class="flex  gap-2.5 items-center">
      <div class="text-xs self-start">
        <Avatar shape="square" class="select-none ">{{ userName.slice(0,2) }}</Avatar>
      </div>
      <Flex align="center" gap="6">
        <span class="text-sm text-black font-medium self-start">
          <slot name="name"></slot>
        </span>
      </Flex>
    </div>
    <p class="text-[11px] font-light w-full">
      {{ comment }}
    </p>
  </div>
</template>
