<script setup lang="ts">
import { message, Modal } from "ant-design-vue";
import { computed, defineAsyncComponent, reactive, ref } from "vue";
import { Input, Select, Textarea, DatePicker, Button } from "ant-design-vue";
import type { DatePickerProps, UploadProps } from "ant-design-vue";
import { Upload } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import { isEmpty } from "ramda";
import { createPost, itemLocationType } from "../../api/Post/Post";
import { useRouter } from "vue-router";
import { CustomErrorResponse } from "../../api/baseApi";

const mapInfo = reactive<itemLocationType>({
  latitude: null,
  longitude: null,
  locationName: null,
});
const itemName = ref("");
const itemCategory = ref<string>();
const itemDescription = ref("");
const itemDate = ref<string | string[]>();
const fieldErrors = ref<Record<string, string>>({});

const LazyLeafletMap = defineAsyncComponent(() => import("./LeafletMap.vue"));

const navigate = useRouter();

const option = ["Handphone", "Laptop", "Dompet", "Kartu", "Lain Lain"].map(
  (d) => ({
    value: d,
  })
);

const fileList = ref<UploadProps["fileList"]>([]);

const handleRemove: UploadProps["onRemove"] = (file) => {
  const index = fileList?.value?.indexOf(file);
  const newFileList = fileList?.value?.slice();
  newFileList?.splice(index as number, 1);
  fileList.value = newFileList;
};

const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  const isImage = file.type === "image/png" || file.type === "image/jpeg";
  if (isImage) {
    fileList.value = [...(fileList.value || []), file];
    return false;
  } else {
    message.error(`File bukan sebuah gambar`);
    return false || Upload.LIST_IGNORE;
  }
};

const isDisabled = computed(() => {
  return (
    !isEmpty(
      itemName.value &&
        itemCategory.value &&
        itemDescription.value &&
        itemDate.value
    ) &&
    mapInfo.latitude &&
    (fileList.value?.length as number) > 0
  );
});

const handleSubmit = async () => {
  fieldErrors.value = {};

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
        newPost.append("postImage", v as any);
      });
    }

    const response = await createPost(newPost);
    if (response) {
      Modal.success({
        title: "Barang Hilang Ditambahkan",
        content: response.message,
        centered: true,
        zIndex: 999999,
        onOk: () => navigate.push("/home"),
      });
    }
  } catch (err) {
    const e = err as CustomErrorResponse;
    if (e.errors) {
      fieldErrors.value = e.errors;
    } else {
      Modal.error({
        title: "Barang Gagal Ditambahkan",
        content: e.message,
        centered: true,
        zIndex: 999999,
      });
    }
  }
};

const handlePickLocation = (info: itemLocationType) => {
  mapInfo.latitude = info.latitude;
  mapInfo.longitude = info.longitude;
  mapInfo.locationName = info.locationName;
};
</script>

<template>
  <div
    class="md:ml-16 mt-16 md:mt-0 min-h-screen bg-gray-50 py-8 px-4 sm:px-6 md:px-8"
  >
    <div class="max-w-2xl mx-auto">
      <!-- Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-xl font-bold text-gray-800">
            Laporkan Barang Hilang
          </h1>
          <p class="text-gray-500 mt-2 text-lg">
            Isi detail barang yang hilang
          </p>
        </div>

        <!-- Form -->
        <div class="flex flex-col gap-5">
          <!-- Nama Barang -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">Nama Barang</label>
            <Input
              v-model:value="itemName"
              placeholder="Masukkan nama barang"
              size="large"
              :status="fieldErrors.itemName ? 'error' : undefined"
            />
            <span v-if="fieldErrors.itemName" class="text-red-500 text-xs">{{
              fieldErrors.itemName
            }}</span>
          </div>

          <!-- Kategori -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700"
              >Kategori Barang</label
            >
            <Select
              v-model:value="itemCategory"
              placeholder="Pilih kategori"
              :options="option"
              size="large"
              :status="fieldErrors.itemCategory ? 'error' : undefined"
            />
            <span
              v-if="fieldErrors.itemCategory"
              class="text-red-500 text-xs"
              >{{ fieldErrors.itemCategory }}</span
            >
          </div>

          <!-- Deskripsi -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700"
              >Deskripsi Barang</label
            >
            <Textarea
              v-model:value="itemDescription"
              placeholder="Jelaskan ciri-ciri barang"
              :rows="3"
              :status="fieldErrors.itemDetail ? 'error' : undefined"
            />
            <span v-if="fieldErrors.itemDetail" class="text-red-500 text-xs">{{
              fieldErrors.itemDetail
            }}</span>
          </div>

          <!-- Tanggal -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700"
              >Tanggal Kehilangan</label
            >
            <DatePicker
              format="YYYY-MM-DD"
              @change="(_, date) => (itemDate = date)"
              placement="bottomRight"
              size="large"
              class="w-full"
            />
          </div>

          <!-- Upload Foto -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700">Foto Barang</label>
            <Upload
              :before-upload="beforeUpload"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
              accept=".png,.jpeg,.jpg"
              multiple
            >
              <Button size="large">
                <template #icon><UploadOutlined /></template>
                Upload Gambar
              </Button>
            </Upload>
            <span v-if="fieldErrors.postImage" class="text-red-500 text-xs">{{
              fieldErrors.postImage
            }}</span>
          </div>

          <!-- Map -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-gray-700"
              >Lokasi Kehilangan</label
            >
            <LazyLeafletMap
              :mapInfo="mapInfo"
              @handle-pick-location="handlePickLocation"
            />
            <span
              v-if="fieldErrors.itemLatitude"
              class="text-red-500 text-xs"
              >{{ fieldErrors.itemLatitude }}</span
            >
          </div>

          <!-- Submit -->
          <Button
            type="primary"
            size="large"
            @click="handleSubmit"
            :disabled="!isDisabled"
            class="w-full mt-2 !h-11 !rounded-lg !font-semibold"
          >
            Laporkan Barang
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
