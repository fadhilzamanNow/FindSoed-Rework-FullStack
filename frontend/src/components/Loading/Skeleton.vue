<script setup lang="ts">
defineProps<{
  type?: 'card' | 'detail' | 'text' | 'avatar' | 'button';
  count?: number;
}>();
</script>

<template>
  <!-- Card Skeleton -->
  <div v-if="type === 'card'" class="w-[350px] border border-gray-200 rounded-md overflow-hidden animate-pulse">
    <div class="h-[120px] bg-gray-200"></div>
    <div class="p-3 space-y-3">
      <div class="flex justify-between">
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
        <div class="h-4 bg-gray-200 rounded w-16"></div>
      </div>
      <div class="h-3 bg-gray-200 rounded w-3/4"></div>
      <div class="flex items-center gap-2">
        <div class="size-6 bg-gray-200 rounded"></div>
        <div class="h-3 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  </div>

  <!-- Detail Skeleton -->
  <div v-else-if="type === 'detail'" class="animate-pulse space-y-4">
    <div class="flex flex-col lg:flex-row gap-4">
      <div class="w-full lg:w-3/5 h-[300px] bg-gray-200 rounded-md"></div>
      <div class="w-full lg:w-2/5 space-y-4">
        <div class="flex items-center gap-3">
          <div class="size-10 bg-gray-200 rounded"></div>
          <div class="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div class="space-y-3">
          <div v-for="i in 5" :key="i" class="flex items-center gap-3">
            <div class="size-4 bg-gray-200 rounded"></div>
            <div class="space-y-1 flex-1">
              <div class="h-3 bg-gray-200 rounded w-16"></div>
              <div class="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Text Skeleton -->
  <div v-else-if="type === 'text'" class="animate-pulse space-y-2">
    <div v-for="i in (count || 3)" :key="i" class="h-4 bg-gray-200 rounded" :class="i === count ? 'w-2/3' : 'w-full'"></div>
  </div>

  <!-- Avatar Skeleton -->
  <div v-else-if="type === 'avatar'" class="animate-pulse">
    <div class="size-10 bg-gray-200 rounded-full"></div>
  </div>

  <!-- Button Skeleton -->
  <div v-else-if="type === 'button'" class="animate-pulse">
    <div class="h-10 bg-gray-200 rounded-lg w-32"></div>
  </div>

  <!-- Default -->
  <div v-else class="animate-pulse">
    <div class="h-4 bg-gray-200 rounded w-full"></div>
  </div>
</template>
