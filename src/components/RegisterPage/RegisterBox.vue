<script setup lang="ts">
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { Button, Input } from 'ant-design-vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const userVal = ref<string>("");
const emailVal = ref<string>("");
const passVal = ref<string>("");
const passShow = ref<boolean>(false);
const cPassVal = ref<string>("");
const cPassShow = ref<boolean>(false);


</script>

<template>
    <div class="flex w-full items-center justify-center  ">
    <div class="flex flex-col h-full gap-4 w-full lg:rounded-md lg:border lg:max-w-[640px] lg:border-gray-200 lg:mx-20 lg:py-20 lg:shadow-md">
      <div class="text-center text-[#1890FF] font-semibold text-xl">Daftar</div>
      <div class="flex flex-col gap-2 items-center justify-center" >
          <label for="email" class="text-xs w-[90%] ">Username</label>
            <div class="w-[90%] " >
              <Input v-model:value="userVal" placeholder="Username" id="username"  />
            </div>
      </div>
      <div class="flex flex-col gap-2 items-center justify-center" >
          <label for="email" class="text-xs w-[90%] ">Alamat Email</label>
            <div class="w-[90%] " >
              <Input v-model:value="emailVal" placeholder="Email" id="email"  />
            </div>
      </div>
      <div class="flex flex-col gap-2 items-center justify-center">
          <label for="password" class="text-xs w-[90%] ">Password</label>
            <div class="w-[90%] " >
              <Input v-model:value="passVal" placeholder="******" id="password" :type="passShow ? 'text' : 'password'">
                <template #suffix>
                  <div v-on:click="() => passShow = !passShow">
                    <EyeInvisibleOutlined v-if="passShow"  />
                    <EyeOutlined v-if="!passShow"  />
                  </div>
                </template>
              </Input>
            </div>
      </div>
      <div class="flex flex-col gap-2 items-center justify-center">
          <label for="password" class="text-xs w-[90%] ">Konfirmasi Password</label>
            <div class="w-[90%] " >
              <Input v-model:value="cPassVal" placeholder="******" id="password" :type="cPassShow ? 'text' : 'password'">
                <template #suffix>
                  <div v-on:click="() => cPassShow = !cPassShow">
                    <EyeInvisibleOutlined v-if="cPassShow"  />
                    <EyeOutlined v-if="!cPassShow"  />
                  </div>
                </template>
              </Input>
            </div>
      </div>
      <div class="flex gap-2 items-center justify-center ">
        <div class="w-[90%]">
        <RouterLink to="/login">
            <Button type="primary" class="!bg-black hover:!bg-slate-700">
              <span>Daftar</span>
            </Button>
          </RouterLink>
        </div>
      </div>
      <div class="flex gap-2 items-center justify-center">
        <div class="w-[90%] flex gap-x-1">
          <span>Belum memiliki akun?</span>
          <RouterLink to="/login">
              <span class="text-[#1890FF]">Login</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>