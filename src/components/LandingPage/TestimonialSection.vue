<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import sementarafoto from "../../assets/sementarafoto.jpg";
import { Navigation } from "swiper/modules";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";

import 'swiper/css';
import 'swiper/css/navigation';

type testimonialType = {
  img: string;
  name: string;
  description: string;
};

const testimonialList: testimonialType[] = [
  {
    img: sementarafoto,
    name: "Legendary Player",
    description:
      "Findsoed Bagus Banget sihhh brooasdasdahd loreaskdnadnad nandjabdajbdajbdajbasjbdjasbdjh",
  },
  {
    img: sementarafoto,
    name: "Legendary Player",
    description: "Findsoed Bagus Banget sihhh broo",
  },
  {
    img: sementarafoto,
    name: "Legendary Player",
    description: "Findsoed Bagus Banget sihhh broo",
  },
  {
    img: sementarafoto,
    name: "Legendary Player",
    description: "Findsoed Bagus Banget sihhh broo",
  },
  {
    img: sementarafoto,
    name: "Legendary Player",
    description: "Findsoed Bagus Banget sihhh broo",
  },
];
</script>

<template>
  <section class="py-16 px-4 max-w-7xl mx-auto">
    <!-- {/* HEADER */} -->
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold md:text-4xl mb-4">
        Bagaimana FindSoed kata mereka?
      </h2>
      <p class="text-gray-400">
        FindSoed platform pencarian barang hilang terbaik
      </p>
    </div>

    <!-- {/* CARD SECTION */} -->
    <div class="">
      <!-- {/* CARDS */} -->
      <Swiper
        :slidesPerView="1"
        :spaceBetween="10"
        :navigation="{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }"
        :breakpoints="{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }"
        :modules="[Navigation]"
        class="md:mb-12 own-swiper"
      >
        <SwiperSlide
          v-for="(v, i) in testimonialList"
          :key="i"
          class="h-full md:py-12 py-4"
        >
          <div
            class="text-center bg-white p-4 rounded-lg h-full flex flex-col border border-gray-200 shadow-md"
          >
            <div class="size-24 mx-auto mb-4">
              <img
                :src="v.img"
                alt=""
                class="w-full h-full object-cover rounded-full border border-gray-200"
              />
            </div>

            <h3 class="text-3xl font-semibold mb-3">{{v.name}}</h3>
            <p class="text-sm font-normal text-gray-600">{{v.description}}</p>
          </div>
        </SwiperSlide>
      </Swiper>
      <!-- {/* BUTTON CARDS */} -->
      <div class="flex items-center justify-center gap-4 mt-8">
        <button
          class="swiper-button-prev-custom size-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
        >
          <LeftOutlined />
        </button>
        <button
          class="swiper-button-next-custom size-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  </section>
</template>
