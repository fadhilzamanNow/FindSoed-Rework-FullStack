



<script setup lang="ts">
import { ref } from 'vue';
import logo from "../../assets/icon.png"
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';


type navType = {
    href: string,
    label: string
}
const navItems: navType[] = [
        {
            href: "#home", label: "Home"
        },
        {
            href: "#about", label: "Tentang Kami"
        },
        {
            href: "#pelayanan", label: "Layanan"
        },
        {
            href: "#testimoni", label: "Testimoni"
        }
    ]

    const isMenuOpen = ref(false);
    const activeLink = ref<navType['href']>("#home");
    const handleChooseNav = (item : navType['href']) => {
        activeLink.value = item;
        isMenuOpen.value = !isMenuOpen.value
    }
   
</script>


   
<template>
        <nav class="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-b-gray-100 shadow-sm">
           <!--  {/* DESKTOP DESIGN */} -->
            <div class="w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20 h-16">
                <!-- {/* LOGO */} -->
                <div class="flex items-center gap-2">
                    <div class="size-10">
                    <img :src="logo" alt="" class="h-full w-full object-contain" />
                    </div>
                    <div class="flex items-center text-xl font-bold">
                    <span class="text-black">Find</span>
                    <span class="text-blue-600">Soed</span>
                    </div>
                </div>
                <!-- {/* NAV ITEMS [PC] */} -->
                <ul class="hidden md:flex items-center gap-10">
                     <li v-for="(l,i) in navItems" :key="i" @click="() => activeLink = l.href" :class="['text-sm font-medium relative after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 afer:transition-all',activeLink === l.href ? 'text-blue-600 after:w-full' : 'text-gray-600 hover:text-gray-900']">{{ l.label }}</li>
                </ul>

                <!-- {/* GABUNG SEKARANG */} -->
                <button class="hidden md:block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100 ">
                    Ayo Gabung
                </button>


                <!-- /* HAMBURGER MENU */} -->
                <button class="md:hidden p-2" @click="() => isMenuOpen = !isMenuOpen" >
                    <MenuUnfoldOutlined v-if="isMenuOpen"  />
                    <MenuFoldOutlined  v-else/>
                </button>
            </div>
            <!-- {/* MOBILE DESIGN */} -->
            <div class="md:hidden bg-white border-t border-t-gray-400 py-4" v-if="isMenuOpen">
                        <ul class="container mx-auto px-4 space-y-4">
                            <li v-for="(l,i) in navItems" :key="i" :class="['block text-sm font-medium py-2', activeLink === l.href ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900', 'cursor-pointer']" @click="() => handleChooseNav(l.href)" >{{l.label}}</li>
                            <button class="w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100">
                                Ayo Gabung
                            </button>
                        </ul>

                    </div>
    
        </nav>
</template>
