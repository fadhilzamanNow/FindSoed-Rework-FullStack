<script setup lang="ts">
import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform, useDomRef } from "motion-v"
import First from "../../assets/1.jpg"
import Second from "../../assets/2.jpg"
import Third from "../../assets/3.jpg"
import Fourth from "../../assets/4.jpg"
import { onMounted, ref, useSSRContext, useTemplateRef, watchEffect } from "vue"
import DetailImages from "./DetailImages.vue"
import { useHeroStore } from "../../stores/heroInfo"
const hero = useHeroStore();







const listImage = [
    {
        src : First,
        start : -200,
        end : 200,
        width : 'w-[25vw] h-[25vh] rounded-md'
    },
    {
        src : Second,
        start : 150,
        end : 180,
        width : 'w-[30vw] h-[30vh] rounded-md'
    },
    {
        src : Third,
        start : 130,
        end : 160,
        width : 'w-[20vw] h-[30vh] rounded-md'
    },
    {
        src : Third,
        start : 110,
        end : 150,
        width : 'w-[25vw] h-[30vh] rounded-md'
    }
]

</script>

<template>
    <div ref="imgRef" class=" flex px-4 pt-[200px] relative z-10 w-full ">
        <DetailImages v-for="(v,i) in listImage" :src="v.src"  :start="v.start" :end="v.end" :width="v.width" :key="i" />
    </div>
</template>