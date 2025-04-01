<script setup lang="ts">
import { Flex } from 'ant-design-vue';
import { Input } from 'ant-design-vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const userVal = ref<string>("");
const emailVal = ref<string>("");
const passVal = ref<string>("");


</script>

<template>
     <Flex class="w-[883px] h-[653px] shadow-2xl rounded-lg" gap="24">
            <div class="w-[392px] h-[653px] bg-[#CFC922] rounded-lg">
            </div>
            <Flex vertical class="pt-20  flex-1" gap="16"  >
                <h1 class="font-bold text-2xl">Daftar</h1>
                <Flex vertical gap="8">
                    <label for="username" class="text-xs">Nama Pengguna</label>
                    <div class="w-[80%] ">
                        <Input v-model:value="userVal" placeholder="Username" id="username" />
                    </div>
                </Flex>
                <Flex vertical gap="8">
                    <label for="email" class="text-xs">Alamat Email</label>
                    <div class="w-[80%] ">
                        <Input v-model:value="emailVal" placeholder="Email" id="email" />
                    </div>
                </Flex>
                <Flex vertical gap="8">
                    <label for="password" class="text-xs">Password</label>
                    <div class="w-[80%] ">
                        <Input v-model:value="passVal" placeholder="Password" id="password" />
                    </div>
                </Flex>
                <Flex class="rounded-md bg-[#CFC922] text-white w-[58px] px-5 py-1.5 hover:bg-[#9e9c55] transition duration-200" justify="center" align="center">
                    Daftar
                </Flex>
                <Flex gap="4">
                    <span>Sudah memiliki akun?</span>
                    <RouterLink to="/login">
                        <span class="text-[#CFC922]">Login</span>
                    </RouterLink>
                </Flex>
            </Flex>
        </Flex>
</template>