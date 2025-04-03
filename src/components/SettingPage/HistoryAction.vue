<script lang="ts" setup>
import { DeleteOutlined, EditOutlined, EyeOutlined, InboxOutlined, WarningFilled, WarningOutlined } from '@ant-design/icons-vue';
import { Button, DatePicker, Flex, Input, Modal, Select, Textarea, UploadDragger } from 'ant-design-vue';
import { h, reactive, ref, toRaw, watchEffect } from 'vue';
import { myItem } from '../../dummy/historyLost';

const {record} = defineProps<{record  : myItem}>();

const isModalOpen = ref<boolean>(false);
const isEditOpen = ref<boolean>(false);
const isDeleteOpen = ref<boolean>(false);

const oldData = reactive({
    title : record.title,
    status : record.status,
    category : record.category
})

watchEffect(() => {
    console.log("is Modal Open ? : ", isModalOpen)
})

const recordItem : myItem = toRaw(record);

const option = ["Handphone","Laptop","Dompet","Lain Lain"].map((d) => {
    return {
        value : d
    }
})

const optionStatus = ["Hilang","Ditemukan"].map((d) => {
    return {
        value : d
    }
})



</script>

<template>
    <Flex class="max-w-max" gap="8" align="center">
        <Button type="primary" @click="() => isModalOpen = !isModalOpen">
            <Flex align="center" gap="8">
                <EyeOutlined  />
                <span>See</span>
            </Flex>
        </Button>
        <Button type="primary" class="flex align-center justify-center text-white !bg-yellow-400 hover:!bg-yellow-300 transition duration-50" @click="() => isEditOpen = !isEditOpen">
            <Flex align="center" gap="8">
                <EditOutlined />
                <span>Edit</span>
            </Flex>
        </button>
        <Button type="primary" danger @click="() => isDeleteOpen = !isDeleteOpen">
            <Flex align="center" gap="8">
                <DeleteOutlined />
                <span>Delete</span>
            </Flex>
        </Button>
    </Flex>
    <Modal v-model:visible="isModalOpen" @ok="() => isModalOpen = !isModalOpen" :centered="true" :title="oldData.title" :footer="null">
        <Flex vertical gap="20" ">
        <div class="grid grid-cols-2">
                    <Flex vertical gap="4">
                        <h1 class="text-xs font-medium">Kategori</h1>
                        <span class="font-light text-xs">Handphone</span>
                    </Flex>
                    <Flex vertical gap="4">
                        <h1 class="text-xs font-medium">Kontak</h1>
                        <span class="font-light text-xs">089503908873</span>
                    </Flex>
                </div>
                <div class="grid grid-cols-2">
                    <Flex vertical gap="4">
                        <h1 class="text-xs font-medium">Tanggal Hilang</h1>
                        <span class="font-light text-xs">20-03-25</span>
                    </Flex>
                    <Flex vertical gap="4">
                        <h1 class="text-xs font-medium">Status Barang</h1>
                        <span class="px-2 py-0.5 rounded-md text-white bg-red-500 max-w-max text-xs">Hilang</span>
                    </Flex>
                </div>
                <Flex vertical gap="4">
                    <h1 class="text-xs font-medium">Deskripsi</h1>
                    <span class="max-w-[350px]  overflow-x-hidden hover:overflow-y-scroll text-xs font-light">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur fugit expedita iusto debitis, accusamus quod eveniet aliquid. Facilis consectetur dignissimos officia omnis, dolore fuga, repellat magnam, dolorum exercitationem harum dolorem!</span>
                </Flex>
            </Flex>
    </Modal>

    <Modal v-model:visible="isDeleteOpen" @ok="() => isDeleteOpen = !isDeleteOpen" :centered="true" title="" closable :footer="false">
            <Flex vertical gap="20">
                <Flex align="center" gap="20" ">
           <div class="text-red-500">
               <WarningFilled :style="{fontSize : '26px'}" />
           </div>
           <span>Are you sure you want to delete {{ recordItem.title }}</span>
       </Flex>
            <Flex justify="end" gap="10">
                <Button type="default" class="hover:!border-gray-300" @click="isDeleteOpen = !isDeleteOpen">Cancel</Button>
                <Button type="primary" danger>Delete</Button>
            </Flex>
            </Flex>
           
    </Modal>

    <Modal v-model:visible="isEditOpen" @ok="() => isEditOpen = !isEditOpen" centered :footer="null" :closable="false">
        <Flex vertical gap="16" justify="center" class="w-full">
            <Flex vertical class="w-full" gap="8">
                <label for="item">Nama Barang</label>
                <Input placeholder="Nama Barang" :value="recordItem.title" disabled />
            </Flex>
            <Flex vertical class="w-full" gap="8">
                <label for="item">Kategori Barang</label>
                <Select placeholder="Pilih Kategori Barang" :options="option" v-model:value="oldData.category" disabled />
            </Flex>
            <Flex vertical class="w-full" gap="8">
                <label for="item">Status Barang</label>
                <Select placeholder="Pilih Kategori Barang" :options="optionStatus" v-model:value="oldData.status" />
            </Flex>
            <Flex vertical class="w-full" gap="8">
                <label for="item">Deskripsi Barang</label>
                <Textarea placeholder="Deskripsi Barang"  />
            </Flex>
            <Flex vertical class="w-full" gap="8">
                <label for="item">Tanggal Kehilangan</label>
                <DatePicker format="YYYY-MM-DD" placement="bottomRight"  />
            </Flex>
        </Flex> 
    </Modal>
</template>
