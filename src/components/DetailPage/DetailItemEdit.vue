<script setup lang="ts">
import { Avatar, Empty, Flex, Image, InputProps, message, Modal, Skeleton, SkeletonInput } from "ant-design-vue";
import {
  computed,
  defineAsyncComponent,
  nextTick,
  reactive,
  ref,
  Suspense,
  useTemplateRef,
  watch,
  watchEffect,
} from "vue";
import { Input, Select, Textarea, DatePicker, Button } from "ant-design-vue";
import type { DatePickerProps, UploadProps } from "ant-design-vue";
import { Upload } from "ant-design-vue";
import lodash from "lodash";
import { createPost, getDetailPost, itemLocationType } from "../../api/Post/Post";
import { useRoute } from "vue-router";
import BreadCrumbComp from "../BreadCrumb/BreadCrumbComp.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { CommentTypes, listComment } from "../../dummy/commentDummy";
import { Navigation, Pagination } from "swiper/modules";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CommentCard from "./CommentCard.vue";
import { createComment, getComments } from "../../api/Comment/Comment";


type PostType = {
    itemName : string,
    itemDetail : string,
    userName : string,
    itemCategory : string,
    status : string,
    images : string[],
    likeNum : number,
    commentNum : number,
    id : string,
    userProfile : string,
}

interface DetailPostTypes extends PostType {
  itemLostDate : string,
  phoneNumber : string,
  statusName : string
}


type CommentType = {
  userName: string;
  userProfile: string;
  message: string;
  created_at: string;
};

//@ts-ignore

//const LazyDetailLeafletMap = defineAsyncComponent(() => import("./DetailLeafletMap.vue"));



const mapInfo = reactive<itemLocationType>({
  latitude: null,
  longitude: null,
  locationName: null,
});


const commentListItem = ref<Array<CommentTypes>>(listComment())
const isModalOpen = ref<boolean>(false);
const commentVal = ref<string>("");
const isBeingSent = ref<boolean>(false);
const route = useRoute();
const postDetail = ref<DetailPostTypes>();
const isCommentLoading = ref(true);
const postComment = ref<CommentType[]>([]);
const isModalOpenMap = ref(false);






const findDetailUserPost = async (id : string) => {
  try{
    const response = await getDetailPost(id);
    if(response){
      postDetail.value = response.data
      isBeingSent.value = true
    }
    console.log("isi response : ", response.data)
  }catch(e){
  }
}

const handleGetPostComment = async () => {
  try{
    isCommentLoading.value = true
    const response = await getComments(postDetail.value?.id as string)
    if(response){
      postComment.value = response.data
      isCommentLoading.value = false
    }
  }catch(e){

  }
}

watchEffect(() => {
  /* if(route.params.id){
    findDetailUserPost(route.params.id as string)

  } */
 console.log(route.params)
 if(route.params.id){
  console.log("id : ", route.params.id)
  findDetailUserPost(route.params.id as string)
 }
})



const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const toggleModalMap = () => {
  isModalOpenMap.value = !isModalOpenMap.value
}

  




</script>

<template>
  
  <div class="md:ml-16 mt-16 pt-5.5 px-4 sm:px-6 md:px-8">
  <BreadCrumbComp title="Detail Barang" />
  </div>

  <!-- KOTAK -->
 
</template>


