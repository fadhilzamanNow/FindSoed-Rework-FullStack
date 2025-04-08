<script setup lang="ts">
import { Avatar, Flex } from "ant-design-vue";
</script>

<template>
  <div  class="h-full flex flex-col gap-2 p-1">
    <div class="flex  gap-2.5 items-center">
      <div class="text-xs self-start">
        <Avatar shape="square" class="select-none ">Fa</Avatar>
      </div>
      <Flex align="center" gap="6">
        <span class="text-sm text-black font-medium self-start">
          <slot name="name"></slot>
        </span>
      </Flex>
    </div>
    <p class="text-[11px] font-light w-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus pariatur amet tenetur, fugiat quas quia vel adipisci nulla beatae doloremque voluptas nam dolorum, deserunt laboriosam neque laudantium? Quo, et iusto?
    </p>
  </div>
</template>
