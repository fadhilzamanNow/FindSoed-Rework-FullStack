<script setup lang="ts">
import { FilterFilled, HomeOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { Flex } from 'ant-design-vue';
import { ref, watchEffect } from 'vue';

const searchVal = ref<string>("");

watchEffect(() => {
    console.log("isi searchVal : ", searchVal.value)
})

</script>

<template>
    <Flex vertical gap="16">
        <Flex gap="8" align="center">
            <HomeOutlined :style="{fontSize : '16px'}" />
            <span class="text-sm">Home</span>
        </Flex>
        <Flex gap="24">
            <Flex class="w-[264px]">
                <input type="text" placeholder="Cari Barang" class="rounded-l-md py-1 px-4 border border-gray-400 focus:outline-none" v-model="searchVal" />
                <Flex justify="center" align="center" class="bg-black rounded-r-md px-3">
                    <SearchOutlined :style="{fontSize : '16px', color : 'white'}" />
                </Flex>
            </Flex>
            <Flex class="py-2 px-3 bg-black text-white rounded-md" justify="center" align="center">
                <FilterFilled />
            </Flex>
        </Flex>
    </Flex>
</template>