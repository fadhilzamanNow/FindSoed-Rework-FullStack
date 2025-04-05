<script setup lang="ts">
import { Button, Flex } from "ant-design-vue";
import PicGroup from "../../assets/Home2PicAlt.jpg"
import { motion } from "motion-v";
</script>

<template>
  <Flex class="h-full select-none" justify="center" align="center">
    <div
      class=" h-max max-w-max gap-[1px] flex flex-col md:flex-row md:gap-x-20 "
    >
      <motion.div :initial="{x : -100}" :while-in-view="{x : 0}" :transition="{duration : 0.5, ease : 'easeIn'}">
        <img
          :src="PicGroup"
          class=" w-full object-cover h-[200px] sm:h-[300px] md:h-[400px] xl:h-[400px] lg:w-[500px] "
        />
      </motion.div>
      <Flex vertical gap="50" class="border pt-20 w-full" >
        <motion.div :initial="{x : 200}" :while-in-view="{x : 0}" :transition="{duration : 1}">
          <Flex vertical>
            <h1 class="text-white text-semibold text-xl !font-itim md:text-2xl lg:text-4xl ">
              "Boleh Pasrah
            </h1>
            <h1 class="text-white text-semibold text-xl !font-itim md:text-2xl lg:text-4xl ">
              Tapi tidak dengan Usaha"
            </h1>
            <h1 class="text-white text-semibold text-sm !font-itim pt-2 md:text-xl lg:text-3xl ">
              - Fadhil Isfadhillah
            </h1>
          </Flex>
        </motion.div>
        <motion.div :initial="{x : 200}" :while-in-view="{x : 0}" :transition="{duration : 1}" >
          <Button type="primary" class="flex align-center justify-center !text-black !bg-white hover:!bg-gray-200 transition duration-50 max-w-max "  >
             Cari Sekarang
          </Button>
        </motion.div>
      </Flex>
    </div>
  </Flex>
</template>
