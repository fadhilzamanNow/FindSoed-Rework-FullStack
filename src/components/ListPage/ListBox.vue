<script setup lang="ts">
import HeaderListPage from "./HeaderListPage.vue";
import ListCard from "./ListCard.vue";



</script>

<template>
  <div class="flex flex-col p-1 gap-6">
    <div>
      <HeaderListPage />
    </div>
    <div class="max-h-full">
      <ListCard />
    </div>
  </div>
</template>

<style scoped></style>
