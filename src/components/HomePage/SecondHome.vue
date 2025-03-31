<script setup lang="ts">
import { Flex } from "ant-design-vue";
import HomeSecond from "../../assets/Home2Pic.jpg";
</script>

<template>
  <Flex class="h-full select-none" justify="center" align="center">
    <Flex
      class="px-20 h-max max-w-max "
      justify="start"
      gap="36"
      align="center"
    >
      <img
        :src="HomeSecond"
        alt=""
        class="w-[903px] h-[602px] object-cover"
      />
      <Flex vertical gap="50" class="border self-start pt-20">
        <Flex vertical>
          <h1 class="text-white text-semibold text-5xl !font-itim motion-preset-pulse-sm">
            "Boleh Pasrah
          </h1>
          <h1 class="text-white text-semibold text-5xl !font-itim motion-preset-pulse-sm">
            Tapi tidak dengan Usaha"
          </h1>
        </Flex>
        <div class="bg-white max-w-max px-4 py-2 rounded-lg">
          <span class="text-3xl text-black font-bold">CARI SEKARANG</span>
        </div>
      </Flex>
    </Flex>
  </Flex>
</template>
