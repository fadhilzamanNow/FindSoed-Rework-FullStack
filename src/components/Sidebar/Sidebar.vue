<script setup lang="ts">
import {
  HomeFilled,
  PlusCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { Avatar, Flex } from "ant-design-vue";
const { active = "" } = defineProps<{ active: string }>();
import { RouterLink } from "vue-router";
</script>

<template>
  <Flex class="h-[100vh] w-max px-4 bg-black py-2" vertical>
    <Flex vertical gap="24" justify="space-between" align="center">
      <Avatar :size="24" :style="{ backgroundColor: 'gray', color: 'white' }"
        >Fa</Avatar
      >
      <RouterLink to="/list">
        <HomeFilled
          :style="{
            color: active === 'Home' ? '#CFC922' : 'white',
            fontSize: '24px',
          }"
        />
      </RouterLink>
      <RouterLink to="/add">
        <PlusCircleOutlined
          :style="{
            color: active === 'Add' ? '#CFC922' : 'white',
            fontSize: '24px',
          }"
        />
      </RouterLink>
    </Flex>
      <Flex flex="1" vertical justify="end" align="center">
        <RouterLink to="/setting">

        <SettingOutlined
          :style="{
            color: active === 'Settings' ? '#CFC922' : 'white',
            fontSize: '24px',
          }"
        />
      </RouterLink>

      </Flex>
  </Flex>
</template>
