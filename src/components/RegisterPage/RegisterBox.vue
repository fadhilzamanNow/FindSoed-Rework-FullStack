<script setup lang="ts">
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { Button, Input } from 'ant-design-vue';
import { computed, watchEffect } from 'vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import zxcvbn from 'zxcvbn';
import { isEmail } from 'validator';
import { debounce } from 'underscore';
import { debounce as deb, isEmpty } from 'lodash';

import { VueTelInput } from 'vue-tel-input';

//@ts-ignore
import('vue-tel-input/vue-tel-input.css');






const debounceLodash = (user : string) => {
  deb(() => {
    userVal.value = user
  },1000)
}
const userVal = ref<string>("");
const emailVal = ref<string>("");
const passVal = ref<string>("");
const passShow = ref<boolean>(false);
const cPassVal = ref<string>("");
const cPassShow = ref<boolean>(false);
const phoneVal =ref<string>("")
const isPhoneValid = ref<boolean>(false);





const debouncedEmailValidation = debounce((email : string) => {
  emailVal.value = email;
}, 500);

const handleEmail = (e: Event) => {
  const email = (e.target as HTMLInputElement).value;
  debouncedEmailValidation(email); 
};

const emailIndicator = computed(() => {
  if(isEmail(emailVal.value) && emailVal.value.length > 1){
    return {
      status : true,
      text : 'Email Valid',
      textcolor : 'text-green-500',
      isEmpty : false
    }
  }
  else if(!isEmail(emailVal.value) && emailVal.value.length > 1){
    return {
      status : false,
      text : 'Email Tidak Valid',
      textcolor : 'text-red-500',
      isEmpty : false
    }
}
  else{
    return {
      status : false,
      text : '',
      textcolor : '',
      isEmpty : true
    }
  }
})



const passwordStrength = computed(() => {
  return zxcvbn(passVal.value)
})

const passwordIndicator = computed(() => {
  switch(passwordStrength.value.score){
    case 1 : {
      return {
        number : 1,
        bgcolor : 'bg-red-500',
        text : 'Masih Lemah',
        textcolor : 'text-red-500'
      }
    }
    case 2 : {
      return {
        number : 2,
        bgcolor : 'bg-yellow-300',
        text : 'Lumayan',
        textcolor : 'text-yellow-300'
      }
    }
    case 3 : {
      return {
        number : 3,
        bgcolor : 'bg-blue-500',
        text : 'Lumayan Kuat',
        textcolor : 'text-blue-500'
      }
    }
    case 4 : {
      return {
        number : 4,
        bgcolor : 'bg-green-500',
        text : 'Sangat Kuat',
        textcolor : 'text-green-400'
      }
    }
    default : {
      return {
        number : 0,
        bgcolor : '',
        text : ''
      }
    }
  }
})

const cPasswordStrength = computed(() => {
  return zxcvbn(cPassVal.value)
})

const cPasswordIndicator = computed(() => {
  switch(cPasswordStrength.value.score){
    case 1 : {
      return {
        number : 1,
        bgcolor : 'bg-red-500',
        text : 'Masih Lemah',
        textcolor : 'text-red-500'
      }
    }
    case 2 : {
      return {
        number : 2,
        bgcolor : 'bg-yellow-300',
        text : 'Lumayan',
        textcolor : 'text-yellow-300'
      }
    }
    case 3 : {
      return {
        number : 3,
        bgcolor : 'bg-blue-500',
        text : 'Lumayan Kuat',
        textcolor : 'text-blue-500'
      }
    }
    case 4 : {
      return {
        number : 4,
        bgcolor : 'bg-green-500',
        text : 'Sangat Kuat',
        textcolor : 'text-green-400'
      }
    }
    default : {
      return {
        number : 1,
        bgcolor : '',
        text : ''
      }
    }
  }
})


const validatePhone = (i  : any ) => {
  isPhoneValid.value = i.valid
}

const isPasswordSame = computed(() => {
  if(passVal.value === cPassVal.value){
    return true;
  }
  else{
    return false
  }
})

const isNoError = computed(() => {
  return !isEmpty(userVal.value) && emailIndicator.value.status && (passwordIndicator.value.number > 1) && (cPasswordIndicator.value.number > 1) && isPhoneValid.value && isPasswordSame.value
})


</script>

<template>
    <div class="flex w-full items-center justify-center  ">
    <div class="flex flex-col h-full gap-4 w-full lg:rounded-md lg:border lg:max-w-[640px] lg:border-gray-200 lg:mx-20 lg:py-20 lg:shadow-md">
      <div class="text-center text-[#1890FF] font-semibold text-xl">Daftar</div>
      <div class="flex flex-col gap-2 items-center justify-center" >
          <label for="email" class="text-xs w-[90%]">Username</label>
            <div class="w-[90%] " >
              <Input v-model:value="userVal" placeholder="Username" id="username"  />
            </div>
      </div>
      <div class="flex flex-col gap-2 items-center justify-center" >
          <label for="email" class="text-xs w-[90%] ">Alamat Email</label>
            <div class="w-[90%] " >
              <Input v-on:input="(e : Event) => handleEmail(e)" placeholder="Email" id="email" class="w-full" :status="emailIndicator.status  ?  '' : emailIndicator.isEmpty ? '' : 'error' "  />
            </div>
            <div class="w-[90%] text-xs" :class="[emailIndicator.textcolor]">
                {{ emailIndicator.text }}
            </div>
      </div>
      <div class="flex flex-col gap-2 items-center justify-center">
          <label for="phone" class="text-xs w-[90%] ">Phone</label>
            <div class="w-[90%] " >
              <VueTelInput v-model="phoneVal"  mode="national" :inputOptions="{showDialCode  : true}" defaultCountry="id" @validate="validatePhone" class="w-full focus:!shadow-none "  :class="[isPhoneValid  ? '!border-gray-200 ' : phoneVal.length > 0 ? '!border-gray-200' : '!border-red-500']"/>
              <span class="transition-all duration-300 text-red-500" :class="isPhoneValid ?  'invisible' : phoneVal.length ? 'invisible' : 'visible'">Nomor telfon yang anda masukkan tidak valid</span>
            </div>    
      </div>
      <div class="flex flex-col gap-2 items-center justify-center">
          <label for="password" class="text-xs w-[90%] ">Password</label>
            <div class="w-[90%] " >
              <Input v-model:value="passVal" placeholder="******" id="password" :type="passShow ? 'text' : 'password'" :status="passwordIndicator.number && passwordIndicator.number < 2 ? 'error' : ''">
                <template #suffix>
                  <div v-on:click="() => passShow = !passShow">
                    <EyeInvisibleOutlined v-if="passShow"  />
                    <EyeOutlined v-if="!passShow"  />
                  </div>
                </template>
              </Input>
             
            </div>
            <div class="h-[5px] w-[90%] flex gap-x-0.5 items-center" >
                <div v-for="(_,i) in passwordStrength.score" :key="i" class="w-[20%] h-full " :class="[passwordIndicator.bgcolor]" ></div>
                <div class="text-xs" :class="[passwordIndicator.textcolor]">{{ passwordIndicator.text }}</div>
            </div>
      </div>
      <div class="flex flex-col gap-2 items-center justify-center">
          <label for="password" class="text-xs w-[90%] ">Konfirmasi Password</label>
            <div class="w-[90%] " >
              <Input v-model:value="cPassVal" placeholder="******" id="password" :type="cPassShow ? 'text' : 'password'" :status="isPasswordSame ? '' : 'error'">
                <template #suffix>
                  <div v-on:click="() => cPassShow = !cPassShow">
                    <EyeInvisibleOutlined v-if="cPassShow"  />
                    <EyeOutlined v-if="!cPassShow"  />
                  </div>
                </template>
              </Input>
            </div>
            <div class="h-[5px] w-[90%] flex gap-x-0.5 items-center" >
                <div v-for="(_,i) in cPasswordStrength.score" :key="i" class="w-[20%] h-full " :class="[cPasswordIndicator.bgcolor]"></div>
                <div class="text-xs" :class="[cPasswordIndicator.textcolor]">{{ cPasswordIndicator.text }}</div>
            </div>
            <span class="w-[90%] items-center transition-all duration-200 ease-in-out text-red-500"   :class="[isPasswordSame ? 'opacity-0 invisible' : 'visible opacity-100']" >Password Tidak Sama</span>
      </div>
      <div class="flex gap-2 items-center justify-center ">
        <div class="w-[90%] flex justify-end">
        <RouterLink to="/login">
            <Button type="primary" :disabled="!isNoError">
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