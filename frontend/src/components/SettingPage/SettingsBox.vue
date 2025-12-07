<script setup lang="ts">
import { Tabs, TabPane } from "ant-design-vue";
import PersonalisationSettings from "./PersonalisationSettings.vue";
import HistorySettings from "./HistorySettings.vue";
import BreadCrumbComp from "../BreadCrumb/BreadCrumbComp.vue";
</script>

<template>
  <div class="md:ml-16 mt-16 md:mt-0 min-h-screen bg-gray-50 pt-6 px-4 sm:px-6 md:px-8 pb-8">
    <BreadCrumbComp title="Pengaturan" />
    <div class="max-w-4xl mx-auto mt-4">
      <div class="bg-white rounded-xl border border-gray-200 p-6">
        <Tabs>
          <TabPane key="1" tab="Personalisasi Akun">
            <PersonalisationSettings />
          </TabPane>
          <TabPane key="2" tab="Daftar Barang">
            <HistorySettings />
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>
