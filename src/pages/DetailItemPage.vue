<script setup lang="ts">
import Navbar from "../components/LandingPage/Navbar.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import { watch } from "vue";
import AddBox from "../components/AddPage/AddBox.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
import DetailItem from "../components/DetailPage/DetailItem.vue";
import DetailItemEdit from "../components/DetailPage/DetailItemEdit.vue";


const auth = useAuthStore();
const {authToken} = storeToRefs(auth)
const navigate = useRouter();



watch(authToken,() => {
  if(authToken.value){
    const myToken = jwtDecode(authToken.value)
    if(Number(Date.now()/ 1000) > Number(myToken.exp)){
      localStorage.removeItem("authToken")
      auth.setAuthToken(null)
      navigate.push("/login")
    }
  }
},{
  immediate : true
})

</script>

<template>
  <div class="min-h-screen w-full">
    <Navbar />  
    <Sidebar active="Add"  />
    <DetailItem />
  </div>
</template>
