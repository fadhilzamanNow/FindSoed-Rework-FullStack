<script lang="ts" setup>
import {  computed, onMounted, onUnmounted, ref,  toRaw,  watchEffect } from 'vue';
import Card from './Card.vue';
import { listLostItem } from '../../dummy/listLost';
import { useCardStore } from '../../stores/cardInfo';
import { storeToRefs } from 'pinia';
import { Empty } from 'ant-design-vue';
import { useAuthStore } from '../../stores/authStore';
import { usePostStore } from '../../stores/postStore';



const {filteredItemList} = storeToRefs(useCardStore());
const {refreshItemList} = useCardStore()
const {postData} = storeToRefs(usePostStore());

type PostType = {
    itemName : string,
    itemDetail : string,
    userName : string,
    itemCategory : string,
    status : string,
    images : string[],
    likeNum : number,
    commentNum : number,
    id : string,
    userProfile : string,
    statusName? : string,
    categoryName? : string
}

watchEffect(() => {
    refreshItemList(listLostItem)
})







</script>

<template>
    <div class="scroll-smooth rounded-md  transition-all duration-300 p-3  " >
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-y-10 gap-x-2 justify-end mx-auto transition-all duration-300 ease-in h-[75vh] w-full   place-content-start gap-y-2 "  >
                <div v-for="(d,i) in postData" :key="i" class="flex justify-center">
                    <!-- @vue-ignore -->
                    <Card :itemName="d.itemName" :username="d.userName" :commentNum="d.commentNum" :id="d.id" :likeNum="d.likeNum" :status="d.statusName" :images="d.images" :userProfile="d" :itemDetail="d.itemDetail" :itemCategory="d.categoryName"  />
                </div> 
        </div>
        <div  v-if="filteredItemList.length === 0" class="" >
                    <Empty />
                </div>
    </div>
</template>