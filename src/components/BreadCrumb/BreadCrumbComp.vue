<script setup lang="ts">
import { HomeOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { Breadcrumb, BreadcrumbItem, Flex } from "ant-design-vue";

const {title = ""} = defineProps<{title : string}>()
</script>

<template>
    <div class="flex gap-2">
      <div class="flex items-center gap-2 text-xl text-gray-600 py-2" >
          <HomeOutlined class="" />
          <span class="text-sm">Home</span>
      </div>
      <Flex align="center">
        {{ title }}
      </Flex>
    </div>

</template>
