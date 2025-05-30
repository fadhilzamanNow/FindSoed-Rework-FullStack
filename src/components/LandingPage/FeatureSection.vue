<script setup lang="ts">
import { CSSProperties } from "vue";

type featureType = {
  icon: string;
  title: string;
  description: string;
};

const backgroundStyle: (i: number) => CSSProperties = (i) => {
  return {
    backgroundColor: i === 0 ? "#F1EFF0" : i === 1 ? "#FEE7E7" : "#FFF3E4",
  };
};

const features: featureType[] = [
  {
    icon: "🗺️",
    title: "Map",
    description:
      "Kamu bisa menunjukkan lokasi persisnnya dengan memilih koordinat pada Map",
  },
  {
    icon: "💬",
    title: "Comment",
    description:
      "Kamu bisa bertanya mengenai detail barang yang hilang pada kolom komen",
  },
  {
    icon: "📜",
    title: "History",
    description:
      "Kamu bisa melihat seluruh barangmu dan merubah status barangmu",
  },
];
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 py-16">
    <!-- {/* JUDUL FEATURES */} -->
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-4">Apa saja fitur pada FindSoed ?</h2>
      <p class="text-gray-600">
        Kami menyediakan beberapa fitur yang dapat digunakan untuk mempermudah
        komunikasi antar setiap pengguna dalam mengetahui detail barang
      </p>
    </div>

    <!-- {/* BOX FEATURES */} -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div v-for="(f,i) in features" key="{i}" class="flex flex-col items-center p-6 text-center">
        <div
          class="w-24 h-24 rounded-full mb-6 flex items-center justify-center"
          :style="backgroundStyle(i)"
        >
          <div class="text-3xl">{{f.icon}}</div>
        </div>

        <h3 class="text-2xl font-medium mb-3">{{f.title}}</h3>
        <p class="text-gray-500 text-center">{{f.description}}</p>
      </div>
    </div>
    <!-- {/* TOMBOL FEATURES */} -->
    <div class="text-center mt-2">
      <button
        class="bg-blue-600 text-white cursor-pointer px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors relative shadow-2xl backdrop-blur-2xl"
      >
        Coba Sekarang
        <div
          class="absolute -z-10 w-full h-full rounded-full bg-blue-600/30 blur-xl top-0 left-0"
        ></div>
      </button>
    </div>
  </section>
</template>
