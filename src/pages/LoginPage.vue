<script setup lang="ts">
import { Flex } from 'ant-design-vue';
import LoginBox from '../components/LoginPage/LoginBox.vue';
import Navbar from '../components/Navbar/Navbar.vue';
import { motion } from 'motion-v';


</script>

<template>
    <motion.div
        :initial="{x : -200, opacity : 0}"
        :animate="{x: 0, opacity : 1}"
        :exit="{x : 300, opacity : 0}"
        :transition="{type : 'spring', stiffness : 260, damping : 20}"
    >
        <Flex vertical gap="2" class="h-[100vh] ">
            <Navbar />
            <div class="h-full flex pt-10">
                <LoginBox class="h-max" />
            </div>
        </Flex>
    </motion.div>
</template>