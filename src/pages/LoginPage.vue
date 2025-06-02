<script setup lang="ts">
import { Flex } from 'ant-design-vue';
import LoginBox from '../components/LoginPage/LoginBox.vue';
/* import Navbar from '../components/Navbar/Navbar.vue'; */
import { motion } from 'motion-v';
import FooterWave from '../components/Footer/FooterWave.vue';
import { ref, watch, watchEffect } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useHead } from '@unhead/vue';
import Navbar from '../components/LandingPage/Navbar.vue';
import Footer from '../components/LandingPage/Footer.vue';

useHead({
    title : "LoginPage",
    titleTemplate : "%s | FindSoed Rework",
    meta : [
        {name : 'description', content : "Pada aplikasi ini kamu akan melakukan autentikasi pengguna untuk melihat pengguna"}
    ]
})

const auth = useAuthStore();
const {authToken} = storeToRefs(auth);
const loginLoading = ref(false);

const navigate = useRouter();

/* watch(authToken,() => {
    if(authToken.value){
        navigate.push("/list")
    }
},{immediate : true}) */

const toggleLoading = () => {
    loginLoading.value = !loginLoading.value
}

watchEffect(() => {
    if(authToken.value){
        navigate.push("/home")
    }
})


</script>


<template>
        <Flex vertical gap="2" class="h-[100vh] ">
            <Navbar />
            <div class="flex flex-col justify-between h-full ">
                <LoginBox  @toggle-loading="toggleLoading" />
                <Footer />
            </div>
        </Flex>
</template>