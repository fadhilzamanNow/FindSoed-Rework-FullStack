<script setup lang="ts">
import { Flex } from 'ant-design-vue';
import BreadCrumbComp from '../BreadCrumb/BreadCrumbComp.vue';
import { Tabs, TabPane } from 'ant-design-vue';
import { ref, watchEffect } from 'vue';
import PersonalisationSettings from './PersonalisationSettings.vue';
import HistorySettings from './HistorySettings.vue';

const activeTab =ref<number>(1);

watchEffect(() => {
    console.log("active : ", activeTab.value)
})

</script>

<template>
    <Flex class="">
        <Flex vertical gap="2" class="">
            <BreadCrumbComp />
            <Flex class="pl-10.5" justify="center">
                <Tabs  class=" w-[900px]" >
                    <TabPane key="1" tab="Personalisasi Akun">
                        <PersonalisationSettings />
                    </TabPane>
                    <TabPane key="2" tab="Daftar Barang">
                        <HistorySettings />
                    </TabPane>
                </Tabs>
            </Flex>
        </Flex>
    </Flex>
</template>