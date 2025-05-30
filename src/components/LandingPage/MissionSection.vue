<script setup lang="ts">


type featureType = {
    icon : string,
    title : string,
    description : string
}

const features : featureType[] = [
        {
            icon : "🔵",
            title : "Show Lokasi",
            description : "Kamu bisa menunjukkan lokasi persisnnya dengan memilih koordinat pada Map"
        },
        {
            icon : "🍎",
            title : "Bertanya",
            description : "Kamu bisa bertanya mengenai detail barang yang hilang pada kolom komen"
        }
    ];

</script>

<template>
     <section class="w-full bg-blue-50 py-16 px-4 sm:px-6 md:px-8">
            <div class="max-w-6xl mx-auto">
                <div class="grid md:grid-cols-3 grid-cols-1 gap-8">
                    <!-- {/* TUJUAN */} -->
                <div>
                    <p class="text-sm mb-2 font-medium bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
                    Tujuan
                    </p>
                    <p class="text-xl md:w-4/5 w-full md:text-2xl font-bold text-gray-900">
                    Mewadahi Sistem Informasi Kehilangan Barang Hilang
                    </p>
                </div>
                    <!-- {/*  FITUR */} -->
                    <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 justify-between gap-8">
                        <div v-for="(f,i) in features" class="flex items-start space-x-4" :key="i">
                            <div class="w-12 h-12 flex items-center justify-start rounded-lg">{{f.icon}}</div>
                            <div>
                                <h3 class="text-xl font-semibold text-gray-900 mb-2">{{f.title}}</h3>
                                <p class="text-gray-600">{{f.description}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>