<script setup lang="ts">
import {
  FilterFilled,
  HomeOutlined,
  MinusOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import { Flex, Input } from "ant-design-vue";
import { ref, watchEffect } from "vue";
import { useCardStore } from "../../stores/cardInfo";
import BreadCrumbComp from "../BreadCrumb/BreadCrumbComp.vue";

const searchVal = ref<string>("");

watchEffect(() => {
  console.log("isi searchVal : ", searchVal.value);
});

const showSearchFilter = ref<boolean>(false);
const card = useCardStore();
</script>

<template>
  <div class="flex flex-col gap-4 relative">
    <div class="flex justify-between">
      <BreadCrumbComp title="" />
      <div
        class="max-w-max bg-[#1890FF] rounded-md flex justify-center items-center text-white p-1.5 px-5 hover:bg-[#188fffad] transition-all duration-500 "
        @click="() => (showSearchFilter = !showSearchFilter)"
      >
        <SearchOutlined class="text-white" />
      </div>
    </div>
    <div
      class="flex flex-col shadow-md p-2 rounded-md gap-y-2 absolute w-full z-99999999999 bg-white"
      :class="[showSearchFilter ? 'opacity-100' : ' opacity-0','overflow-hidden transition-all duration-300']"
    >
      <div
        class="self-end p-2 text-gray-700 hover:bg-gray-400 bg-white justify-center items-center  rounded-md duration-200 transition-all max-w-max flex"
        @click="() => (showSearchFilter = !showSearchFilter)"
      >
        <MinusOutlined />
      </div>
      <div class="flex gap-3 transition-all duration-200">
        <Input.Search placeholder="Cari Barang" enter-button class="w-full" />
        <Flex
          class="py-2 px-3 bg-[#1890FF] max-w-[40px] text-white rounded-md"
          justify="center"
          align="center"
        >
          <FilterFilled />
        </Flex>
      </div>
    </div>
    <span class="text-sm text-gray-500"
      >Telah ditemukan {{ card.itemList.length }} barang
    </span>
  </div>
</template>
