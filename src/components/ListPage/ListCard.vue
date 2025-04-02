<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';
import Card from './Card.vue';
import { listLostItem, type LostItem } from '../../dummy/listLost';
import { Flex, Pagination } from 'ant-design-vue';

const itemList = ref<Array<LostItem>>([]);
const currentPage = ref<number>(1);

const showItemList = computed(() => {
    return itemList.value.slice(currentPage.value*10-10, currentPage.value * 10)
})  

watchEffect(() => {
    itemList.value = listLostItem
})

</script>

<template>
    <div class="grid grid-cols-5 gap-y-5">
        <div v-for="(d) in showItemList" :key="d.id">
            <Card :title="d.title" :username="d.username" :commentNum="d.commentNum" :likeNum="d.likeNum" :status="d.status" :id="d.id" />
        </div>
    </div>
    <Flex justify="center">
            <Pagination :current="currentPage" :total="itemList.length" v-on:change="(p) => currentPage = p"   />
        </Flex>
</template>