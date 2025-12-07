<script setup lang="ts">
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons-vue";
import { Button, Input, Modal } from "ant-design-vue";
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { findUserInfo, loginUser } from "../../api/Auth/Auth";
import { useAuthStore } from "../../stores/authStore";
import { validateTokenHandler } from "../../utils/validateToken";
import { CustomErrorResponse } from "../../api/baseApi";

const emailVal = ref("");
const passVal = ref("");
const passShow = ref(false);
const fieldErrors = ref<Record<string, string>>({});
const auth = useAuthStore();
const router = useRouter();

const emit = defineEmits<{ toggleLoading: [] }>();

const clearFieldError = (field: string) => {
  if (fieldErrors.value[field]) delete fieldErrors.value[field];
};

const handleLogin = async () => {
  fieldErrors.value = {};

  try {
    emit("toggleLoading");
    const response = await loginUser({
      email: emailVal.value,
      password: passVal.value,
    });
    if (response) {
      localStorage.setItem("authToken", response.data.token);
      auth.setAuthToken(response.data.token as string);
      if (response.data) {
        emit("toggleLoading");
        const findUser = await findUserInfo();
        if (findUser) {
          auth.setUserInfo({
            username: findUser.data.username,
            userId: findUser.data.userId,
            email: findUser.data.email,
            imageUrl: findUser.data.imageUrl,
            phoneNumber: findUser.data.phoneNumber,
          });
          setTimeout(() => {
            auth.setAuthToken(null);
            auth.setUserInfo(null);
          }, validateTokenHandler(response.data.token) as number);
        }
      }
      Modal.success({
        title: "Berhasil untuk login",
        content: response.message,
        centered: true,
        zIndex: 99999,
        onOk: () => router.push("/home"),
      });
    }
  } catch (e) {
    emit("toggleLoading");
    const err = e as CustomErrorResponse;
    if (err.errors) {
      fieldErrors.value = err.errors;
    } else {
      Modal.error({
        title: "Gagal untuk Login",
        content: err.message,
        centered: true,
        zIndex: 99999,
      });
    }
  }
};
</script>

<template>
  <div class="w-full px-4 py-8">
    <div class="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Selamat Datang</h1>
        <p class="text-gray-500 mt-2">Masuk ke akun FindSoed kamu</p>
      </div>

      <!-- Form -->
      <div class="flex flex-col gap-5">
        <!-- EMAIL -->
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-700">Email</label>
          <Input
            v-model:value="emailVal"
            placeholder="Masukkan email"
            :status="fieldErrors.email ? 'error' : undefined"
            size="large"
            @input="clearFieldError('email')"
            @press-enter="handleLogin"
          />
          <span v-if="fieldErrors.email" class="text-red-500 text-xs">{{ fieldErrors.email }}</span>
        </div>

        <!-- PASSWORD -->
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-700">Password</label>
          <div class="relative">
            <Input
              v-model:value="passVal"
              :type="passShow ? 'text' : 'password'"
              placeholder="Masukkan password"
              :status="fieldErrors.password ? 'error' : undefined"
              size="large"
              @input="clearFieldError('password')"
              @press-enter="handleLogin"
            />
            <div
              @click="passShow = !passShow"
              class="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-gray-400 hover:text-gray-600"
            >
              <EyeInvisibleOutlined v-if="passShow" />
              <EyeOutlined v-else />
            </div>
          </div>
          <span v-if="fieldErrors.password" class="text-red-500 text-xs">{{ fieldErrors.password }}</span>
        </div>

        <!-- BUTTON -->
        <Button
          type="primary"
          size="large"
          @click="handleLogin"
          class="w-full mt-2 !h-11 !rounded-lg !font-semibold"
        >
          Login
        </Button>

        <!-- REGISTER LINK -->
        <div class="text-center text-sm text-gray-600">
          Belum memiliki akun?
          <RouterLink to="/register" class="text-blue-600 font-medium hover:underline">
            Daftar
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
