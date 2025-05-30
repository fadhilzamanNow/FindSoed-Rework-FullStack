<script setup lang="ts">
import { FileSearchOutlined, ReconciliationOutlined, UserAddOutlined } from '@ant-design/icons-vue'
import { h, VNode } from 'vue'



type statisticType = {
    category: string,
    icon: VNode
    count: number,
    description: string
}

const statisticList: statisticType[] = [
        {
            category: "Pengguna",
            icon: h(UserAddOutlined),
            count: 50,
            description: "Pengguna Baru Setiap Harinya"
        },
        {
            category: "Hilang",
            icon: h(FileSearchOutlined),
            count: 25,
            description: "Laporan Barang Hilang Setiap Harinya"
        },
        {
            category: "Ditemukan",
            icon: h(ReconciliationOutlined),
            count: 10,
            description: "Laporan Barang Ditemukan Setiap Harinya"

        }
    ]

</script>

<template>
     <section class="bg-blue-50" >
            <div class="max-w-7xl mx-auto text-center">
                <h1 class="font-bold text-2xl sm:text-3xl md:text-4xl  pt-12 mb-4">Statistik Findsoed</h1>
                <p class="text-gray-600">Finsoed Platform Pencarian Barang Hilang Terbaik </p>
            </div>
            <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 md:px-8 ">
                <div class="grid  grid-cols-1 sm:grid-cols-3 gap-3 ">
                        <div v-for="(v,i) in statisticList" class="bg-white text-center flex flex-col gap-3 shadow-md rounded-xl py-6 sm:py-8 md:py-10 px-4  " :key="i"
                        >
                            <div class="text-5xl font-semibold text-blue-600 flex justify-center">
                                <h1 :ref="`item-${i}`" >{{v.count}}</h1>
                                <span> +</span>

                            </div>
                            <h3 class="text-2xl font-medium">{{v.category}}</h3>
                            <p class="text-gray-600 text-sm ">{{v.description}}</p>
                        </div>
                </div>
            </div>
        </section>
</template>