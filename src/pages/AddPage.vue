<script setup lang="ts">
import Navbar from "../components/LandingPage/Navbar.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import { onMounted, onUnmounted, watch } from "vue";
import AddBox from "../components/AddPage/AddBox.vue";
import { useSidebarStore } from "../stores/sidebarInfo";
import FooterWave from "../components/Footer/FooterWave.vue";
import { useViewPortStore } from "../stores/viewportStore";
import BreadCrumbComp from "../components/BreadCrumb/BreadCrumbComp.vue";
import { storeToRefs } from "pinia";
import MiniSideBar from "../components/Sidebar/MiniSideBar.vue";
import { useSideStore } from "../stores/sideStore";
import { useViewStore } from "../stores/viewStore";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";


const { handleViewport} = useViewPortStore();
const {view} = storeToRefs(useViewPortStore())
const sidebar = useSideStore()
const {isExpand} = storeToRefs(sidebar);
const views = useViewStore()
const {width, height} = storeToRefs(views);
const auth = useAuthStore();
const {authToken} = storeToRefs(auth)
const navigate = useRouter();

onMounted(() => {
  window.addEventListener('resize', handleViewport)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleViewport)
})

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
<!--   <div class="flex  h-screen w-full">
    <div class="fixed h-full z-9999 top-0 left-0 ">
      <Sidebar active="Home" :class="[isExpand && (width < height) ? ' z-10  ' : 'z-10']"  />
    </div>
    <div class="h-full flex-1 flex flex-col" :class="width > 1000 && 'ml-16'">
      <div class="sticky z-999 top-0">
        <Navbar />
      </div>
      <div class="flex flex-col h-full gap-6 p-3.5">
        <div class="relative w-full h-full">
        <BreadCrumbComp title="Tambah Barang" />
        <div class="absolute w-full h-full z-[2]">
          <div class="flex flex-col h-full gap-6 p-3.5">
                <AddBox />
          </div>        
        </div>
        <MiniSideBar />
      </div>
    </div>
      </div>
  </div> -->
  <div class="flex relative h-screen">
    <Navbar />

    <div v-if="!authToken">
      <div className="w-full h-full absolute z-[100] bg-black/10 flex items-center justify-center text-5xl text-[#1899FF]">
       <!--  <Modal v-bind="modalAuth">
          <template #footer>
            <Button  danger @click="() => navigate.push('login')" >Back</Button>
          </template>
        <p>Anda tidak dapat masuk karena belum login</p>
        </Modal> -->
        </div>
    </div>
    <div class="fixed h-full left-0 z-[9999] top-0">
      <Sidebar active="Home"  />
    </div>
    <div class="h-full w-full relative">
    <div class="h-full flex-1 flex flex-col" :class="width >= 1000 ? 'ml-16' : ''">
      <div :class="['fixed top-0 z-999 w-full', width >= 1000 ? 'pr-16' : '']">
      </div>
      <div class="relative w-full h-full mt-[50px]">
        <div class="absolute w-full h-full z-[2]">
          <div class="flex flex-col h-full gap-6 p-3.5">
                <AddBox />
          </div>        
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
