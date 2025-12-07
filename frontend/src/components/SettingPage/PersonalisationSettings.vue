<script setup lang="ts">
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  UploadOutlined,
} from "@ant-design/icons-vue";
import {
  Avatar,
  Upload,
  Button,
  Flex,
  Input,
  InputProps,
  Modal,
  UploadProps,
  AvatarProps,
} from "ant-design-vue";
import { storeToRefs } from "pinia";
import { computed, h, ref } from "vue";
import { useAuthStore } from "../../stores/authStore";
import parsePhoneNumber from "libphonenumber-js";
import zxcvbn from "zxcvbn";
import { editDataProfile, editPhotoProfile } from "../../api/Auth/Auth";
import { FileType } from "ant-design-vue/es/upload/interface";
import estoolkit from "es-toolkit/compat";

const auth = useAuthStore();
const { userInfo } = storeToRefs(auth);
const phoneVal = ref<string>("");
const oPassword = ref("");
const password = ref("");
const cPassword = ref("");
const showOPassword = ref(false);
const showPassword = ref(false);
const showCPassword = ref(false);
const fileList = ref<UploadProps["fileList"]>([]);

const nameProps = computed<InputProps>(() => ({
  placeholder: userInfo.value?.username,
  disabled: true,
  id: "username",
}));

const emailProps = computed<InputProps>(() => ({
  placeholder: userInfo.value?.email,
  disabled: true,
  id: "email",
}));

const handlePhoneNumber = (val: string) => {
  if (val.match(/^[0-9]*$/)) {
    phoneVal.value = val;
  }
};

const phoneProps = computed<InputProps>(() => ({
  placeholder: userInfo.value?.phoneNumber,
  onInput: (e) => {
    e.preventDefault();
    handlePhoneNumber((e.target as HTMLInputElement).value);
  },
  value: phoneVal.value,
  id: "phone",
  onKeydown: (e) => {
    if (
      !e.key.match(/^[0-9]*$/) &&
      !(e.key === "Backspace") &&
      !(e.ctrlKey && e.key === "a")
    ) {
      e.preventDefault();
    }
  },
  status:
    phoneVal.value.length < 1 ? "" : isPhoneValid.value.success ? "" : "error",
}));

const isPhoneValid = computed(() => {
  if (parsePhoneNumber(phoneVal.value, "ID")?.isValid()) {
    return {
      success: true,
      message: "Nomor Valid",
    };
  } else {
    return {
      success: false,
      message: "Nomor yang anda masukkan tidak valid, gunakan nomor yang valid",
    };
  }
});

const handleReset = () => {
  phoneVal.value = "";
};

const oPasswordProps = computed<InputProps>(() => ({
  id: "oPassword",
  placeholder: "******",
  type: showOPassword.value ? "password" : "text",
  onInput: (e) => (oPassword.value = (e.target as HTMLInputElement).value),
  value: oPassword.value,
}));

const passProps = computed<InputProps>(() => ({
  id: "password",
  placeholder: "******",
  type: showPassword.value ? "password" : "text",
  onInput: (e) => (password.value = (e.target as HTMLInputElement).value),
  value: password.value,
  status:
    password.value.length < 1
      ? ""
      : passwordIndicator.value.number < 2
      ? "error"
      : "",
}));

const cPasswordProps = computed<InputProps | { class?: string }>(() => ({
  id: "cPassword",
  placeholder: "******",
  type: showCPassword.value ? "password" : "text",
  onInput: (e) => (cPassword.value = (e.target as HTMLInputElement).value),
  value: cPassword.value,
  status:
    cPassword.value.length < 1
      ? ""
      : cPasswordIndicator.value.number < 2
      ? "error"
      : "",
}));

const upProps = computed<UploadProps>(() => ({
  onRemove: (file) => {
    const index = fileList.value?.indexOf(file);
    const newFileList = fileList.value?.slice();
    newFileList?.splice(index as number, 1);
    fileList.value = newFileList;
  },
  beforeUpload: (file) => {
    fileList.value = [...(fileList.value || []), file];
    handleChangeProfile(file);
    return false;
  },
  fileList: fileList.value,
  maxCount: 1,
  itemRender: () => h("div"),
}));

const passwordStrength = computed(() => {
  return zxcvbn(password.value);
});

const cPasswordStrength = computed(() => {
  return zxcvbn(cPassword.value);
});

const passwordIndicator = computed(() => {
  switch (passwordStrength.value.score) {
    case 1: {
      return {
        number: 1,
        bgcolor: "bg-red-500",
        text: "Masih Lemah",
        textcolor: "text-red-500",
      };
    }
    case 2: {
      return {
        number: 2,
        bgcolor: "bg-yellow-300",
        text: "Lumayan",
        textcolor: "text-yellow-300",
      };
    }
    case 3: {
      return {
        number: 3,
        bgcolor: "bg-blue-500",
        text: "Lumayan Kuat",
        textcolor: "text-blue-500",
      };
    }
    case 4: {
      return {
        number: 4,
        bgcolor: "bg-green-500",
        text: "Sangat Kuat",
        textcolor: "text-green-400",
      };
    }
    default: {
      return {
        number: 0,
        bgcolor: "",
        text: "",
      };
    }
  }
});

const cPasswordIndicator = computed(() => {
  switch (cPasswordStrength.value.score) {
    case 1: {
      return {
        number: 1,
        bgcolor: "bg-red-500",
        text: "Masih Lemah",
        textcolor: "text-red-500",
      };
    }
    case 2: {
      return {
        number: 2,
        bgcolor: "bg-yellow-300",
        text: "Lumayan",
        textcolor: "text-yellow-300",
      };
    }
    case 3: {
      return {
        number: 3,
        bgcolor: "bg-blue-500",
        text: "Lumayan Kuat",
        textcolor: "text-blue-500",
      };
    }
    case 4: {
      return {
        number: 4,
        bgcolor: "bg-green-500",
        text: "Sangat Kuat",
        textcolor: "text-green-400",
      };
    }
    default: {
      return {
        number: 0,
        bgcolor: "",
        text: "",
      };
    }
  }
});

const isPasswordSame = computed(() => {
  return password.value === cPassword.value;
});

const handleChangeData = async (e: MouseEvent) => {
  e.preventDefault();
  try {
    const response = await editDataProfile({
      ...(isPhoneValid.value && { userPhoneNumber: phoneVal.value }),
      ...(isPasswordSame.value &&
        passwordStrength.value.score > 2 && { userPassword: password.value }),
    });

    if (response) {
      auth.setUserInfo({
        username: response.data.username,
        userId: response.data.userId,
        email: response.data.email,
        imageUrl: response.data.imageUrl,
        phoneNumber: response.data.phoneNumber,
      });
    }
    Modal.success({
      title: "Data profil berhasil untuk diubah",
      centered: true,
      zIndex: 999999,
    });
  } catch (e) {
    Modal.error({
      title: "Data profil gagal untuk diubah",
      centered: true,
      zIndex: 999999,
    });
  }
};

const handleChangeProfile = async (photo: FileType) => {
  try {
    const sendData = new FormData();

    if (photo) {
      sendData.append("profilePhoto", photo);
    }

    const response = await editPhotoProfile(sendData);
    if (response) {
      auth.setUserInfo({
        username: response.data.username,
        userId: response.data.userId,
        email: response.data.email,
        imageUrl: response.data.imageUrl,
        phoneNumber: response.data.phoneNumber,
      });
      Modal.success({
        title: "Foto Profil Berhasil untuk diubah",
        centered: true,
        zIndex: 99999,
      });
    }
  } catch (e) {
    Modal.error({
      title: "Foto Profil gagal untuk diubah",
      centered: true,
      zIndex: 99999,
    });
  }
};

const avatarExistProps = computed<AvatarProps>(() => ({
  size: 100,
  src: userInfo.value?.imageUrl || undefined,
}));

const avatarNotExistProps = computed<AvatarProps>(() => ({
  size: 100,
  icon: userInfo.value?.username.slice(0, 2),
}));

const isDisabled = computed(() => {
  if (
    isPasswordSame.value &&
    cPasswordStrength.value.score > 1 &&
    oPassword.value.length > 5 &&
    isPhoneValid.value.success
  ) {
    return true;
  } else if (
    isPhoneValid.value.success &&
    estoolkit.isEmpty(password.value) &&
    estoolkit.isEmpty(oPassword.value) &&
    estoolkit.isEmpty(cPassword.value)
  ) {
    return true;
  } else if (
    !estoolkit.isEmpty(password.value) &&
    !estoolkit.isEmpty(oPassword.value) &&
    !estoolkit.isEmpty(cPassword.value) &&
    isPasswordSame.value &&
    estoolkit.isEmpty(phoneVal.value)
  ) {
    return true;
  } else if (
    !(
      isPasswordSame.value &&
      cPasswordStrength.value.score > 1 &&
      oPassword.value.length > 5
    ) &&
    isPhoneValid.value.success
  ) {
    return false;
  } else if (
    isPasswordSame.value &&
    cPasswordStrength.value.score > 1 &&
    oPassword.value.length > 5 &&
    !isPhoneValid.value.success
  ) {
    return false;
  } else {
    return false;
  }
});
</script>

<template>
  <div class="py-4">
    <div class="space-y-6 max-w-xl">
      <!-- Profile Photo -->
      <div class="flex items-center gap-4 pb-6 border-b border-gray-100">
        <Avatar v-if="userInfo?.imageUrl" v-bind="avatarExistProps" />
        <Avatar v-else v-bind="avatarNotExistProps" />
        <Upload v-bind="upProps">
          <Button>
            <UploadOutlined />
            <span class="ml-2">Ganti Foto Profil</span>
          </Button>
        </Upload>
      </div>

      <!-- Username -->
      <div class="space-y-2">
        <label for="username" class="text-sm font-medium text-gray-700">Username</label>
        <Input v-bind="nameProps" size="large" />
      </div>

      <!-- Email -->
      <div class="space-y-2">
        <label for="email" class="text-sm font-medium text-gray-700">Email</label>
        <Input v-bind="emailProps" size="large" />
      </div>

      <!-- Phone -->
      <div class="space-y-2">
        <label for="phone" class="text-sm font-medium text-gray-700">Nomor Telepon</label>
        <Input v-bind="phoneProps" size="large" />
        <span
          v-if="phoneVal.length > 0"
          :class="['text-xs', isPhoneValid.success ? 'text-green-500' : 'text-red-500']"
        >{{ isPhoneValid.message }}</span>
      </div>

      <!-- Password Section -->
      <div class="pt-4 border-t border-gray-100">
        <h3 class="text-sm font-semibold text-gray-800 mb-4">Ubah Password</h3>
        
        <!-- Old Password -->
        <div class="space-y-2 mb-4">
          <label for="oPassword" class="text-sm font-medium text-gray-700">Password Lama</label>
          <Input v-bind="oPasswordProps" size="large">
            <template #suffix>
              <EyeInvisibleOutlined v-if="!showOPassword" @click="showOPassword = !showOPassword" class="cursor-pointer" />
              <EyeOutlined v-else @click="showOPassword = !showOPassword" class="cursor-pointer" />
            </template>
          </Input>
        </div>

        <!-- New Password -->
        <div class="space-y-2 mb-4">
          <label for="password" class="text-sm font-medium text-gray-700">Password Baru</label>
          <Input v-bind="passProps" size="large">
            <template #suffix>
              <EyeInvisibleOutlined v-if="!showPassword" @click="showPassword = !showPassword" class="cursor-pointer" />
              <EyeOutlined v-else @click="showPassword = !showPassword" class="cursor-pointer" />
            </template>
          </Input>
          <div v-if="password.length" class="flex items-center gap-1">
            <div class="flex gap-0.5 flex-1 max-w-[200px]">
              <div v-for="i in 4" :key="i" class="h-1 flex-1 rounded-full" :class="i <= passwordStrength.score ? passwordIndicator.bgcolor : 'bg-gray-200'" />
            </div>
            <span class="text-xs" :class="passwordIndicator.textcolor">{{ passwordIndicator.text }}</span>
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="space-y-2">
          <label for="cPassword" class="text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
          <Input v-bind="cPasswordProps" size="large">
            <template #suffix>
              <EyeInvisibleOutlined v-if="!showCPassword" @click="showCPassword = !showCPassword" class="cursor-pointer" />
              <EyeOutlined v-else @click="showCPassword = !showCPassword" class="cursor-pointer" />
            </template>
          </Input>
          <span v-if="cPassword.length && !isPasswordSame" class="text-xs text-red-500">Password tidak sama</span>
        </div>
      </div>

      <!-- Submit -->
      <div class="pt-4">
        <Button type="primary" size="large" :disabled="!isDisabled" @click="handleChangeData" class="!rounded-lg">
          Simpan Perubahan
        </Button>
      </div>
    </div>
  </div>
</template>
