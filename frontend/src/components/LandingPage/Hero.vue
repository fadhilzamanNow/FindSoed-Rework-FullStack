<script setup lang="ts">
import heroImage from "../../assets/herobetter.png";
import { motion } from "motion-v";
import { textFromLeft, textFromRight } from "../../utils/motion";
import { ArrowRightOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const navigate = useRouter();
</script>

<template>
  <main
    id="home"
    class="container mx-auto flex flex-col md:flex-row justify-between items-center pt-32 pb-16 px-4 sm:px-6 lg:px-8"
  >
    <!-- BAGIAN KIRI -->
    <div class="w-full md:w-1/2 space-y-8">
      <!-- TAG -->
      <div
        class="flex items-center gap-2 bg-blue-50 w-fit px-4 py-2 rounded-full hover:bg-blue-100 transition-colors group"
      >
        <span class="text-blue-600 group-hover:scale-125 transition-transform">🔎</span>
        <span class="text-sm font-medium text-blue-700">Kehilangan sesuatu?</span>
      </div>

      <motion.h1
        class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        initial="hidden"
        while-in-view="show"
        :variants="textFromLeft(0.1)"
      >
        Cari Barangmu Sekarang
        <span class="text-blue-600 relative inline-block">
          dengan FindSoed
          <span class="absolute bottom-0 left-0 w-full h-1 bg-blue-600/30 rounded"></span>
        </span>
      </motion.h1>

      <motion.p
        class="text-gray-600 text-lg md:text-xl max-w-xl"
        initial="hidden"
        while-in-view="show"
        :variants="textFromLeft(0.2)"
      >
        Platform Pencari Barang Terbaik Sekitar Fakultas Teknik Unsoed
      </motion.p>

      <motion.div
        class="flex flex-wrap gap-4"
        initial="hidden"
        while-in-view="show"
        :variants="textFromLeft(0.3)"
      >
        <button
          @click="navigate.push('/register')"
          class="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-200"
        >
          Mulai Sekarang
          <ArrowRightOutlined />
        </button>
        <button
          @click="navigate.push('/login')"
          class="flex items-center gap-2 bg-white text-gray-700 text-sm font-semibold py-3 px-6 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all"
        >
          Sudah punya akun
        </button>
      </motion.div>
    </div>

    <!-- BAGIAN KANAN -->
    <div class="w-full md:w-1/2 mt-12 md:mt-0">
      <motion.div
        class="relative"
        initial="hidden"
        while-in-view="show"
        :variants="textFromRight(0.2)"
      >
        <img
          :src="heroImage"
          alt="FindSoed Hero"
          class="rounded-lg relative z-10 hover:scale-100 lg:hover:scale-105 transition-transform duration-500"
        />
      </motion.div>
    </div>
  </main>
</template>
