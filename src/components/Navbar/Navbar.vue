<script setup lang="ts">
import {
  CodeSandboxOutlined,
  RollbackOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { Flex, Dropdown, Menu, MenuItem } from "ant-design-vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <Flex class="px-10 py-4 border-b border-b-[#D8D5D5]">
    <Flex gap="16" flex="1">
      <CodeSandboxOutlined :style="{ fontSize: '24px' }" />
      <Flex>
        <span class="text-black text-base font-bold">Find</span>
        <span class="text-[#CFC922] text-base font-bold">Soed</span>
      </Flex>
    </Flex>
    <div>
      <Dropdown placement="bottomLeft">
        <template #overlay>
          <Menu>
            <MenuItem>
              <RouterLink to="/setting">
                <Flex gap="8" align="center">
                  <SettingOutlined />
                  <span>Settings</span>
                </Flex>
              </RouterLink>
            </MenuItem>
            <MenuItem>
              <RouterLink to="/login">
                <Flex gap="8" align="center">
                  <RollbackOutlined />
                  <span>Logout</span>
                </Flex>
              </RouterLink>
            </MenuItem>
          </Menu>
        </template>
        <UserOutlined :syle="{ fontSize: '24px' }" />
      </Dropdown>
    </div>
  </Flex>
</template>
