<script setup lang="ts">
import { Pagination } from 'ant-design-vue';
import { useCardStore } from '../../stores/cardInfo';


const card = useCardStore()

</script>

<template>
    <div class="flex justify-center">
            <Pagination :current="card.currentPage" :total="card.itemList.length" :page-size="card.cardPerPage" v-on:change="(p) => card.currentPage = p"   />
    </div>
</template> 