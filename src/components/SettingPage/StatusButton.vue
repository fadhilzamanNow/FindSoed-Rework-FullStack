<script setup lang="ts">
import { Button } from 'ant-design-vue';

const {text = ""} = defineProps<{someProp : string, text : string}>()

// If you needed props, you would define them separately:
// const props = defineProps<{ someProp?: string }>()


</script>

<template>
    <Button type="primary" :danger="text === 'Hilang' ? true : false" :class="[text !== 'Hilang' ? '!bg-green-400 hover:!bg-green-500 transition duration-50 ' : '']" >
        {{ text }}
    </Button>
</template>

<style scoped>
  /* Add any specific styles for your button if needed */
  /* Add space between slots if desired */
  button > :deep(span + span) {
      margin-left: 5px;
  }
</style>