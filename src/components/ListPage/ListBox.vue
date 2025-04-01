<script setup lang="ts">
import { Flex } from 'ant-design-vue';
import HeaderListPage from './HeaderListPage.vue';
import ListCard from './ListCard.vue';

</script>

<template>
    <Flex vertical class="p-10.5" gap="24">
        <HeaderListPage />
        <ListCard />
    </Flex>
</template>