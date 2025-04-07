<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import Card from './Card.vue';
import { listLostItem } from '../../dummy/listLost';
import { useCardStore } from '../../stores/cardInfo';


const card = useCardStore();
const height = ref<number>(window.innerHeight);
const width = ref<number>(window.innerWidth);
watchEffect(() => {
    card.refreshItemList(listLostItem)
})

const newSize = () => {
    height.value = window.innerHeight
    width.value = window.innerWidth
}



onMounted(() => {
    window.addEventListener('resize', newSize )
})

onUnmounted(() => {
    window.removeEventListener('resize', newSize)
})


</script>

<template>
    <div class="scroll-smooth rounded-md  max-h-[80vh] transition-all duration-300 p-3 border border-gray-200 shadow-sm" :class="[height > width ? 'overflow-auto' : 'overflow-hidden hover:overflow-y-scroll']" >
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-y-5 gap-x-2 justify-end  items-center mx-auto " >
            <div v-for="(d) in card.itemList" :key="d.id" class="">
                <Card :title="d.title" :username="d.username" :commentNum="d.commentNum" :likeNum="d.likeNum" :status="d.status" :id="d.id" />
            </div>
        </div>
    </div>
    
</template>