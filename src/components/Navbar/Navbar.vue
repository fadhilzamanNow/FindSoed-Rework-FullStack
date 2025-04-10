<script setup lang="ts">
import {
  CodeSandboxOutlined,
  RollbackOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { Flex, Dropdown, Menu, MenuItem } from "ant-design-vue";
import { motion, useMotionValueEvent, useTransform } from "motion-v";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { useLoginStore } from "../../stores/loginInfo";
import { onMounted, watchEffect } from "vue";
import { useHeroStore } from "../../stores/heroInfo";

const login = useLoginStore();

const {path} = useRoute();

const notMain : string[] = ["/","/login","register"];

const isNotMain = notMain.find((v) => v === path)

console.log("is not main :", isNotMain)

const isPathList : boolean = path === "/list" 


const {scrollProgYBg} = useHeroStore();

watchEffect(() => {
  console.log("nilai : ", scrollProgYBg)
})

onMounted(() => {
  if(scrollProgYBg){

  useMotionValueEvent(scrollProgYBg, 'change', (l) => {
  console.log("nav : ", l)
})
  }
})





</script>

<template>
    <motion.div
      :initial="{ x: -50 }"
      :while-in-view="{ x: 0 }"
      :transition="{ duration: 0.3 }"
      
    >
      <Flex align="center" class="w-full border-b-gray-300 py-1 px-2 min-h-[50px]">
        <Flex
          :vertical="false"
          justify="space-between"
          align="center"
          class="w-full"
        >
          <RouterLink to="/">
            <Flex :vertical="false" align="center" gap="8" class="select-none" v-if="!login.isLogin">
              <CodeSandboxOutlined class="!text-black text-3xl" />
              <h1 class="text-2xl font-bold">
                <span class="text-black">Find</span><span class="text-[#1890FF]">Soed</span>
              </h1>
            </Flex>
          </RouterLink>
          <Flex class="text-sm" gap="8" v-if="!login.isLogin">
            <RouterLink to="/register">
              <div
                class="hidden bg-black text-white rounded-sm sm:flex justify-center items-center h-max px-4 py-1 hover:bg-slate-700 transition duration-300 select-none cursor-pointer"
              >
                DAFTAR
              </div>
            </RouterLink>
            <RouterLink to="/login">
              <div
                class="hidden bg-white text-black rounded-sm sm:flex justify-center items-center h-max px-4 py-1 hover:bg-slate-200 transition duration-300 select-none cursor-pointer"
              >
                MASUK
              </div>
            </RouterLink>
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
          <div class="" v-else>
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
                <div @click="login.logout">
                  <RouterLink to="/login">
                    <Flex gap="8" align="center"  >
                      <RollbackOutlined />
                      <span>Logout</span>
                    </Flex>
                  </RouterLink>
                </div>
              </MenuItem>
            </Menu>
          </template>
          <UserOutlined :syle="{ fontSize: '24px' }" />
        </Dropdown>
      </div>
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
