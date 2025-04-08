<script setup lang="ts">
import { EyeInvisibleOutlined, EyeOutlined, UploadOutlined } from "@ant-design/icons-vue";
import { Avatar, Upload, Button, Flex, Input } from "ant-design-vue";
import { ref } from "vue";

const showPassword = ref<boolean>(false);

</script>

<template>
    <div class="flex h-full">
        <Flex vertical gap="20" class="w-full sm:w-[640px] sm:rounded-md sm:border-gray-200 "> 
          <Flex gap="16" align="center">
              <Avatar :size="48">
                  Fa
              </Avatar>
              <Upload>
                  <Button>
                      <Flex gap="8" align="center">
                          <UploadOutlined />
                          <span>Ganti Foto Profil</span>
                      </Flex>
                  </Button>
              </Upload>
          </Flex>
          <Flex vertical gap="8">
              <label for="username">Username</label>
              <Input id="username" placeholder="fadhilzamanNow" disabled  />
          </Flex>
          <Flex vertical gap="8">
              <label for="username">Email</label>
              <Input id="username" placeholder="muhammad.isfadhillah@mhs.unsoed.ac.id" disabled  />
          </Flex>
          <Flex vertical gap="8">
              <label for="username">Sandi Lama</label>
              <Input id="username" placeholder="*****" :type="showPassword ? 'password' : 'text'" >
              <template #suffix>
                  <EyeInvisibleOutlined v-if="!showPassword" @click="() => showPassword = !showPassword" />
                  <EyeOutlined v-else   @click="() => showPassword = !showPassword" />
              </template>
              </Input>
          </Flex>
          <Flex vertical gap="8">
              <label for="username">Sandi Baru</label>
              <Input id="username" placeholder="*****" :type="showPassword ? 'password' : 'text'" >
              <template #suffix>
                  <EyeInvisibleOutlined v-if="!showPassword" @click="() => showPassword = !showPassword" />
                  <EyeOutlined v-else   @click="() => showPassword = !showPassword" />
              </template>
              </Input>
          </Flex>
          <Flex vertical gap="8">
              <label for="username">Konfirmasi Sandi Baru</label>
              <Input id="username" placeholder="******" :type="showPassword ? 'password' : 'text'" >
              <template #suffix>
                  <EyeInvisibleOutlined v-if="!showPassword" @click="() => showPassword = !showPassword" />
                  <EyeOutlined v-else   @click="() => showPassword = !showPassword" />
              </template>
              </Input>
          </Flex>
          <Flex>
              <Button type="primary" disabled >Ubah Profil</Button>
          </Flex>
        </Flex>
    </div>
</template>
