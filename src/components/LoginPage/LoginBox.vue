<script setup lang="ts">
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons-vue";
import { Button, Input, InputProps, Modal } from "ant-design-vue";
import { computed, onMounted, ref, watchEffect } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useLoginStore } from "../../stores/loginInfo";
import validator from "email-validator"
import { findUserInfo, loginUser } from "../../api/Auth/Auth";
import { ChangeEvent } from "ant-design-vue/es/_util/EventInterface";
import { useAuthStore } from "../../stores/authStore";

const login = useLoginStore();
const emailVal = ref("");
const passVal = ref("");
const passShow = ref(false);
const auth = useAuthStore();
const router = useRouter();

const togglePass = () => {
  passShow.value = !passShow.value
}


const isEmailValid = computed(() => {
  return validator.validate(emailVal.value)
})

const emailProps : InputProps = {
  value : emailVal.value,
  onInput : (e : ChangeEvent) => emailVal.value = (e.target as HTMLInputElement).value,
  status : isEmailValid.value ?  "" :emailVal.value.length > 0 ? "error" : "",
  onPressEnter : () => handleLogin(),
  placeholder : "Email"
}

const passProps : InputProps = {
  value : passVal.value,
  onInput : (e : ChangeEvent) => passVal.value = (e.target as HTMLInputElement).value,
  type : passShow.value ? "text" : "password",
  onPressEnter : () => handleLogin(),
  placeholder : "*****"
}


 

const handleLogin = async () => {
  try{
    const response = await loginUser({
      email : emailVal.value,
      password : passVal.value
    })
    if(response){
      localStorage.setItem("authToken", response.data.token)
      auth.setAuthToken(response.data.token as string)
      if(response.data){
        const findUser = await findUserInfo();
        if(findUser){
          auth.setUserInfo({
            username : findUser.data.username,
            userId : findUser.data.userId,
            email : findUser.data.email,
            imageUrl : findUser.data.imageUrl,
            phoneNumber : findUser.data.phoneNumber
          })
        }
      }
      Modal.success({
        title : "Berhasil untuk login",
        ///@ts-ignore
        message : response.data.message,
        centered : true,
        zIndex : 99999,
        onOk : () => router.push("/home")
      })
    }
  }catch(e){
    Modal.error({
      title : "Gagal untuk Login",
      //@ts-ignore
      message : e.message,
      centered : true,
      zIndex : 99999

    })
  }
}

</script>

<template>
  <div class="flex w-full items-center justify-center  ">
    <div class="flex flex-col h-full gap-4 w-full lg:rounded-md lg:border lg:max-w-[640px] lg:border-gray-200 lg:mx-20 lg:py-20 lg:shadow-md">
      <div class="text-center text-[#1890FF] font-semibold text-xl">LOGIN</div>
      <div class="flex flex-col gap-2 items-center justify-center" >
          <label for="email" class="text-xs w-[90%] ">Alamat Email</label>
            <div class="w-[90%] flex flex-col " >
              <Input v-bind="emailProps"  />
              <span class="w-[90%] text-red-500 transition-all duration-300" :class="isEmailValid ? 'invisible opacity-0' : emailVal.length > 0 ? 'visible opacity-100' : 'invisible opacity-0'"  >Email yang kamu masukkan tidak valid</span>
            </div>
      </div>
      <div class="flex flex-col gap-2 items-center justify-center">
          <label for="password" class="text-xs w-[90%] ">Password</label>
            <div class="w-[90%] " >
              <Input v-bind="passProps" >
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
        <div class="w-[90%] justify-end flex">
          <div @click="() => login.login(emailVal)">
            <RouterLink to="/home">
                <Button type="primary" :disabled="isEmailValid && passVal.length > 1 ? false : true ">
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
