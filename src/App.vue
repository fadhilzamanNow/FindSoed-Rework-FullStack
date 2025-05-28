<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { onMounted, watchEffect } from 'vue';
import { RouterView,RouterLink } from 'vue-router';
import { useViewStore } from './stores/viewStore';
import { useAuthStore } from './stores/authStore';
import { findUserInfo } from './api/Auth/Auth';
import { storeToRefs } from 'pinia';

const auth = useAuthStore();
const {authToken} = storeToRefs(auth)

onMounted(() => {
  const view = useViewStore();

  view.changeView({
    height : window.innerHeight,
    width : window.innerWidth
  })

  window.addEventListener('resize',() => {
    view.changeView({
      height : window.innerHeight,
      width : window.innerWidth
    })
  })

  watchEffect(() => {
  if(authToken){
    auth.setAuthToken(localStorage.getItem("authToken"))
    findInfo()
  }
})
})

const findInfo = async () => {
  try{
    const response = await findUserInfo();
    if(response){
      auth.setUserInfo({
        username : response.data.username,
          userId : response.data.userId,
          email : response.data.email,
          imageUrl : response.data.imageUrl,
          phoneNumber : response.data.phoneNumber
      })
    }
  }catch(e){
    auth.setAuthToken(null)
    auth.setUserInfo(null)
  }
}


</script>

<template>  

  <RouterView />
</template>

<style scoped>

</style>
