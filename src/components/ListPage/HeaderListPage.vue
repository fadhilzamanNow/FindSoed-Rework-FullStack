<script setup lang="ts">
import {
  FilterFilled,
  MinusOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import { Flex, Input, InputProps, InputSearch } from "ant-design-vue";
import { computed, ref, watchEffect } from "vue";
import { useCardStore } from "../../stores/cardInfo";
import BreadCrumbComp from "../BreadCrumb/BreadCrumbComp.vue";
import { storeToRefs } from "pinia";
import { findPost } from "../../api/Post/Post";
import { usePostStore } from "../../stores/postStore";
import lodash from "lodash"



const card = useCardStore();
const search = ref("");
const post = usePostStore()
const {isLoading, postData} = storeToRefs(post);


const debounceSearch = lodash.debounce( async (searchItem : string) => {
  try{
    /* const response = await findPost(search);
    if(response){
      post.setPost(response.data)
    } */
   console.log("isi search : ", searchItem)
   search.value = searchItem
   const response = await findPost(search.value);
   if(response){
    isLoading.value = false
    post.setPost(response.data)
   }
  }catch(e){

  }
},1000)

const inputSearch = computed<InputProps>(() => ({
  placeholder : "Cari Barang",
  onInput : (e) => {
    isLoading.value = true
    debounceSearch((e.target as HTMLInputElement).value)
  },
  value : search.value,
}))



</script>

<template>
  <div class="flex flex-col gap-4 relative">
    <div class="flex justify-between">
      <BreadCrumbComp title="" />
     <!--  <div
        class="overflow-x-hidden w-2 hover:w-32 bg-blue-600 rounded-md flex justify-center items-center text-white py-1 px-5 hover:bg-[#188fffad] transition-all duration-500 "
        @click="() => (showSearchFilter = !showSearchFilter)"
      >
        <div class=" hover:hidden">
          asdadasasdaadasdad
        </div>
        <SearchOutlined class="text-white" />
      </div> -->
      <div class="w-1/2 lg:w-3/8 ">
        <Input v-bind="inputSearch" class="h-full relative z-2">
          <div class="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 z-[99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999]">
            <SearchOutlined  />
          </div>
        </Input>
        
      </div>  
    </div>
    <!-- <div
      class="flex flex-col shadow-md p-2 rounded-md gap-y-2 absolute w-full z-99999999999 bg-white border border-gray-200"
      :class="[showSearchFilter ? 'opacity-100 visible' : ' opacity-0 invisible ','overflow-hidden transition-all duration-300']"
    >
      <div
        class="self-end p-2 text-gray-700 hover:bg-gray-400 bg-white justify-center items-center  rounded-md duration-200 transition-all max-w-max flex"
        @click="() => (showSearchFilter = !showSearchFilter)"
      >
        <MinusOutlined />
      </div>
      <div class="flex gap-3 transition-all duration-200"  >
        <Input.Search placeholder="Cari Barang" enter-button class="w-full" v-model:value="searchItem" />
        <Flex
          class="py-2 px-3 bg-blue-600 max-w-[40px] text-white rounded-md"
          justify="center"
          align="center"
        >
          <FilterFilled />
        </Flex>
      </div>
    </div> -->
    <span class="text-sm text-gray-500"
      >Telah ditemukan {{ postData?.length }} barang
    </span>
  </div>
</template>
