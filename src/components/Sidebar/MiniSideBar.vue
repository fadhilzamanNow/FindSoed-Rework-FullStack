<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNavbarStore } from '../../stores/navbarInfo';
import { RouterLink, useRoute } from 'vue-router';
import { useViewStore } from '../../stores/viewStore';
import { watchEffect } from 'vue';
const {path} = useRoute();
const {isNavbarOpen} = storeToRefs(useNavbarStore());
const view = useViewStore();
const {width} = storeToRefs(view)

interface ListSide {
    name : string,
    link : string
}

const listSide : ListSide[] = [
    {
        name : "HOME",
        link : "/home"
    },
    {
        name : "ADD",
        link : "/add"
    },
    {
        name : "SETTINGS",
        link : "/setting"
    }
]

watchEffect(() => {
  if(width.value >= 1000){
    isNavbarOpen.value = false
  }
})
</script>


<template>
  <div
    class="fixed mt-16 top-0 z-[99999999999999999999999] transition-all duration-300 ease-in-out  overflow-hidden w-full "
    :class="[isNavbarOpen ? 'h-full  opacity-100' : 'h-0  opacity-0']"
  >
    <div class="h-full w-full flex flex-col bg-white p-2">
    <RouterLink :to="v.link" v-for="v in listSide">
      <div
        class="p-4 rounded-md font-bold flex justify-center items-center cursor-pointer transition-all duration-100" @click="isNavbarOpen = !isNavbarOpen"
        :class="[path === v.link ? 'bg-[#1890FF] text-white' : 'bg-white hover:bg-[#188fffc4] text-black']"
      >
            {{ v.name }}
      </div>
    </RouterLink>

    </div>
  </div>
</template>
