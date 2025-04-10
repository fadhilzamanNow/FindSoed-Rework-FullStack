<script setup lang="ts">
import { Button, Flex } from "ant-design-vue";
import PicGroup from "../../assets/Home2PicAlt.jpg";
import { motion, useTransform } from "motion-v";
import Particles from "@tsparticles/vue3";
import { Engine } from "@tsparticles/engine";
//import { loadFull } from "tsparticles";
import { reactive, toRaw } from "vue";
import { loadAll } from "@tsparticles/all";
/* const options = {
  background: {
    color: {
      value: "#0d47a1",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: "bounce",
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
}; */




const {progress} = defineProps<{progress : any}>();

console.log("nilai progress  :", progress)

const scale = useTransform(toRaw(progress), [1,0], [1,1])

</script>



<template>
 
  <motion.div class="h-screen select-none flex justify-center items-center bg-black overflow-hidden">
  <!--   <div
      class="h-max max-w-max gap-[1px] flex flex-col md:flex-row md:gap-x-20"
    >
      <motion.div
        :initial="{ x: -100 }"
        :while-in-view="{ x: 0 }"
        :transition="{ duration: 0.5, ease: 'easeIn' }"
      >
        <img
          :src="PicGroup"
          class="w-full object-cover h-[200px] sm:h-[300px] md:h-[400px] xl:h-[400px] lg:w-[500px]"
        />
      </motion.div>
      <Flex vertical gap="50" class="border pt-20 w-full">
        <motion.div
          :initial="{ x: 200 }"
          :while-in-view="{ x: 0 }"
          :transition="{ duration: 1 }"
        >
          <Flex vertical>
            <h1
              class="text-white text-semibold text-xl !font-itim md:text-2xl lg:text-4xl"
            >
              "Boleh Pasrah
            </h1>
            <h1
              class="text-white text-semibold text-xl !font-itim md:text-2xl lg:text-4xl"
            >
              Tapi tidak dengan Usaha"
            </h1>
            <h1
              class="text-white text-semibold text-sm !font-itim pt-2 md:text-xl lg:text-3xl"
            >
              - Fadhil Isfadhillah
            </h1>
          </Flex>
        </motion.div>
        <motion.div
          :initial="{ x: 200 }"
          :while-in-view="{ x: 0 }"
          :transition="{ duration: 1 }"
        >
          <Button
            type="primary"
            class="flex align-center justify-center !text-black !bg-white hover:!bg-gray-200 transition duration-50 max-w-max"
          >
            Cari Sekarang
          </Button>
        </motion.div>
      </Flex>
    </div> -->
  </motion.div>
</template>
