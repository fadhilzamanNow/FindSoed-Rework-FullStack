<script setup lang="ts">
import sementara from "../../assets/sementarafoto3.jpg"
import { ArrowRightOutlined } from "@ant-design/icons-vue";

</script>

<template>
    <section class="max-w-7xl mx-auto px-4 py-16 md:py-24">
            <div class="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24">
                <!-- {/* QUOTE */} -->
                <div class="w-full md:w-1/2 text-center md:text-start">
                    <h3 class="text-orange-600 font-semibold">Prasetyo Ade</h3>
                    <h1 class="text-3xl md:text-4xl font-bold text-neutral-700 mt-4 mb-6 ">
                        Berlarilah ketika Berlari 
                        <br />Jalanlah ketika Berjalan
                    </h1>
                    <p class="text-gray-600 mb-8">Wah saya pernah sih itu punya barang hilang, tapi saya ga langsung nyari, saya tunda tunda gitu dan akhirnya hilang beneran ga ketemu ketemu</p>

                    <a href="#home" class="text-blue-600 font-semibold flex items-center justify-center md:justify-start  gap-2 hover:gap-4 transition-all ">
                        Coba FindSoed 
                        <ArrowRightOutlined class="size-8" />
                    </a>
                </div>
                <!-- {/* GAMBAR */} -->
                <div class="w-full md:w-1/2 text-center mx-auto">
                    <img :src="sementara" alt="" class="w-[300px] h-auto inline " />
                </div>
            </div>
        </section>
</template>