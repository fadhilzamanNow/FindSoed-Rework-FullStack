<script setup lang="ts">
import { Flex, message, Modal } from "ant-design-vue";
import {
  computed,
  defineAsyncComponent,
  reactive,
  ref,
  Suspense,
  watch,
} from "vue";
import { Input, Select, Textarea, DatePicker, Button } from "ant-design-vue";

import type { DatePickerProps, UploadProps } from "ant-design-vue";
import { Upload } from "ant-design-vue";

import { isEmpty } from "underscore";
import { createPost, itemLocationType } from "../../api/Post/Post";
import { useRouter } from "vue-router";
import BreadCrumbComp from "../BreadCrumb/BreadCrumbComp.vue";


//@ts-ignore

const mapInfo = reactive<itemLocationType>({
  latitude: null,
  longitude: null,
  locationName: null,
});
const itemName = ref<string>("");
const itemCategory = ref<string>();
const itemDescription = ref<string>("");
const itemDate = ref<string | string[]>();





const LazyLeafletMap = defineAsyncComponent(() => import("./LeafletMap.vue"));

watch(mapInfo, (newValue) => {
  console.log('Parent mapInfo changed:', JSON.stringify(newValue));
}, { deep: true });

const navigate = useRouter();

const option = ["Handphone", "Laptop", "Dompet", "Lain Lain"].map((d) => {
  return {
    value: d,
  };
});

const fileList = ref<UploadProps["fileList"]>([]);

const handleRemove: UploadProps["onRemove"] = (file) => {
  const index = fileList?.value?.indexOf(file);
  const newFileList = fileList?.value?.slice();
  newFileList?.splice(index as number, 1);
  fileList.value = newFileList;
};

const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  const isPNG = file.type === "image/png" || file.type === "image/jpeg";
  if (isPNG) {
    console.log("masuk");
    console.log("isi file : ", file);
    fileList.value = [...(fileList.value || []), file];
    return false;
  } else {
    message.error(`File bukan sebuah gambar`);
    return false || Upload.LIST_IGNORE;
  }
};



const isDisabled = computed(() => {
  return !isEmpty(itemName.value && itemCategory.value);
});


const handleSubmit = async () => {
  try {
    const newPost = new FormData();
    newPost.append("itemName", itemName.value);
    newPost.append("itemCategory", itemCategory.value as string);
    newPost.append("itemDetail", itemDescription.value);
    newPost.append("itemLostDate", itemDate.value as string);
    newPost.append("itemLatitude", String(mapInfo?.latitude));
    newPost.append("itemLongitude", String(mapInfo?.longitude));
    newPost.append("locationName", mapInfo?.locationName as string);
    if (fileList.value) {
      fileList.value.forEach((v) => {
        //@ts-ignore
        console.log("isi file list : ", v.originFileObj);
        //@ts-ignore
        newPost.append("postImage", v.originFileObj);
      });
    }

    const response = await createPost(newPost);
    if (response) {
      Modal.success({
        title: "Barang Hilang Ditambahkan",
        content: "Barang berhasil ditambahkan",
        centered: true,
        zIndex: 999999,
        onOk: () => {
          navigate.push("/home");
        },
      });
    }
  } catch (err: any) {
    console.log("isi err : ", err);
    Modal.error({
      title: "Barang Gagal Ditambahkan",
      //@ts-ignore
      content: err.message.message,
      centered: true,
      zIndex: 999999,
    });
  }
};

const dateProps: DatePickerProps = {
  format: "YYYY-MM-DD",
  onChange: (_, date) => (itemDate.value = date),
};


</script>

<template>
  
  <div class="md:ml-16 mt-16 pt-5.5 px-4 sm:px-6 md:px-8">
  <BreadCrumbComp title="Tambah Barang" />
  <div class="flex flex-col h-full">
    <div class="flex flex-col items-center justify-center gap-6 w-full">
      <div
        class="flex flex-col gap-4  sm:max-w-[800px] sm:border-gray-200 w-full justify-center rounded-md pt-4"
      >
        <Flex vertical class="w-full" gap="8">
          <label for="item" @click="() => console.log('file list : ', fileList)"
            >Nama Barang</label
          >
          <Input placeholder="Nama Barang" v-model:value="itemName" />
        </Flex>
        <Flex vertical class="w-full" gap="8">
          <label for="item">Kategori Barang</label>
          <Select
            placeholder="Pilih Kategori Barang"
            :options="option"
            v-model:value="itemCategory"
          />
        </Flex>
        <Flex vertical class="w-full" gap="8">
          <label for="item">Deskripsi Barang</label>
          <Textarea
            placeholder="Deskripsi Barang"
            v-model:value="itemDescription"
          />
        </Flex>
        <Flex vertical class="w-full" gap="8">
          <label for="item">Tanggal Kehilangan</label>
          <DatePicker
            placement="bottomRight"
            @change="(_, e) => (itemDate = e)"
            format="YYYY-MM-DD"
          />
        </Flex>
        <Flex vertical class="w-full" gap="8">
          <label for="item">Foto Barang</label>
          <div class="h-[10vh] overflow-auto">
            <Upload
              v-model:file-list="fileList"
              list-type="picture"
              :before-upload="beforeUpload"
              @remove="handleRemove"
              :default-file-list="fileList"
              accept=".png,.jpeg,.jpg"
            >
              <Button>Upload Gambar</Button>
            </Upload>
          </div>
        </Flex>
       
           <Suspense>
            <LazyLeafletMap :mapInfo="mapInfo"/>
           </Suspense>
         

        <Flex justify="end">
          <div class="w-max">
            <Button type="primary" @click="handleSubmit" :disabled="false" >Submit</Button>
          </div>
        </Flex>
      </div>
    </div>
  </div>
</div>

</template>


