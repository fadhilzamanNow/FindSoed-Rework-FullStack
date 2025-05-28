<script setup lang="ts">
import { LoadingOutlined } from "@ant-design/icons-vue";
import { Flex, message, Modal } from "ant-design-vue";
import {
  computed,
  h,
  onMounted,
  reactive,
  ref,
  toRaw,
  useTemplateRef,
  watchEffect,
} from "vue";
import { Input, Select, Textarea, DatePicker, Button } from "ant-design-vue";
import MarkerPic from "../../assets/marker.png";
import { debounce, isNull } from "lodash";
import type { DatePickerProps, InputProps, UploadProps } from "ant-design-vue";
import { Upload } from "ant-design-vue";
import axios from "axios";
import leaflet, { LeafletEvent, LeafletMouseEvent, Map, Marker } from "leaflet";
import "@geoapify/leaflet-address-search-plugin";
import { isEmpty } from "underscore";
import { createPost, itemLocationType } from "../../api/Post/Post";
import { useRouter } from "vue-router";
import { ChangeEvent } from "ant-design-vue/es/_util/EventInterface";
import BreadCrumbComp from "../BreadCrumb/BreadCrumbComp.vue";

//@ts-ignore
import("leaflet/dist/leaflet.css");

const mapInfo = reactive<itemLocationType>({
  latitude: null,
  longitude: null,
  locationName: null,
});
const itemName = ref<string>("");
const itemCategory = ref<string>();
const itemDescription = ref<string>("");
const itemDate = ref<string | string[]>();
const searchMap = ref<string>("");
const searchResult = ref<any>();
const showSearhResult = ref<boolean>(false);
const debounceSearch = debounce((search: string) => {
  if (searchMap.value.length > 0) {
    findMap(searchMap.value);
  }
}, 1000);

const myMap = ref<Map | null>(null);
const myMarker = ref<Marker | null>(null);

const mapRef = useTemplateRef("leafletMap");

const navigate = useRouter();

const findMap = async (location: string) => {
  console.log("Lokasi yang sedang dicari : ", location);
  showSearhResult.value = true;
  searchResult.value = null;
  const response = await axios.get(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&apiKey=55d95c9e97af4327b7ce93cabfdc35bd&format=json&limit=10&lang=id`
  );
  console.log(response.data.results);
  searchResult.value = response.data.results.map((v: any, i: number) => {
    return {
      id: i,
      lat: v.lat,
      lon: v.lon,
      formatted: v.formatted,
    };
  });
  console.log(searchResult.value);
};

const handleSearch = (search: string) => {
  searchMap.value = search;
  debounceSearch(search);
};

const option = ["Handphone", "Laptop", "Dompet", "Lain Lain"].map((d) => {
  return {
    value: d,
  };
});

onMounted(() => {
  if (mapRef.value) {
    myMap.value = leaflet
      .map(mapRef.value, { zoomControl: false })
      .setView(
        [
          mapInfo?.latitude ? mapInfo?.latitude : -7.428846146037751,
          mapInfo?.longitude ? mapInfo?.longitude : 109.34005811432314,
        ],
        10
      );
    const customMarker = leaflet.icon({
      iconUrl: MarkerPic,
      iconSize: [35, 35],
    });
    leaflet
      .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      })
      .addTo(myMap.value as Map);

    myMarker.value = leaflet
      .marker(
        [
          mapInfo.latitude ? mapInfo.latitude : -7.397339842404089,
          mapInfo.longitude ? mapInfo.longitude : 109.35116941228598,
        ],
        { icon: customMarker, draggable: false }
      )
      .addTo(myMap.value as Map);
    //map.addControl(addressSearchControl);
    leaflet.control.zoom({ position: "bottomright" }).addTo(myMap.value as Map);
  }

  myMap.value?.on("click", (e: LeafletMouseEvent) => {
    if (myMarker.value) {
      console.log("test");
      myMarker.value.setLatLng({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    }
    mapInfo.latitude = e.latlng.lat;
    mapInfo.longitude = e.latlng.lng;
    mapInfo.locationName = null;
  });
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

const inputMapProps = computed<InputProps>(() => ({
  placeholder: mapInfo.locationName
    ? mapInfo.locationName
    : mapInfo.latitude && mapInfo.longitude
    ? `${mapInfo.latitude},${mapInfo.longitude}`
    : "Cari Lokasi",
  onInput: (e: ChangeEvent) =>
    handleSearch((e.target as HTMLInputElement).value),
  value: searchMap.value,
}));

const isDisabled = computed(() => {
  return !isEmpty(itemName.value && itemCategory.value);
});

console.log("isi file list : ", fileList.value);

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

const handleChooseMap = (data: any) => {
  console.log("isi data : ", toRaw(data));
  if (myMarker.value && myMap.value) {
    mapInfo.latitude = data.lat;
    mapInfo.longitude = data.lon;
    mapInfo.locationName = data.formatted;
  }

  myMarker.value?.setLatLng({
    lat: data.lat,
    lng: data.lon,
  });

  myMap.value
    ?.setView({
      lat: data.lat,
      lng: data.lon,
    })
    .getZoom();
  searchMap.value = "";
  showSearhResult.value = !showSearhResult.value;
};

watchEffect(() => {
  console.log(
    "map Inf : ",
    mapInfo.locationName
      ? mapInfo.locationName
      : mapInfo.latitude && mapInfo.longitude
      ? `${mapInfo.latitude},${mapInfo.longitude}`
      : "Cari Lokasi"
  );
});

const handleReset = () => {
  searchMap.value = "";
};
</script>

<template>
  <div class="flex flex-col h-full">
    <BreadCrumbComp title="Tambah Barang" />

    <div class="flex flex-col items-center justify-center gap-6 w-full">
      <div
        class="flex flex-col gap-4 sm:border sm:max-w-[640px] sm:border-gray-200 w-full justify-center rounded-md sm:p-4"
      >
        <!--  <Steps :current="0" :items="myItems.reverse()" size="small"  label-placement="vertical" direction="horizontal" type="navigation" progress-dot /> -->
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
        <Flex vertical class="w-full" gap="8">
          <label for="item" @click="() => handleReset()"
            >Lokasi Kehilangan</label
          >
          <div class="w-full h-[20vh] relative">
            <div class="absolute z-[2] top-0 left-0 mt-1 ml-2">
              <div class="w-[250px] md:w-[350px]">
                <div class="relative h-max">
                  <div>
                    <Input.Search
                      class="relative z-[2]"
                      enter-button
                      v-bind="inputMapProps"
                    />
                  </div>
                  <div
                    class="max-h-[10vh] bg-white rounded-md p-2 flex flex-col overflow-auto text-xs"
                    v-if="searchMap.length > 0 && showSearhResult"
                  >
                    <div v-if="searchResult">
                      <div v-if="searchResult.length > 0">
                        <div
                          v-for="(v, i) of searchResult"
                          class="hover:bg-slate-100 bg-white transition-all duration-100 ease-in p-1 rounded-md cursor-pointer"
                          :key="i"
                          @click="handleChooseMap(v)"
                        >
                          {{ v.formatted }}
                        </div>
                      </div>
                      <div v-else>
                        <div class="flex flex-col justify-center items-center">
                          Lokasi yang kamu cari tidak tersedia
                        </div>
                      </div>
                    </div>
                    <div v-else class="flex justify-center">
                      <LoadingOutlined />
                    </div>
                  </div>
                </div>
                <div
                  v-if="false"
                  class="h-[120px] bg-white overflow-y-scroll p-2"
                ></div>
              </div>
            </div>
            <div
              ref="leafletMap"
              id="map"
              class="w-full h-full rounded-md z-[1]"
            ></div>
          </div>
        </Flex>

        <Flex justify="end">
          <div class="w-max">
            <Button type="primary" @click="handleSubmit">Submit</Button>
          </div>
        </Flex>
      </div>
    </div>
  </div>
</template>


