<script setup lang="ts">
import { h, onMounted, onUnmounted, watch, watchEffect } from "vue";
import ListBox from "../components/ListPage/ListBox.vue";
import Navbar from "../components/Navbar/Navbar.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import { useSidebarStore } from "../stores/sidebarInfo";
import { useViewPortStore } from "../stores/viewportStore";
import { useNavbarStore } from "../stores/navbarInfo";
import { storeToRefs } from "pinia";
import MiniSideBar from "../components/Sidebar/MiniSideBar.vue";
import { useAuthStore } from "../stores/authStore";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";
import { Modal, ModalProps } from "ant-design-vue";
import { Button } from "ant-design-vue";
import { useViewStore } from "../stores/viewStore";
import { useSideStore } from "../stores/sideStore";
import BreadCrumbComp from "../components/BreadCrumb/BreadCrumbComp.vue";

const sidebar = useSideStore();
const {isExpand} = storeToRefs(sidebar);
const {view, handleViewport} = useViewPortStore();
const {isNavbarOpen} = storeToRefs(useNavbarStore());
const auth = useAuthStore();
const {authToken} = storeToRefs(auth)
const navigate = useRouter();
const views = useViewStore();
const {width, height} = storeToRefs(views);

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

const modalAuth : ModalProps = {
 /*  open
        centered
        title="Gagal"
        footer={
            [
                <Button color="danger" onClick={() => navigate("/login")}>Back</Button>
            ]
        }
        > */
       open : true,
       title : "Gagal Masuk",
       centered : true
}

watch(width,() => {
  console.log("isi width nya : ", width.value)
}, {immediate : true})
</script>


<template>
  <div class="flex relative h-screen">
    <div v-if="!authToken">
      <div className="w-full h-full absolute z-[100] bg-black/10 flex items-center justify-center text-5xl text-[#1899FF]">
        <Modal v-bind="modalAuth">
          <template #footer>
            <Button  danger @click="() => navigate.push('login')" >Back</Button>
          </template>
        <p>Anda tidak dapat masuk karena belum login</p>
        </Modal>
        </div>
    </div>
    <div class="fixed h-full left-0 z-[9999] top-0">
      <Sidebar active="Home" :class="[isExpand && (width < height) ? 'z-10 ' : 'z-10']"  />
    </div>
    <div class="h-full flex-1 flex flex-col" :class="width >= 1000 ? 'ml-16' : ''">
      <div class="sticky top-0 z-999">
        <Navbar />
      </div>
      <div class="relative w-full h-full">
        <div class="absolute w-full h-full z-[2]">
          <div class="flex flex-col h-full gap-6 p-3.5">
                <ListBox />
          </div>        
        </div>
          <MiniSideBar />
      </div>
    </div>
  </div>
</template>
