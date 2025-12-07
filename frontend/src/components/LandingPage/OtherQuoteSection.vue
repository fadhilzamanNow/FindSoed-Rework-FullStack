<script setup lang="ts">
import { ArrowRightOutlined } from "@ant-design/icons-vue";
import quote6 from "../../assets/quote6.png";
import { motion } from "motion-v";
import { textFromRight } from "../../utils/motion";
</script>

<template>
  <div class="bg-gradient-to-bl from-blue-50 via-white to-cyan-50">
    <motion.section
      class="max-w-7xl mx-auto px-4 py-16 md:py-24"
      initial="hidden"
      while-in-view="show"
      :variants="textFromRight(0.3)"
    >
      <div
        class="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24"
      >
        <!-- QUOTE -->
        <motion.div
          class="w-full md:w-1/2 text-center md:text-start"
          initial="hidden"
          while-in-view="show"
          :variants="textFromRight(0.4)"
        >
          <h3 class="text-blue-600 font-semibold">Prasetyo Ade</h3>
          <h1 class="text-3xl md:text-4xl font-bold text-neutral-800 mt-4 mb-6">
            Berlarilah ketika Berlari
            <br />Jalanlah ketika Berjalan
          </h1>
          <p class="text-gray-600 mb-8">
            Wah saya pernah sih itu punya barang hilang, tapi saya ga langsung
            nyari, saya tunda tunda gitu dan akhirnya hilang beneran ga ketemu
            ketemu
          </p>

          <a
            href="#home"
            class="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 hover:gap-3 transition-all"
          >
            Coba FindSoed
            <ArrowRightOutlined />
          </a>
        </motion.div>
        <!-- GAMBAR -->
        <motion.div
          class="w-full md:w-1/2 flex justify-center items-center"
          initial="hidden"
          while-in-view="show"
          :variants="textFromRight(0.5)"
        >
          <img :src="quote6" alt="" class="size-[450px] object-contain" />
        </motion.div>
      </div>
    </motion.section>
  </div>
</template>
