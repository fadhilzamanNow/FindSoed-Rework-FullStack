<script setup lang="ts">
import { HomeOutlined } from "@ant-design/icons-vue";
import { Breadcrumb, BreadcrumbItem, Flex } from "ant-design-vue";

const {title = ""} = defineProps<{title : string}>()
</script>

<template>
    <Breadcrumb>
      <BreadcrumbItem><RouterLink to="/list"> 
        <div class="flex items-center gap-2 " >
            <HomeOutlined class="text-lg"/>
            <span>Home</span>
        </div>
      </RouterLink>
    </BreadcrumbItem>
      <BreadcrumbItem>
        <Flex align="center">
          {{ title }}
        </Flex>
    </BreadcrumbItem>
    </Breadcrumb>
</template>
