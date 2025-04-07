<script setup lang="ts">
import HeaderListPage from './HeaderListPage.vue';
import ListCard from './ListCard.vue';

</script>

<template>
    <div class="flex flex-col p-4 gap-6  "> <div>
            <HeaderListPage />
        </div>
        <div class="max-h-full overflow-auto touch-auto">
            <div class="h-[60%]">
                <ListCard />
        </div>
        </div>
      
    </div>
</template>

<style scoped>

</style>

