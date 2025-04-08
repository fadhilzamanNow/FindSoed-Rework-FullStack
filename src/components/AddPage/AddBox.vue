<script setup lang="ts">
import { HomeOutlined, InboxOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { Flex, Steps } from 'ant-design-vue';
import { h } from 'vue';
import { Input, Select, Textarea, DatePicker, UploadDragger, Button } from 'ant-design-vue';
import BreadCrumbComp from '../BreadCrumb/BreadCrumbComp.vue';


const myItems = [
      {
        title: 'Finished',
      },
      {
        title: 'In Progress',
        icon : h(LoadingOutlined)
      },
      {
        title: 'Waiting',
       },
    ]

const option = ["Handphone","Laptop","Dompet","Lain Lain"].map((d) => {
    return {
        value : d
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
                <UploadDragger>
                    <InboxOutlined />
                    <h1>Masukkan Gambar</h1>
                </UploadDragger>
            </Flex>
            <Flex justify="end">
                <div class="w-max">
                    <Button type="primary">Submit</Button>
                </div>
            </Flex>
        </div>
    </div>
</template>