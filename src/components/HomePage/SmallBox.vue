<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';

const tempRef = useTemplateRef("section")

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        console.log(entry, " ", entry.isIntersecting)
    })
})

onMounted(() => {
    if(tempRef.value){
        observer.observe(tempRef.value)
    }
})

</script>

<template>  
    <div ref="section">

    </div>
</template>