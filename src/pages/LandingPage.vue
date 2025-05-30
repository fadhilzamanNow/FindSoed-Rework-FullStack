<script setup lang="ts">
import Hero from '../components/LandingPage/Hero.vue';
import Navbar from '../components/LandingPage/Navbar.vue';
import SponsorContainer from '../components/LandingPage/SponsorContainer.vue';
import MissionSection from '../components/LandingPage/MissionSection.vue';
import FeatureSection from '../components/LandingPage/FeatureSection.vue';
import QuoteSection from '../components/LandingPage/QuoteSection.vue';
import OtherQuoteSection from '../components/LandingPage/OtherQuoteSection.vue';
import StatisticSection from '../components/LandingPage/StatisticSection.vue';
import TestimonialSection from '../components/LandingPage/TestimonialSection.vue';
import UpdateSection from '../components/LandingPage/UpdateSection.vue';
import Footer from '../components/LandingPage/Footer.vue';
</script>

<template>
    <main class="relative min-h-screen overflow-hidden overscroll-none">
        <div class="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-blue-700/20 to-pink-100/20 rounded-full blur-[80px] -z-10">
        </div>
        <div class="overflow-hidden">
            <Navbar />
            <Hero />
            <SponsorContainer />
            <MissionSection />
            <FeatureSection />
            <QuoteSection />
            <OtherQuoteSection />
            <StatisticSection />
            <TestimonialSection />
            <UpdateSection />
            <Footer />
        </div>
        </main>
</template>

