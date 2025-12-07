<script setup lang="ts">
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons-vue";
import { Button, Input, Modal } from "ant-design-vue";
import { computed, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import zxcvbn from "zxcvbn";
import { registerUser } from "../../api/Auth/Auth";
import { CustomErrorResponse, CustomSuccessResponse } from "../../api/baseApi";

const emit = defineEmits<{ toggleLoading: [] }>();

const userVal = ref("");
const emailVal = ref("");
const passVal = ref("");
const passShow = ref(false);
const phoneVal = ref("");
const fieldErrors = ref<Record<string, string>>({});
const navigate = useRouter();

const clearFieldError = (field: string) => {
  if (fieldErrors.value[field]) delete fieldErrors.value[field];
};

const passwordStrength = computed(() => zxcvbn(passVal.value));

const passwordIndicator = computed(() => {
  const indicators = [
    { bgcolor: "", text: "", textcolor: "" },
    { bgcolor: "bg-red-500", text: "Lemah", textcolor: "text-red-500" },
    { bgcolor: "bg-yellow-400", text: "Lumayan", textcolor: "text-yellow-500" },
    { bgcolor: "bg-blue-500", text: "Kuat", textcolor: "text-blue-500" },
    { bgcolor: "bg-green-500", text: "Sangat Kuat", textcolor: "text-green-500" },
  ];
  return indicators[passwordStrength.value.score];
});

const handleRegister = async () => {
  fieldErrors.value = {};

  try {
    emit("toggleLoading");
    const response = await registerUser({
      username: userVal.value,
      email: emailVal.value,
      password: passVal.value,
      ...(phoneVal.value.length > 0 && { phoneNumber: phoneVal.value }),
    });

    if (response) {
      emit("toggleLoading");
      Modal.success({
        title: "Berhasil Melakukan Registrasi",
        content: (response as CustomSuccessResponse).message,
        onOk: () => navigate.push("/login"),
        centered: true,
      });
    }
  } catch (err) {
    emit("toggleLoading");
    const e = err as CustomErrorResponse;
    if (e.errors) {
      fieldErrors.value = e.errors;
    } else {
      Modal.error({
        title: "Gagal Melakukan Registrasi",
        content: e.message,
        centered: true,
      });
    }
  }
};
</script>

<template>
  <div class="w-full px-4 py-8">
    <div class="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Buat Akun</h1>
        <p class="text-gray-500 mt-2">Daftar untuk mulai menggunakan FindSoed</p>
      </div>

      <!-- Form -->
      <div class="flex flex-col gap-4">
        <!-- USERNAME -->
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-700">Username</label>
          <Input
            v-model:value="userVal"
            placeholder="Masukkan username"
            :status="fieldErrors.username ? 'error' : undefined"
            size="large"
            @input="clearFieldError('username')"
            @press-enter="handleRegister"
          />
          <span v-if="fieldErrors.username" class="text-red-500 text-xs">{{ fieldErrors.username }}</span>
        </div>

        <!-- EMAIL -->
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-700">Email</label>
          <Input
            v-model:value="emailVal"
            placeholder="Masukkan email"
            :status="fieldErrors.email ? 'error' : undefined"
            size="large"
            @input="clearFieldError('email')"
            @press-enter="handleRegister"
          />
          <span v-if="fieldErrors.email" class="text-red-500 text-xs">{{ fieldErrors.email }}</span>
        </div>

        <!-- PHONE -->
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-gray-700">Nomor Telefon</label>
          <Input
            v-model:value="phoneVal"
            placeholder="Masukkan nomor telefon (opsional)"
            :status="fieldErrors.phoneNumber ? 'error' : undefined"
            size="large"
            @input="clearFieldError('phoneNumber')"
            @press-enter="handleRegister"
          />
          <span v-if="fieldErrors.phoneNumber" class="text-red-500 text-xs">{{ fieldErrors.phoneNumber }}</span>
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
              @press-enter="handleRegister"
            />
            <div @click="passShow = !passShow" class="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-gray-400 hover:text-gray-600">
              <EyeInvisibleOutlined v-if="passShow" />
              <EyeOutlined v-else />
            </div>
          </div>
          <span v-if="fieldErrors.password" class="text-red-500 text-xs">{{ fieldErrors.password }}</span>
          <div v-else-if="passVal.length" class="flex items-center gap-1">
            <div class="flex gap-0.5 flex-1">
              <div v-for="i in 4" :key="i" class="h-1 flex-1 rounded-full" :class="i <= passwordStrength.score ? passwordIndicator.bgcolor : 'bg-gray-200'" />
            </div>
            <span class="text-xs" :class="passwordIndicator.textcolor">{{ passwordIndicator.text }}</span>
          </div>
        </div>

        <!-- BUTTON -->
        <Button
          type="primary"
          size="large"
          @click="handleRegister"
          class="w-full mt-2 !h-11 !rounded-lg !font-semibold"
        >
          Daftar
        </Button>

        <!-- LOGIN LINK -->
        <div class="text-center text-sm text-gray-600">
          Sudah memiliki akun?
          <RouterLink to="/login" class="text-blue-600 font-medium hover:underline">
            Login
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
