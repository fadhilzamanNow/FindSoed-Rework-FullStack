<script setup lang="ts">
import { FilterFilled, HomeOutlined, MinusOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { Flex, Input } from 'ant-design-vue';
import { ref, watchEffect } from 'vue';


const searchVal = ref<string>("");

watchEffect(() => {
    console.log("isi searchVal : ", searchVal.value)
})

const showSearchFilter = ref<boolean>(false);


</script>

<template>
    <div class="flex flex-col gap-4 relative" >
        <div class="flex justify-between">
            <div class="flex items-center gap-2 text-gray-400" >
                <HomeOutlined class="text-lg" />
                <span class="text-sm">Home</span>
            </div>
            <div class="max-w-max bg-[#1890FF] rounded-md flex justify-center items-center text-white p-1.5 px-5 hover:bg-[#188fffad] transition-all duration-300" @click="() => showSearchFilter = !showSearchFilter">
                <SearchOutlined class="text-white" />
            </div>
        </div>
        <div class="flex flex-col shadow-md p-2 rounded-md gap-y-2 absolute w-full z-99999999999 bg-white transition-all duration-200" :class="[showSearchFilter ? 'visible opacity-100' : 'hidden']">
            <div class="self-end p-2 text-gray-700 hover:bg-gray-400 bg-white justify-center items-center flex rounded-md duration-200 transition-all max-w-max"  @click="() => showSearchFilter = !showSearchFilter">
                <MinusOutlined />
            </div>
            <div class="flex gap-3 transition-all duration-200">      
            <Input.Search placeholder="Cari Barang" enter-button class="w-full sm:max-w-sm" />
            <Flex class="py-2 px-3 bg-[#1890FF] max-w-[40px] text-white rounded-md" justify="center" align="center">
                <FilterFilled />
            </Flex>
        </div>
        </div>
     
        <Flex gap="24">
      
        </Flex>
    </div>
</template>