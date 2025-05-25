<script setup lang="ts">
import {
  CodeSandboxOutlined,
  HomeFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoreOutlined,
  PlusCircleOutlined,
  SettingFilled,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { Avatar, AvatarProps, Flex } from "ant-design-vue";
const { active = "" } = defineProps<{ active: string }>();
import { RouterLink } from "vue-router";
import Iconitem from "./Iconitem.vue";
import { computed, ref, useTemplateRef, watchEffect } from "vue";
import { useSidebarStore } from "../../stores/sidebarInfo";
import { storeToRefs } from "pinia";
import { useViewPortStore } from "../../stores/viewportStore";
import { vi } from "intl-tel-input/i18n";
import { useAuthStore } from "../../stores/authStore";
import { useSideStore } from "../../stores/sideStore";


const width = ref(0);
const sidebar = useSideStore();
const {isExpand} = storeToRefs(sidebar)
const {view} = storeToRefs(useViewPortStore())
const listMenu = [
  {
    name : 'Home',
    icon : HomeFilled,
    link : '/list',
  },
  {
    name : 'Add',
    icon : PlusCircleOutlined,
    link : '/add'
  },
  {
    name : 'Setting',
    icon : SettingFilled,
    link : '/setting'
  }
]
const auth = useAuthStore();
const {userInfo} = storeToRefs(auth);

const sidebarRef = useTemplateRef('sidebarRef')


const profileProps = computed<AvatarProps>(() => ({
  src : `http://localhost:3500/static/images/${userInfo.value?.imageUrl}`,
  size : 36,
  shape : "square"
}))



watchEffect(() => {
  console.log("user info in sidebar is changing : ", userInfo.value)
})





</script>

<template>
  <aside class="h-[100vh]" v-if="view.width >= 1000" ref="sidebarRef">
    <nav class="h-full flex flex-col bg-white border-r border-r-gray-200 shadow-sm">
      <div class="p-3 pb-2 flex justify-between items-center ">
        <div class="ml-2 overflow-hidden transition-all duration-300" :class="[isExpand ? 'w-34' : 'w-0']">
          <div class="flex items-center gap-x-2">
            <CodeSandboxOutlined class="!text-black text-xl   "/>
            <div class="flex items-center text-xl font-semibold">
              <span>Find</span><span class="text-[#1890FF]">Soed</span>
            </div>
          </div>
        </div>
        <div @click="() => sidebar.toggleSidebar()" class="hover:bg-gray-300 p-2 transition-color bg-white hover:text-white text-black rounded-md flex justify-center items-center">
          <MenuFoldOutlined v-if="isExpand"/>
          <MenuUnfoldOutlined v-else />
        </div>
      </div>
      <ul class="flex-1 px-3">
        <Iconitem v-for="(v,i) of listMenu" :key="i" :name="v.name" :link="v.link" :active="active">
          <template v-slot:icon>
            <component :is="v.icon"></component>
          </template>
        </Iconitem>
      </ul>
      <div class="border-t border-t-gray-200 flex p-3" :class="[isExpand ? '' : 'justify-center']"> 
          <Avatar v-if="userInfo?.imageUrl"  v-bind="profileProps"  />
          <Avatar v-else :size="36" shape="square" >{{ userInfo?.username.slice(0,2) }}</Avatar>
      <div >
        </div>
        
        <div class="flex justify-between items-center overflow-hidden transition-all duration-300" :class="[isExpand ? 'w-52 ml-3' : 'w-0']">
          <div class="leading-4">
            <h1 class="font-semibold">
              {{ userInfo?.username }}
            </h1>
            <h2 class="text-gray-600">{{ userInfo?.email }}</h2>
          </div>
          <MoreOutlined class="text-lg" />
        </div>
      </div>
    </nav>
  </aside>
<!--   <Flex class="h-[100vh] w-max px-1 bg-black py-2" vertical>
    <Flex vertical gap="8" justify="space-between" align="center">
      <Avatar :style="{ backgroundColor: 'gray', color: 'white' }"
        >Fa</Avatar
      >
      <Iconitem v-for="(v,i) in listMenu" :key="i" :link="v.link" :active="active" >
        <template v-slot:name>
         <span class="text-black">{{ v.name }}</span> 
        </template>
        <template v-slot:icon>
          <component :is="v.icon" class="!text-white"></component>
        </template>
      </Iconitem> -->
      <!-- <RouterLink to="/add">
        <PlusCircleOutlined
          :class="[active === 'Add' ? '!text-[#1890FF]' : '!text-white' ,'text-2xl']"
        />
      </RouterLink> -->
   <!--  </Flex>
      <Flex flex="1" vertical justify="end" align="center">
        <RouterLink to="/setting">

        <SettingOutlined
       
          :class="[active === 'Settings' ? '!text-[#1890FF]' : '!text-white' ,'text-2xl']"
        />
      </RouterLink>

      </Flex>
  </Flex> -->
</template>
