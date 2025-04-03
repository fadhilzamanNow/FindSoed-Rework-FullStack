<script setup lang="ts">
import { Button, Flex } from "ant-design-vue";
import PicGroup from "../../assets/Home2PicAlt.jpg"
</script>

<template>
  <Flex class="h-full select-none" justify="center" align="center">
    <Flex
      class="px-20 h-max max-w-max "
      gap="1"
      vertical
      v-motion-roll-visible-top
    >
      <img
        :src="PicGroup"
        class="object-cover"
      />
      <Flex vertical gap="50" class="border pt-20 w-full" v-motion-roll-visible-top>
        <Flex vertical>
          <h1 class="text-white text-semibold text-xl !font-itim ">
            "Boleh Pasrah
          </h1>
          <h1 class="text-white text-semibold text-xl !font-itim ">
            Tapi tidak dengan Usaha"
          </h1>
          <h1 class="text-white text-semibold text-sm !font-itim pt-2 ">
            - Fadhil Isfadhillah
          </h1>
        </Flex>
        <Button type="primary" class="flex align-center justify-center !text-black !bg-white hover:!bg-gray-200 transition duration-50 max-w-max" v-motion-roll-visible-top >
           Cari Sekarang
        </Button>
      </Flex>
    </Flex>
  </Flex>
</template>
