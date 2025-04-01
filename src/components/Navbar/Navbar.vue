<script setup lang="ts">
import { CodeSandboxOutlined, UserOutlined } from '@ant-design/icons-vue';
import { Flex } from 'ant-design-vue';

</script>

<template>
    <Flex class="px-10 py-4 border-b border-b-[#D8D5D5]">
        <Flex gap="16" flex=1>
            <CodeSandboxOutlined :style="{fontSize : '24px'}" />
            <Flex>
                <span class="text-black text-base font-bold">Find</span>
                <span class="text-[#CFC922] text-base font-bold">Soed</span>
            </Flex>
        </Flex>
        <div>
            <UserOutlined :syle="{fontSize : '24px'}" />
        </div>
    </Flex>
</template>