<script lang="ts" setup>
import { DeleteOutlined, EditOutlined, EyeOutlined, SelectOutlined } from '@ant-design/icons-vue';
import { Button, Flex } from 'ant-design-vue';
</script>

<template>
    <Flex class="max-w-max" gap="8" align="center">
        <Button type="primary">
            <Flex align="center" gap="8">
                <EyeOutlined />
                <span>See</span>
            </Flex>
        </Button>
        <Button type="primary" class="flex align-center justify-center text-white !bg-yellow-400 hover:!bg-yellow-300 transition duration-50">
            <Flex align="center" gap="8">
                <EditOutlined />
                <span>Edit</span>
            </Flex>
        </button>
        <Button type="primary" danger>
            <Flex align="center" gap="8">
                <DeleteOutlined />
                <span>Delete</span>
            </Flex>
        </Button>
    </Flex>
</template>
