<script setup lang="ts">
import { Avatar, Dropdown, Menu, MenuItem, Flex } from "ant-design-vue";
import { 
  RollbackOutlined, 
  SettingFilled,
  UserOutlined,
  HomeFilled,
  PlusCircleOutlined,
  MenuOutlined,
  CloseOutlined
} from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../stores/authStore";
import { useRouter, useRoute } from "vue-router";
import logo from "../../assets/icon.png";
import { ref } from "vue";

const auth = useAuthStore();
const { userInfo } = storeToRefs(auth);
const navigate = useRouter();
const route = useRoute();
const mobileMenuOpen = ref(false);

const navItems = [
  { name: "Home", icon: HomeFilled, link: "/home" },
  { name: "Add", icon: PlusCircleOutlined, link: "/add" },
  { name: "Setting", icon: SettingFilled, link: "/setting" },
];

const handleLogout = () => {
  auth.setUserInfo(null);
  auth.setAuthToken(null);
  localStorage.removeItem("authToken");
  navigate.push("/");
};

const handleNavClick = (link: string) => {
  mobileMenuOpen.value = false;
  navigate.push(link);
};
</script>

<template>
  <!-- Mobile Navbar only -->
  <nav class="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 h-16 md:hidden">
    <div class="flex items-center justify-between h-full px-4">
      <!-- Hamburger + Logo -->
      <div class="flex items-center gap-3">
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2 hover:bg-gray-100 rounded-lg flex items-center justify-center">
          <CloseOutlined v-if="mobileMenuOpen" class="text-lg" />
          <MenuOutlined v-else class="text-lg" />
        </button>
        <div class="flex items-center gap-2 cursor-pointer" @click="navigate.push('/home')">
          <img :src="logo" alt="FindSoed" class="size-8" />
          <span class="font-bold">Find<span class="text-blue-600">Soed</span></span>
        </div>
      </div>

      <!-- User menu (mobile) -->
      <Dropdown placement="bottomRight">
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
        <Avatar v-if="userInfo?.imageUrl" :src="userInfo.imageUrl" :size="36" shape="square" class="cursor-pointer" />
        <Avatar v-else :size="36" shape="square" class="bg-blue-600 cursor-pointer">
          <template #icon><UserOutlined /></template>
        </Avatar>
      </Dropdown>
    </div>

    <!-- Mobile Menu Dropdown -->
    <div 
      v-if="mobileMenuOpen"
      class="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg px-4 py-3"
    >
      <ul class="space-y-1">
        <li 
          v-for="item in navItems" 
          :key="item.link"
          @click="handleNavClick(item.link)"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors',
            route.path === item.link ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'
          ]"
        >
          <component :is="item.icon" class="text-lg" />
          <span class="font-medium">{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Overlay -->
  <div 
    v-if="mobileMenuOpen" 
    @click="mobileMenuOpen = false"
    class="md:hidden fixed inset-0 bg-black/20 z-30 top-16"
  ></div>
</template>
