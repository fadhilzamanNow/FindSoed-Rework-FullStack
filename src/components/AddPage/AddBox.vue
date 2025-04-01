<script setup lang="ts">
import { InboxOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { Flex, Steps } from 'ant-design-vue';
import { h } from 'vue';
import { Input, Select, Textarea, DatePicker, UploadDragger, Button } from 'ant-design-vue';

const description = 'This is a description.';

const myItems = [
      {
        title: 'Finished',
        description,
      },
      {
        title: 'In Progress',
        description,
        icon : h(LoadingOutlined)
      },
      {
        title: 'Waiting',
        description,
      },
    ]

const option = ["Handphone","Laptop","Dompet","Lain Lain"].map((d) => {
    return {
        value : d
    }
})
</script>

<template>
    <Flex class="p-10.5" vertical justify="center" align="center" gap="40">
        <div class="w-[800px] text-[8px]" >
            <Steps :current="2" :items="myItems"  />
        </div>
        <Flex vertical gap="16">
            <Flex vertical class="w-[400px]" gap="8">
                <label for="item">Nama Barang</label>
                <Input placeholder="Nama Barang" />
            </Flex>
            <Flex vertical class="w-[400px]" gap="8">
                <label for="item">Kategori Barang</label>
                <Select placeholder="Pilih Kategori Barang" :options="option" />
            </Flex>
            <Flex vertical class="w-[400px]" gap="8">
                <label for="item">Deskripsi Barang</label>
                <Textarea placeholder="Deskripsi Barang"  />
            </Flex>
            <Flex vertical class="w-[400px]" gap="8">
                <label for="item">Tanggal Kehilangan</label>
                <DatePicker format="YYYY-MM-DD" placement="bottomRight" />
            </Flex>
            <Flex vertical class="w-[400px]" gap="8">
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
        </Flex>

    </Flex>
</template>