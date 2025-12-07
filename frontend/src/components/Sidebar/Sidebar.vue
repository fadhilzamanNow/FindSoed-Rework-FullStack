<script setup lang="ts">
import {
  HomeFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
  SettingFilled,
  RollbackOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { Avatar, Dropdown, Menu, MenuItem, Flex } from "ant-design-vue";
import Iconitem from "./Iconitem.vue";
import logo from "../../assets/icon.png";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/authStore";
import { useRouter } from "vue-router";

const listMenu = [
  { name: "Home", icon: HomeFilled, link: "/home" },
  { name: "Add", icon: PlusCircleOutlined, link: "/add" },
  { name: "Setting", icon: SettingFilled, link: "/setting" },
];

const isExpand = ref(false);
const auth = useAuthStore();
const { userInfo } = storeToRefs(auth);
const navigate = useRouter();

const toggleSidebar = () => {
  isExpand.value = !isExpand.value;
};

const handleLogout = () => {
  auth.setUserInfo(null);
  auth.setAuthToken(null);
  localStorage.removeItem("authToken");
  navigate.push("/");
};
</script>

<template>
  <aside class="fixed top-0 left-0 z-50 h-screen hidden md:block">
    <nav
      :class="[
        'h-full flex flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-300 pt-2',
        isExpand ? 'w-64' : 'w-16',
      ]"
    >
      <!-- Header -->
      <div
        class="p-3 flex items-center justify-between h-16 border-b border-gray-100"
      >
        <div
          :class="[
            'overflow-hidden transition-all duration-300 ',
            isExpand ? 'w-' : 'w-0',
          ]"
        >
          <div class="flex items-center gap-2">
            <img :src="logo" alt="FindSoed" class="size-10 object-contain" />
            <span class="text-xl font-bold whitespace-nowrap">
              Find<span class="text-blue-600">Soed</span>
            </span>
          </div>
        </div>
        <button
          @click="toggleSidebar"
          class="p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors flex justify-center items-center"
        >
          <MenuFoldOutlined v-if="isExpand" />
          <MenuUnfoldOutlined v-else />
        </button>
      </div>

      <!-- Menu -->
      <ul class="flex-1 px-3 py-4 space-y-1">
        <Iconitem
          v-for="(v, i) of listMenu"
          :key="i"
          :name="v.name"
          :link="v.link"
          :isExpand="isExpand"
        >
          <template #icon>
            <component :is="v.icon" />
          </template>
        </Iconitem>
      </ul>

      <!-- User Profile -->
      <div class="border-t border-gray-200 p-3">
        <Dropdown placement="topRight" :trigger="['click']">
          <template #overlay>
            <Menu>
              <MenuItem @click="navigate.push('/setting')">
                <Flex gap="8" align="center" class="py-1">
                  <SettingFilled class="text-sm" />
                  <span class="text-sm font-medium">Settings</span>
                </Flex>
              </MenuItem>
              <MenuItem @click="handleLogout">
                <Flex gap="8" align="center" class="py-1">
                  <RollbackOutlined class="text-sm" />
                  <span class="text-sm font-medium">Logout</span>
                </Flex>
              </MenuItem>
            </Menu>
          </template>
          <div
            :class="[
              'flex items-center gap-3  rounded-lg cursor-pointer hover:bg-gray-100 transition-colors',
              isExpand ? '' : 'justify-center',
            ]"
          >
            <Avatar
              v-if="userInfo?.imageUrl"
              :src="userInfo.imageUrl"
              :size="36"
              shape="square"
            />
            <Avatar v-else :size="36" shape="square" class="bg-blue-600">
              <template #icon><UserOutlined /></template>
            </Avatar>
            <div v-if="isExpand" class="overflow-hidden">
              <p class="text-sm font-medium text-gray-700 truncate">
                {{ userInfo?.username }}
              </p>
              <p class="text-xs text-gray-500 truncate">
                {{ userInfo?.email }}
              </p>
            </div>
          </div>
        </Dropdown>
      </div>
    </nav>
  </aside>
</template>
