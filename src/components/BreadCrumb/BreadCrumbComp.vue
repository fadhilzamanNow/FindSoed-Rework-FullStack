<script setup lang="ts">
import { HomeOutlined } from "@ant-design/icons-vue";
import { Breadcrumb, BreadcrumbItem, Flex } from "ant-design-vue";
</script>

<template>
  <div class="p-10.5">
    <Breadcrumb>
      <BreadcrumbItem><RouterLink to="/list"> 
        <Flex gap="8" align="center">
            <HomeOutlined />
            <span>Home</span>
        </Flex>
      </RouterLink></BreadcrumbItem>
      <BreadcrumbItem><Flex align="center">
        Detail Barang
      </Flex></BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
