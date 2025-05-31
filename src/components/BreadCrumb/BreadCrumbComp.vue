<script setup lang="ts">
import { HomeOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { Breadcrumb, BreadcrumbItem, Flex } from "ant-design-vue";

const {title = ""} = defineProps<{title : string}>()
</script>

<template>
    <div class="flex gap-2 items-center">
      <div class="flex items-center gap-2 text-base text-gray-600 py-2 group">
          <HomeOutlined class="group-hover:text-gray-700"  />
          <span class="text-sm group-hover:text-gray-700"><RouterLink to="/home">Home</RouterLink></span>
          <span class="text-sm"> / {{ title }}</span>
      </div>
    </div>

</template>
