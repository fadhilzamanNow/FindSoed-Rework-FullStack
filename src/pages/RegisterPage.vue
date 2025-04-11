<script setup lang="ts">
import { Flex } from 'ant-design-vue';
import RegisterBox from '../components/RegisterPage/RegisterBox.vue';
import FooterWave from '../components/Footer/FooterWave.vue';
import Navbar from '../components/Navbar/Navbar.vue';
import { motion } from 'motion-v';

import { reactive } from 'vue';

const data = reactive({
        labels: ['January', 'February', 'March'],
        datasets: [{ data: [40, 20, 12] }]
})

const options = reactive({
    responsive : true
})

</script>

<template>
    <motion.div
        :initial="{x : 200, opacity : 0}"
        :animate="{x: 0, opacity : 1}"
        :exit="{x : -200, opacity : 0}"
        :transition="{type : 'spring', stiffness : 260, damping : 20}"
    >
        <Flex vertical gap="2" class="h-[100vh] ">
            <Navbar />
            <div class="h-full flex pt-10">
                <RegisterBox class="h-max" />
            </div>
         
            <div>
                <FooterWave />
            </div>
        </Flex>
    </motion.div>
</template>