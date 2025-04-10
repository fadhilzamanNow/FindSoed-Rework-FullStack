<script setup lang="ts">
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons-vue";
import { Button, Input } from "ant-design-vue";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useLoginStore } from "../../stores/loginInfo";


const login = useLoginStore();
const emailVal = ref<string>("");
const passVal = ref<string>("");
const passShow = ref<boolean>(false);

const togglePass = () => {
  passShow.value = !passShow.value
}





const handleLogin = async () => {
  if(emailVal.value.trim() !== "" && passVal.value.trim() !== ""){
    login.login(emailVal.value);
  }
}
</script>

<template>
  <div class="flex w-full items-center justify-center  ">
    <div class="flex flex-col h-full gap-4 w-full lg:rounded-md lg:border lg:max-w-[640px] lg:border-gray-200 lg:mx-20 lg:py-20 lg:shadow-md">
      <div class="text-center text-[#1890FF] font-semibold text-xl">LOGIN</div>
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
          <div @click="() => login.login(emailVal)">
            <RouterLink to="/list">
                <Button type="primary" class="!bg-black hover:!bg-slate-700">
                  <span>Login</span>
                </Button>
              </RouterLink>
          </div>
        </div>
      </div>
      <div class="flex gap-2 items-center justify-center">
        <div class="w-[90%] flex gap-x-1">
          <span>Belum memiliki akun?</span>
          <RouterLink to="/register">
              <span class="text-[#1890FF]">Daftar</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
