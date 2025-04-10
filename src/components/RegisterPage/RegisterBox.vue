<script setup lang="ts">
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { Button, Input } from 'ant-design-vue';
import { computed, watch, watchEffect } from 'vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import zxcvbn from 'zxcvbn';
import { isEmail } from 'validator';
const userVal = ref<string>("");
const emailVal = ref<string>("");
const passVal = ref<string>("");
const passShow = ref<boolean>(false);
const cPassVal = ref<string>("");
const cPassShow = ref<boolean>(false);






const emailIndicator = computed(() => {
  if(isEmail(emailVal.value) && emailVal.value.length > 1){
    return {
      text : 'Email Valid',
      textcolor : 'text-green-500'
    }
  }
  else if(!isEmail(emailVal.value) && emailVal.value.length > 1){
    return {
      text : 'Email Tidak Valid',
      textcolor : 'text-red-500'
    }
  }
  else{
    return {
      text : '',
      textcolor : ''
    }
  }
})

watchEffect(() => {
  console.log("valid ? ", )
  console.log("valid ? ", )
})

const passwordStrength = computed(() => {
  return zxcvbn(passVal.value)
})

const passwordIndicator = computed(() => {
  switch(passwordStrength.value.score){
    case 1 : {
      return {
        bgcolor : 'bg-red-500',
        text : 'Masih Lemah',
        textcolor : 'text-red-500'
      }
    }
    case 2 : {
      return {
        bgcolor : 'bg-yellow-300',
        text : 'Lumayan',
        textcolor : 'text-yellow-300'
      }
    }
    case 3 : {
      return {
        bgcolor : 'bg-blue-500',
        text : 'Lumayan Kuat',
        textcolor : 'text-blue-500'
      }
    }
    case 4 : {
      return {
        bgcolor : 'bg-green-500',
        text : 'Sangat Kuat',
        textcolor : 'text-green-400'
      }
    }
    default : {
      return {
        bgcolor : '',
        text : ''
      }
    }
  }
})

/* const cPasswordStrength = computed(() => {
  return zxcvbn(cPassVal.value)
})

const cPasswordIndicator = computed(() => {
  switch(cPasswordStrength.value.score){
    case 1 : {
      return {
        bgcolor : 'bg-red-500',
        text : 'Masih Lemah',
        textcolor : 'text-red-500'
      }
    }
    case 2 : {
      return {
        bgcolor : 'bg-yellow-300',
        text : 'Lumayan',
        textcolor : 'text-yellow-300'
      }
    }
    case 3 : {
      return {
        bgcolor : 'bg-blue-500',
        text : 'Lumayan Kuat',
        textcolor : 'text-blue-500'
      }
    }
    case 4 : {
      return {
        bgcolor : 'bg-green-500',
        text : 'Sangat Kuat',
        textcolor : 'text-green-400'
      }
    }
    default : {
      return {
        bgcolor : '',
        text : ''
      }
    }
  }
}) */


watchEffect(() => {
  console.log("strength : ", passwordStrength.value.score)
})

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
            <div class="w-[90%] text-xs" :class="[emailIndicator.textcolor]">
                {{ emailIndicator.text }}
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
            <div class="h-[5px] w-[90%] flex gap-x-0.5 items-center" >
                <div v-for="(_,i) in passwordStrength.score" :key="i" class="w-[20%] h-full " :class="[passwordIndicator.bgcolor]"></div>
                <div class="text-xs" :class="[passwordIndicator.textcolor]">{{ passwordIndicator.text }}</div>
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
          <!--   <div class="h-[5px] w-[90%] flex gap-x-0.5 items-center" >
                <div v-for="(_,i) in cPasswordStrength.score" :key="i" class="w-[20%] h-full " :class="[cPasswordIndicator.bgcolor]"></div>
                <div class="text-xs" :class="[cPasswordIndicator.textcolor]">{{ cPasswordIndicator.text }}</div>
            </div> -->
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