<script setup lang="ts">
import { watchEffect } from "vue";
import { getAllPost } from "../../api/Post/Post";
import { useAuthStore } from "../../stores/authStore";
import { usePostStore } from "../../stores/postStore";
import HeaderListPage from "./HeaderListPage.vue";
import ListCard from "./ListCard.vue";

const post = usePostStore()



const getAllPostData = async () => {
  try{
    const response = await getAllPost()
    if(response){
      post.setPost(response.data)
    }
  }catch(e){
    post.setPost([])
  }
}

watchEffect(() => {
  getAllPostData()
})


</script>

<template>
  <div class="flex flex-col  gap-6">
    <div>
      <HeaderListPage />
    </div>
    <div class="max-h-full">
      <ListCard />
    </div>
  </div>
</template>

