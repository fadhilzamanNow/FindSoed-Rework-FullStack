<script setup lang="ts">
import { Flex, Image, message, Modal } from "ant-design-vue";
import {
  computed,
  defineAsyncComponent,
  reactive,
  ref,
  Suspense,
  watch,
  watchEffect,
} from "vue";
import { Input, Select, Textarea, DatePicker, Button } from "ant-design-vue";
import type { DatePickerProps, UploadProps } from "ant-design-vue";
import { Upload } from "ant-design-vue";
import lodash from "lodash";
import { createPost, getDetailPost, itemLocationType } from "../../api/Post/Post";
import { useRoute, useRouter } from "vue-router";
import BreadCrumbComp from "../BreadCrumb/BreadCrumbComp.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { CommentTypes, listComment } from "../../dummy/commentDummy";
import { Navigation } from "swiper/modules";


//@ts-ignore
import("swiper/css");
//@ts-ignorea
import("swiper/css/navigation");


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
    userProfile : string
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






const findDetailUserPost = async (id : string) => {
  try{
    const response = await getDetailPost(id);
    if(response){
      postDetail.value = response.data
      isBeingSent.value = true
    }
  }catch(e){
    Modal.error({
      title : "Gagal mendapatkan Informasi Detail",
      zIndex : 99999
    })
  }
}

watchEffect(() => {
  if(route.params.id){
    findDetailUserPost(route.params.id as string)
  }
})


</script>

<template>
  
  <div class="md:ml-16 mt-16 pt-5.5 px-4 sm:px-6 md:px-8">
  <BreadCrumbComp title="Tambah Barang" />
  <!-- KOTAK -->
  <div class="md:max-w-2xl mx-auto border ">
    <!-- FOTO + DETAIL  -->
    <div class="flex gap-2 h-full">
      <!-- FOTO -->
      <Swiper
        :slides-per-view="1"
        :space-between="0"
        :pagination="{clickable : true}"
        navigation
        :scrollbar="{draggable : true}"
        :modules="[Navigation]"
        class="h-full border "
      >
        <SwiperSlide v-for="(v,i) in postDetail?.images" :key="i" class="h-full">
          <Image :src="`http://localhost:3500/static/images/${v}`" width="" class="h-[200px] w-[300px] border-2 border-green-500"/>
        </SwiperSlide>
      </Swiper>
      <!-- DETAIL -->
      <div class="flex flex-col gap-5 w-full">
            <Flex
              gap="10"
              align="center"
              class="w-full sm:min-w-[400px] border-b border-b-[#D8D5D5] pb-2"
            >
              <Avatar v-if="postDetail?.userProfile" :src="`http://localhost:3500/static/images/${postDetail.userProfile}`" shape="square" />
              <Avatar v-else>{{ postDetail?.userName.slice(0,2) }}</Avatar>
              <span class="text-[#6b6969] text-xs">{{ postDetail?.userName}}</span>
            </Flex>
            <div class="grid grid-cols-2">
              <Flex vertical gap="4">
                <h1 class="text-xs font-medium">Nama</h1>
                <span class="font-light text-xs">{{postDetail?.itemName}}</span>
              </Flex>
              <Flex vertical gap="4">
                <h1 class="text-xs font-medium">Kategori</h1>
                <span class="font-light text-xs">{{postDetail?.itemCategory}}</span>
              </Flex>
            </div>
            <div class="grid grid-cols-2">
              <Flex vertical gap="4">
                <h1 class="text-xs font-medium">Tanggal Hilang</h1>
                <span class="font-light text-xs">{{postDetail?.itemLostDate}}</span>
              </Flex>
              <Flex vertical gap="4">
                <h1 class="text-xs font-medium">Status Barang</h1>
                <span :class="['px-2 py-0.5 rounded-md text-white  max-w-max text-xs', postDetail?.statusName === 'Hilang' ? 'bg-red-500' : 'bg-green-400']">{{postDetail?.statusName}}</span>
              </Flex>
            </div>
            <Flex vertical gap="4" class="border-b border-b-[#D8D5D5] pb-2 ">
              <h1 class="text-xs font-medium">Detail</h1>
              <Button
                type="primary"
                class="font-light text-xs max-w-max px-2 py-1 rounded-sm select-none"
                @click="toggleModal"
                size="small"
                :style="{ fontSize: '12px' }"
                >Lihat Detail</Button
              >
            </Flex>
        </div>
    </div>
  </div>
</div>

</template>


