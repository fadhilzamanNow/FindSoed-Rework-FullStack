<script setup lang="ts">
import { motion, useTime, useTransform } from "motion-v";
import { watch,  } from "vue";

const pathData1 = "M 0,400 L 0,150 C 113.2153110047847,142.0287081339713 226.4306220095694,134.05741626794259 314,135 C 401.5693779904306,135.94258373205741 463.4928229665072,145.79904306220095 552,145 C 640.5071770334928,144.20095693779905 755.5980861244018,132.74641148325358 853,136 C 950.4019138755982,139.25358851674642 1030.1148325358852,157.2153110047847 1125,162 C 1219.8851674641148,166.7846889952153 1329.9425837320573,158.39234449760767 1440,150 L 1440,400 L 0,400 Z";
const pathData2 = "M 0,500 L 0,187 C 119.77990430622009,227.91866028708134 239.55980861244018,268.8373205741627 333,255 C 426.4401913875598,241.16267942583733 493.5406698564593,172.56937799043064 588,171 C 682.4593301435407,169.43062200956936 804.2775119617224,234.88516746411486 896,230 C 987.7224880382776,225.11483253588514 1049.349282296651,149.88995215311004 1135,131 C 1220.650717703349,112.11004784688996 1330.3253588516745,149.555023923445 1440,187 L 1440,500 L 0,500 Z";

const time = useTime();

const pathVariants = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
      transition: {
        duration: 10,
        ease: "easeIn",
      },
    },
  }; 


watch(() => time.get(), (a) => {
    console.log("nilai time adalah : ", a )
})

</script>

<template>
  <motion.svg
    width="100%"
    height="100%"
    id="svg"
    viewBox="0 0 1440 390"
    xmlns="http://www.w3.org/2000/svg"
    class="transition duration-300 ease-in-out delay-150"
  >
    <motion.path
      :d="pathData1"
      stroke="none"
      stroke-width="0"
      fill="#1890FF"
      fill-opacity="1"
      class="transition-all duration-300 ease-in-out delay-150 path-0"
      :variants="pathVariants"
    ></motion.path>
  </motion.svg>
</template>
