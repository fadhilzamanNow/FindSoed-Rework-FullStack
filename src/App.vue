<script setup lang="ts">
import { onMounted, watchEffect } from "vue";
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/authStore";
import { storeToRefs } from "pinia";
import { findUserInfo } from "./api/Auth/Auth";
import { useViewStore } from "./stores/viewStore";

const auth = useAuthStore();
const {authToken} = storeToRefs(auth);
const view = useViewStore();




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

watchEffect(() => {
  if(localStorage.getItem("authToken")){
    auth.setAuthToken(localStorage.getItem("authToken"))
    findInfo()
  }
})

watchEffect(() => {
 
})

onMounted(() => {
  console.log("testing resize")
  window.addEventListener('resize', () => {
    view.changeView({
      width : window.innerWidth,
      height : window.innerHeight
    })
  })
})



</script>

<template>
  <RouterView />
</template>

