<script setup lang="ts">
import Hero from "../components/LandingPage/Hero.vue";
import Navbar from "../components/LandingPage/Navbar.vue";
import SponsorContainer from "../components/LandingPage/SponsorContainer.vue";
import MissionSection from "../components/LandingPage/MissionSection.vue";
import FeatureSection from "../components/LandingPage/FeatureSection.vue";
import QuoteSection from "../components/LandingPage/QuoteSection.vue";
import OtherQuoteSection from "../components/LandingPage/OtherQuoteSection.vue";
import StatisticSection from "../components/LandingPage/StatisticSection.vue";
import TestimonialSection from "../components/LandingPage/TestimonialSection.vue";
import UpdateSection from "../components/LandingPage/UpdateSection.vue";
import Footer from "../components/LandingPage/Footer.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/authStore";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useSeoMeta } from "@unhead/vue";

useSeoMeta({
  title: "FindSoed - Platform Pencari Barang Hilang",
  description: "Platform Pencari Barang Terbaik Sekitar Fakultas Teknik Unsoed",
  ogTitle: "FindSoed - Platform Pencari Barang Hilang",
  ogDescription: "Platform Pencari Barang Terbaik Sekitar Fakultas Teknik Unsoed",
  ogUrl: "http://localhost:3500/",
  ogSiteName: "FindSoed",
  ogType: "website",
  author: "Muhammad Ilham Isfadhillah",
  twitterTitle: "FindSoed - Platform Pencari Barang Hilang",
  robots: "index, follow",
});

const { authToken } = storeToRefs(useAuthStore());
const navigate = useRouter();

watchEffect(() => {
  if (authToken.value) {
    navigate.push("/home");
  }
});
</script>

<template>
  <main class="relative min-h-screen overflow-hidden overscroll-none">
    <!-- Gradient blobs -->
    <div
      class="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/20 to-purple-200/20 rounded-full blur-[100px] -z-10"
    ></div>
    <div
      class="absolute top-1/2 -right-28 w-[400px] h-[400px] bg-gradient-to-bl from-blue-400/15 to-cyan-200/15 rounded-full blur-[100px] -z-10"
    ></div>
    
    <div class="overflow-hidden">
      <Navbar />
      <Hero />
      <div class="py-8">
        <SponsorContainer />
      </div>
      <div class="py-12">
        <MissionSection />
      </div>
      <div class="py-12">
        <FeatureSection />
      </div>
      <div class="py-12">
        <QuoteSection />
      </div>
      <div class="py-12">
        <OtherQuoteSection />
      </div>
      <div class="py-12">
        <StatisticSection />
      </div>
      <div class="py-12">
        <TestimonialSection />
      </div>
      <div class="py-12">
        <UpdateSection />
      </div>
      <Footer />
    </div>
  </main>
</template>
