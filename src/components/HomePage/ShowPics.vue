<script setup lang="ts">
import { LaptopOutlined, PhoneFilled, WalletFilled } from "@ant-design/icons-vue";
import People from "../../assets/PicBackOther.png"
</script>

<template>
    <div class="">
        <div class="w-[350px] h-[350px]  relative m-auto mt-[10vh] bg-clip-border border ">
            <div class="absolute w-[200px] h-[200px] bg-[#1890FF]/70 rounded-full top-1/2 -translate-y-1/2 left-6/12 -translate-x-1/4  mix-blend-multiply filter blur-xl animate-try-new">
            </div>
            <div class="absolute w-[200px] h-[200px] bg-[#1890FF]/90 rounded-full top-1/2 -translate-y-1/2 left-6/12 -translate-x-3/4  mix-blend-multiply filter blur-xl animate-try-new animation-delay-2000">
            </div>
            <div class="absolute w-[200px] h-[200px] bg-[#1890FF]/50 rounded-full top-3/4 -translate-y-3/4 left-6/12 -translate-x-1/2  mix-blend-multiply filter blur-xl animate-try-new animation-delay-4000">
            </div>
            <img :src="People" alt="" class="w-full h-full object-contain absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 ">
            <div class="absolute shadow-lg bg-white rounded-md p-2 top-4/12 -left-2/12  font-semibold">
                <div class="w-full flex gap-2 items-center text-[#1890FF]">
                        <PhoneFilled />
                    <span class="text-black">Handphone Hilang ?</span>
                </div>
            </div>
            <div class="absolute shadow-lg bg-white rounded-md p-2 top-1/2 -right-2/12 border-2 border-[#1890FF] font-semibold">
                <div class="w-full flex gap-2 items-center text-[#1890FF]">
                        <WalletFilled  />
                    <span class="text-black">Dompet Hilang ?</span>
                </div>
            </div>
            <div class="absolute shadow-lg bg-white rounded-md p-2 top-3/4 -left-1/12 border-2 border-[#1890FF] font-semibold">
                <div class="w-full flex gap-2 items-center text-[#1890FF]">
                        <LaptopOutlined />
                    <span class="text-black">Laptop Hilang ?</span>
                </div>
            </div>
        </div>
    </div>
</template>