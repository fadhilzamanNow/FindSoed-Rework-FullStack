<script setup lang="ts">
import { Flex, Pagination, Table} from 'ant-design-vue';
import { h, onMounted, onUnmounted, ref } from 'vue';
import { myLostItem } from '../../dummy/historyLost';
import HistoryAction from './HistoryAction.vue';
import StatusButton from './StatusButton.vue';
import { useViewPortStore } from '../../stores/viewportStore';

const {view, handleViewport} = useViewPortStore()

const tableDataSource = ref(myLostItem);
const currentPage = ref<number>(1);
const dataPerPage = ref<number>(5);

console.log(myLostItem)

const columns =[
          {
            title : 'No',
            dataIndex : 'id'
          },
          {
            title: 'Name',
            dataIndex: 'title',
            key: 'title',
          },
          {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                customRender: ({text} : {text : string}) => {
                return h(StatusButton, {
                    someProp: 'foobar',
                    text : text
                });
                }
            },
          {
            title : 'Actions',
            customRender : ({record} : {record : any}) => {
                return h(HistoryAction, {
                    record : record
                })
            }
          }
]

onMounted(() => {
  window.addEventListener('resize', handleViewport)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleViewport)
})



</script>

<template>
    <Flex vertical gap="20" class="w-full ">
        <h1>Terdapat {{ tableDataSource.length }} barang yang ditemukan</h1>
        <div class="w-[70vw] p-2 ">
          <Flex class="min-w-0  lg:w-full " :class="[view.width < view.height ? 'overflow-auto h-[480px]' : 'overflow-hidden hover:overflow-scroll h-[650px]' ]" vertical >
              <Table :columns="columns" :data-source="tableDataSource.slice(currentPage*dataPerPage-dataPerPage,currentPage*dataPerPage)" :pagination="false" bordered />
          </Flex>
          <Flex class="w-full pt-3 " justify="center" align="center">
            <Pagination class="w-full  text-center" v-model:current="currentPage" :page-size="dataPerPage" :total="tableDataSource.length" :show-less-item="true"  :show-size-changer="false" />
        </Flex>
        </div>
      
    </Flex>
</template>