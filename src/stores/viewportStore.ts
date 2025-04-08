import { defineStore } from "pinia";
import { ref } from "vue";

export const useViewPortStore = defineStore('viewport', () => {
    const width = ref<number>(window.innerWidth);
    const height = ref<number>(window.innerHeight);

})