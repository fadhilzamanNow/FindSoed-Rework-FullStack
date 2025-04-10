<script setup lang="ts">
import { watchEffect } from 'vue';
import { useHeroStore } from '../../stores/heroInfo';
import Navbar from '../Navbar/Navbar.vue';
import { useTransform } from 'motion-v';







</script>

<template>
    <div class="fixed left-0 right-0 top-0 z-50 flex text-white  w-full justify-center">
            <Navbar class='w-full' />
    </div>
</template>