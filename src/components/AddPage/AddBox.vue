<script setup lang="ts">
import {  LoadingOutlined } from '@ant-design/icons-vue';
import { Flex, message, Steps } from 'ant-design-vue';
import { computed, h, onMounted, reactive, ref } from 'vue';
import { Input, Select, Textarea, DatePicker, Button } from 'ant-design-vue';
import MarkerPic from "../../assets/marker.png"
import { debounce } from 'lodash';
import type { UploadProps } from 'ant-design-vue';
import { Upload } from 'ant-design-vue';
import axios from "axios";
import leaflet, { LeafletEvent, Map, Marker } from "leaflet";
import '@geoapify/leaflet-address-search-plugin';
//@ts-ignore
import("leaflet/dist/leaflet.css");


const mapInfo = reactive<{lat : number | null, lon : number | null, formatted : string | null | undefined}>({
    lat : null,
    lon : null,
    formatted : null
})
const itemName = ref<string>("");
const itemCategory = ref<string >("");
const itemDescription = ref<string>("");
const itemDate = ref<string>("");
const searchMap = ref<string>("");
const searchResult = ref<any>()
const showSearhResult = ref<boolean>(false);

const debounceSearch = debounce((search : string) => {
    searchMap.value = search
    console.log("CARI : ", search)
    if(searchMap.value.length > 0){
        findMap(searchMap.value)
    }
},1000)


const findMap = async (location : string) => {
    console.log("Lokasi yang sedang dicari : ", location)
    showSearhResult.value = true
    searchResult.value = null
    const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${location}&apiKey=55d95c9e97af4327b7ce93cabfdc35bd&format=json&limit=10&lang=id`)
    console.log(response.data.results)
    searchResult.value =  response.data.results.map((v : any,i : number) => {
        return {
            id : i,
            lat : v.lat,
            lon : v.lon,
            formatted : v.formatted
        }
    })
    console.log(searchResult.value)
}

const handleSearch = (e : Event) => {
    const search = (e.target as HTMLInputElement).value
    debounceSearch(search);
}

const option = ["Handphone","Laptop","Dompet","Lain Lain"].map((d) => {
    return {
        value : d
    }
})
let map : Map;
let marker : Marker ;

const setNewMarker = (v : any) => {
   console.log("Isi Data : ", v.lat, " ", v.lon)
   showSearhResult.value = false
   marker.setLatLng([v.lat,v.lon]).addTo(map)
   map.setView([v.lat,v.lon],15)
   mapInfo.lat = v.lat,
   mapInfo.lon = v.lon,
   mapInfo.formatted = v.formatted

}

const moveMarkerHandler = async (e : LeafletEvent) => {
    const response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${e.target._latlng.lat}&lon=${e.target._latlng.lng}&apiKey=55d95c9e97af4327b7ce93cabfdc35bd`);
    console.log("isi response : ", response.data.features[0].properties.formatted)
    mapInfo.lat = e.target._latlng.lat
    mapInfo.lon = e.target._latlng.lng
    mapInfo.formatted = response.data.features[0].properties.formatted
}

onMounted(() => {

    map = leaflet.map('map',{zoomControl : false}).setView([-7.428846146037751, 109.34005811432314],10)
    const customMarker = leaflet.icon({
        iconUrl : MarkerPic,
        iconSize : [35,35]
    })
    leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    //@ts-ignore
    const addressSearchControl = L.control.addressSearch('55d95c9e97af4327b7ce93cabfdc35bd', {
     position: 'topleft',
     lang : 'id',
    placeholder : 'Cari Lokasi',
    //className : 'custom-address-field font-itim flex items-center bg-white px-2 text-sm !max-w-[100px]',
    className: 'custom-address-field focus:outline-none',
    resultsLimit : 3,
    debounceDelay : 1000,
    noResultsPlaceholder : "Lokasi tidak ditemukan",
    minTextLength : 1,
    suggestionsCallback: (suggestions : any) => {
        console.log(suggestions);
    }
    });
        
   
    marker = leaflet.marker([-7.397339842404089, 109.35116941228598], {icon : customMarker, draggable : true}).addTo(map)
    marker.on('moveend', moveMarkerHandler)
    //map.addControl(addressSearchControl);
    leaflet.control.zoom({ position: 'bottomright' }).addTo(map)
})

const fileList = ref<UploadProps['fileList']>([]);

const handleRemove : UploadProps['onRemove'] = file => {
  const index = fileList?.value?.indexOf(file);
  const newFileList = fileList?.value?.slice();
  newFileList?.splice(index as number, 1);
  fileList.value = newFileList;
};

const beforeUpload : UploadProps['beforeUpload'] = file => {
  const isPNG = file.type === "image/png" || file.type === "image/jpeg";
  if(isPNG){
     console.log("masuk")
      fileList.value = [...(fileList.value || []), file];
      return false
  }else{
    message.error(`File bukan sebuah gambar`)
    return false || Upload.LIST_IGNORE
  }
};

const handleSubmit = () => {
    const formData = new FormData();
    formData.append('itemName', itemName.value )
    formData.append('itemCategory', itemCategory.value)
    formData.append('itemDescription', itemDescription.value)
    formData.append('itemDate', itemDate.value)
    fileList?.value?.forEach((file) => {
        formData.append('files[]', file as any);
    });
    console.log('isi form Data : ', formData)
}

const isDisabled = computed(() => {
     if(itemName.value && itemCategory.value && itemDescription.value && itemDate.value && fileList.value?.length){
        return false;
     }else{
        return true
     }
})

</script>

<template>
    <div class="flex  flex-col items-center justify-center  gap-6  w-full " >
        <div  class="flex flex-col gap-4 sm:border sm:max-w-[640px] sm:border-gray-200 w-full justify-center  rounded-md sm:p-4">
           <!--  <Steps :current="0" :items="myItems.reverse()" size="small"  label-placement="vertical" direction="horizontal" type="navigation" progress-dot /> -->
            <Flex vertical class="w-full " gap="8">
                <label for="item">Nama Barang</label>
                <Input placeholder="Nama Barang" />
            </Flex>
            <Flex vertical class="w-full " gap="8">
                <label for="item">Kategori Barang</label>
                <Select placeholder="Pilih Kategori Barang" :options="option" />
            </Flex>
            <Flex vertical class="w-full " gap="8">
                <label for="item">Deskripsi Barang</label>
                <Textarea placeholder="Deskripsi Barang"  />
            </Flex>
            <Flex vertical class="w-full " gap="8">
                <label for="item">Tanggal Kehilangan</label>
                <DatePicker format="YYYY-MM-DD" placement="bottomRight" />
            </Flex>
            <Flex vertical class="w-full" gap="8">
                <label for="item">Foto Barang</label>
                <div class="h-[10vh] overflow-auto">
                    <Upload v-model:file-list="fileList" list-type="picture" :before-upload="beforeUpload" @remove="handleRemove">
                        <Button>Upload Gambar</Button> 
                    </Upload>
                </div>
            </Flex>
            <Flex vertical class="w-full" gap="8">
                <label for="item">Lokasi Kehilangan</label>
                <div class="w-full h-[20vh] relative">
                    <div class="absolute z-[2] top-0 left-0 mt-1 ml-2 ">
                        <div class="w-[250px] md:w-[350px]">
                            <div class="relative h-max">
                                <div>
                                    <Input.Search :placeholder="mapInfo.formatted ? mapInfo.formatted : 'Masukkan Lokasi'" @input="(e : Event) => handleSearch(e)" class="relative z-[2]" enter-button :value="mapInfo.formatted ? mapInfo.formatted : searchMap" />
                                </div>
                                <div class="max-h-[10vh] bg-white rounded-md p-2 flex flex-col overflow-auto text-xs" v-if="searchMap.length > 0 && showSearhResult" >
                                    <div v-if="searchResult" >
                                        <div v-if="searchResult.length > 0">
                                            <div v-for="(v,i) of searchResult" class="hover:bg-slate-100 bg-white transition-all duration-100 ease-in p-1 rounded-md cursor-pointer" :key="i" @click="() => setNewMarker(v)">
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
                            <div v-if="false" class="h-[120px] bg-white overflow-y-scroll p-2">

                            </div>
                        </div>
                    </div>
                <div ref="leafletMap" id="map" class="w-full h-full rounded-md z-[1]">
                   
                </div>
            </div>
            </Flex>
           
            <Flex justify="end">
                <div class="w-max">
                    <Button type="primary" @click="handleSubmit" :disabled="isDisabled">Submit</Button>
                </div>
            </Flex>
        </div>
    </div>
</template>

<style>

.geoapify-leaflet-control  {
  border: 5px solid #ff5722;
  border-radius: 10px;
  background: white !important;
  padding-inline: 8px;
  
}

.custom-address-field .geoapify-address-input {
  line-height: 36px;
  height: 20px;
  font-size: 16px;
  outline: none;
  padding-inline: 6px;

}

.custom-address-field .geoapify-clear-button {
    height: 0px;
    visibility: hidden;
    display: hidden !important;
}

.geoapify-clear-button{
    display:  hidden !important;
}

.geoapify-autocomplete-items {
    display: block;
    font-size : 4px !important;
    padding: 4px;
}

.result {
    font-size : 8px;
    cursor: pointer;
    padding-inline: 4px;
    border-radius: 6px;
}

.result:hover{
    background: rgb(185, 185, 185);

}

.custom-address-field .address {
  font-size: 14px;
}      
</style>