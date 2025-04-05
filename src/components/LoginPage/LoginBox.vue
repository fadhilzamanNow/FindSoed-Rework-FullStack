<script setup lang="ts">
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons-vue";
import { Button, Input } from "ant-design-vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const emailVal = ref<string>("");
const passVal = ref<string>("");
const passShow = ref<boolean>(false);

const togglePass = () => {
  passShow.value = !passShow.value
}
</script>

<template>
  <div class="flex w-full items-center ">
    <div class="flex flex-col w-full h-full gap-4">
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
                  <div v-on:click="togglePass">
                    <EyeInvisibleOutlined v-if="passShow"  />
                    <EyeOutlined v-if="!passShow"  />
                  </div>
                </template>
              </Input>
            </div>
      </div>
      <div class="flex gap-2 items-center justify-center ">
        <div class="w-[90%]">
        <RouterLink to="/list">
            <Button type="primary" class="!bg-black hover:!bg-slate-700">
              <span>Login</span>
            </Button>
          </RouterLink>
        </div>
      </div>
      <div class="flex gap-2 items-center justify-center">
        <div class="w-[90%] flex gap-x-1">
          <span>Belum memiliki akun?</span>
          <RouterLink to="/register">
              <span class="text-[#CFC922]">Daftar</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
  <!-- <Flex class="w-[883px] h-[653px] shadow-2xl rounded-lg" gap="24">
    <Flex vertical class="pt-20 flex-1 pl-10 " gap="16">
      <h1 class="font-bold text-2xl">Login</h1>
      <Flex vertical gap="8" >
        <label for="email" class="text-xs">Alamat Email</label>
        <div class="w-[80%]">
          <Input v-model:value="emailVal" placeholder="Email" id="email" />
        </div>
      </Flex>
      <Flex vertical gap="8">
        <label for="password" class="text-xs">Password</label>
        <div class="w-[80%]">
          <Input v-model:value="passVal" placeholder="Password" id="password" />
        </div>
      </Flex>
      <RouterLink to="/list">
        <Flex
        class="rounded-md bg-[#CFC922] text-white w-[58px] px-5 py-1.5 select-none hover:bg-[#9e9c55] transition duration-200"
        justify="center"
        align="center"
      >
        Login
      </Flex>
      </RouterLink>
      
      <Flex gap="4">
        <span>Belum memiliki akun?</span>
        <RouterLink to="/register">
            <span class="text-[#CFC922]">Daftar</span>
        </RouterLink>
      </Flex>
    </Flex>
    <div class="w-[392px] h-[653px] bg-[#CFC922] rounded-lg"></div>
  </Flex> -->
</template>
