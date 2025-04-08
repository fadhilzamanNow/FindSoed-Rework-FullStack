<script setup lang="ts">
import { Tabs, TabPane } from "ant-design-vue";
import { ref, watchEffect } from "vue";
import PersonalisationSettings from "./PersonalisationSettings.vue";
import HistorySettings from "./HistorySettings.vue";
import { HomeOutlined } from "@ant-design/icons-vue";

const activeTab = ref<number>(2);

watchEffect(() => {
  console.log("active : ", activeTab.value);
});
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center gap-2 text-gray-400">
      <HomeOutlined class="text-lg" />
      <span class="text-sm">Home</span>
    </div>
    <div class="h-full flex flex-col w-full" justify="center">
      <Tabs class="w-full">
        <TabPane key="2" tab="Personalisasi Akun">
          <PersonalisationSettings />
        </TabPane>
        <TabPane key="1" tab="Daftar Barang">
          <HistorySettings />
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>
