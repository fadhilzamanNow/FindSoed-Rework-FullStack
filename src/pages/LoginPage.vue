<script setup lang="ts">
import { Flex } from 'ant-design-vue';
import LoginBox from '../components/LoginPage/LoginBox.vue';
import Navbar from '../components/Navbar/Navbar.vue';
import { motion } from 'motion-v';
import FooterWave from '../components/Footer/FooterWave.vue';
import { watch } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const auth = useAuthStore();
const {authToken} = storeToRefs(auth);


const navigate = useRouter();

/* watch(authToken,() => {
    if(authToken.value){
        navigate.push("/list")
    }
},{immediate : true}) */





</script>


<template>
        <Flex vertical gap="2" class="h-[100vh] ">
            <Navbar />
            <div class="h-full flex pt-10">
                <LoginBox class="h-max" />
            </div>
            <div>
                <FooterWave />
            </div>
        </Flex>
</template>