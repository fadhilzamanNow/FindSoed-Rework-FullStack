<script setup lang="ts">
import { Button } from 'ant-design-vue';

const {text = ""} = defineProps<{ text : string }>()

// If you needed props, you would define them separately:
// const props = defineProps<{ someProp?: string }>()


</script>

<template>
    <Button type="primary" :danger="text === 'Hilang' ? true : false" :class="[text !== 'Hilang' ? '!bg-green-400 hover:!bg-green-500 transition duration-50 ' : '']" >
        {{ text }}
    </Button>
</template>

