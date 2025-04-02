<script setup lang="ts">
import { Flex, Pagination, Table, TableColumnProps} from 'ant-design-vue';
import { h, ref } from 'vue';
import type { myItem } from '../../dummy/historyLost';
import { myLostItem } from '../../dummy/historyLost';
import HistoryAction from './HistoryAction.vue';
import StatusButton from './StatusButton.vue';


const tableDataSource = ref(myLostItem);
const currentPage = ref<number>(1);
const dataPerPage = ref<number>(10);

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
            customRender : () => {
                return h(HistoryAction)
            }
          }
        ]

</script>

<template>
    <Flex vertical gap="20" class="max-w-max">
        <h1>Terdapat {{ tableDataSource.length }} barang yang ditemukan</h1>
        <Flex class="w-[800px] h-[720px]" vertical >
            <Table :columns="columns" :data-source="tableDataSource.slice(currentPage*10-10,currentPage*10)" :pagination="false" bordered />
        </Flex>
        <Flex class="w-full" justify="center" align="center">
            <Pagination v-model:current="currentPage" :total="tableDataSource.length" :show-less-item="true"  :show-size-changer="false" />
        </Flex>
    </Flex>
</template>