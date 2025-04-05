<script setup lang="ts">
import {
  CodeSandboxOutlined,
  RollbackOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { Flex, Dropdown, Menu, MenuItem } from "ant-design-vue";
import { motion } from "motion-v";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";

const {path} = useRoute();
</script>

<template>
  <motion.div
    :initial="{ x: -50 }"
    :while-in-view="{ x: 0 }"
    :transition="{ duration: 0.3 }"
  >
    <Flex align="center" class="w-full border-b border-b-gray-300 py-1 px-2">
      <Flex
        :vertical="false"
        justify="space-between"
        align="center"
        class="w-full"
      >
        <RouterLink to="/">
          <Flex :vertical="false" align="center" gap="8" class="select-none">
            <h1 class="text-2xl font-bold">
              <span class="text-black">Find</span><span class="text-[#1890FF]">Soed</span>
            </h1>
          </Flex>
        </RouterLink>
        <Flex class="text-sm" gap="8" v-if="path !== '/login' && path !== '/register' ">
          <div
            class="hidden bg-black text-white rounded-sm sm:flex justify-center items-center h-max px-4 py-1 hover:bg-slate-700 transition duration-300 select-none cursor-pointer"
          >
            DAFTAR
          </div>
          <div
            class="hidden bg-white text-black rounded-sm sm:flex justify-center items-center h-max px-4 py-1 hover:bg-slate-200 transition duration-300 select-none cursor-pointer"
          >
            MASUK
          </div>
          <Dropdown>
            <template #overlay>
              <Menu>
                <MenuItem>
                  <RouterLink to="/login">
                    <Flex align="center" gap="8">
                      <UserOutlined class="text-xs" />
                      <span class="text-xs">Login</span>
                    </Flex>
                  </RouterLink>
                </MenuItem>
                <MenuItem>
                  <RouterLink to="/register">
                    <Flex align="center" gap="8">
                      <UserAddOutlined class="text-xs" />
                      <span class="text-xs">Daftar</span>
                    </Flex>
                  </RouterLink>
                </MenuItem>
              </Menu>
            </template>
            <div
              class="flex sm:hidden bg-black text-white justify-center items-center h-max px-4 py-1 hover:bg-slate-700 transition duration-300 select-none cursor-pointer rounded-md"
            >
              Mulai
            </div>
          </Dropdown>
        </Flex>
      </Flex>
    </Flex>
  </motion.div>
  <!-- <Flex class="px-10 py-4 border-b border-b-[#D8D5D5]">
    <Flex gap="16" flex="1">
      <CodeSandboxOutlined :style="{ fontSize: '24px' }" />
      <Flex>
        <span class="text-black text-base font-bold">Find</span>
        <span class="text-[#CFC922] text-base font-bold">Soed</span>
      </Flex>
    </Flex>
    <div>
      <Dropdown placement="bottomLeft">
        <template #overlay>
          <Menu>
            <MenuItem>
              <RouterLink to="/setting">
                <Flex gap="8" align="center">
                  <SettingOutlined />
                  <span>Settings</span>
                </Flex>
              </RouterLink>
            </MenuItem>
            <MenuItem>
              <RouterLink to="/login">
                <Flex gap="8" align="center">
                  <RollbackOutlined />
                  <span>Logout</span>
                </Flex>
              </RouterLink>
            </MenuItem>
          </Menu>
        </template>
        <UserOutlined :syle="{ fontSize: '24px' }" />
      </Dropdown>
    </div>
  </Flex> -->
</template>
