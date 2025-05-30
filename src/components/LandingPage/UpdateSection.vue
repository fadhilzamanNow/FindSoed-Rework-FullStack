<script setup lang="ts">
</script>

<template>
    <section class="container mx-auto px-4 sm:px-6 md:px-8 py-16 ">
            <div class="bg-blue-600 rounded-2xl overflow-hidden">
                <div class="relative md:px-16 py-16 md:py-24">
                    <div class="absolute top-0 right-0 w-1/2 h-full hidden md:block custom-clip bg-blue-700"></div>
                    <div class="relative flex flex-col md:flex-row justify-between items-center">
                        <!-- {/* BAGIAN KIRI */} -->
                        <div class="text-blue-100 text-center max-w-lg md:text-left">
                            <h2 class="text-2xl sm:text-3xl md:text-3xl font-medium mb-4">Harapan untuk Findsoed</h2>
                            <p class="text-sm sm:text-base">Ayo berikan saranmu untuk Findsoed</p>
                        </div>
                       <!--  {/* BAGIAN KANAN */} -->
                        <div class="flex flex-col md:flex-row h-max justify-center mt-6 sm:mt-4 md:mt-0">
                            <input type="text" placeholder="Masukkan Pesanmu" class="w-full bg-white sm:w-auto md:w-80 px-4 sm:px-6 py-3 sm:py-4 rounded-xl md:rounded-r-none focus:outline-none " />
                            <button class="w-full sm:w-auto cursor-pointer bg-green-500 text-white px- sm:px-8 py-3 sm:py-4 rounded-xl md:rounded-l-none md:rounded-r-xl mt-6 md:mt-0">Kirim</button>
                        </div>
                    </div>
                </div>
            </div>  
        </section>
</template>