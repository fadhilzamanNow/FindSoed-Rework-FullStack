<script setup lang="ts">
import { computed, ref } from "vue";
import logo from "../../assets/icon.png";
import { UserAddOutlined, UserOutlined } from "@ant-design/icons-vue";
import HamburgerMenu from "../Navbar/HamburgerMenu.vue";
import { Button, Dropdown, Menu, MenuItem } from "ant-design-vue";
import { RouterLink, useRoute } from "vue-router";

type navType = {
    href: string;
    label: string;
};

type GabungType = { 
    link : string,
    label : string
}
const navItems: navType[] = [
    {
        href: "#home",
        label: "Home",
    },
    {
        href: "#about",
        label: "Tentang Kami",
    },
    {
        href: "#pelayanan",
        label: "Layanan",
    },
    {
        href: "#testimoni",
        label: "Testimoni",
    },
];

const gabungOption : GabungType[] = [
    {
        link : "/login",
        label : "Login"
    },
    {
        link : "/register",
        label : "Daftar"
    }
]

const isMenuOpen = ref(false);
const activeLink = ref<navType["href"]>("#home");
const path = useRoute()

const navItemFilter = computed<navType[]>(() => {
    if(path.path === "/"){
        return [...navItems]
    }else{
        const newPath = {label : "", href : ""}
        return [newPath]
    }
})
const handleChooseNav = (item: navType["href"]) => {
    activeLink.value = item;
    isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
    <nav class="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm  z-50 border-b border-b-gray-100 shadow-sm">
        <!--  {/* DESKTOP DESIGN */} -->
        <div class="w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 ">
            <!-- {/* LOGO */} -->
             <RouterLink to="/">
                 <div class="flex items-center gap-2">
                     <div class="size-10">
                         <img :src="logo" alt="" class="h-full w-full object-contain" />
                     </div>
                     <div class="flex items-center text-xl font-bold">
                         <span class="text-black">Find</span>
                         <span class="text-blue-600">Soed</span>
                     </div>
                 </div>
             </RouterLink>
            <!-- {/* NAV ITEMS [PC] LANDING PAGE */} -->
            <ul class="hidden md:flex items-center gap-10">
                <li v-for="(l, i) in navItemFilter" :key="i" @click="() => (activeLink = l.href)" :class="[
                    '!text-sm font-medium relative after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 afer:transition-all',
                    activeLink === l.href
                        ? 'text-blue-600 after:w-full'
                        : 'text-gray-600 hover:text-gray-900',
                ]">
                    {{ l.label }}
                </li>
            </ul>

            <!-- {/* GABUNG SEKARANG */} -->
          
            <Dropdown >
              <template #overlay>
                <Menu>
                  <MenuItem>
                    <RouterLink to="/login">
                      <div class="flex items-center gap-2">
                        <UserOutlined class="text-xs" />
                        <span class="text-xs">Login</span>
                      </div>
                    </RouterLink>
                  </MenuItem>
                  <MenuItem>
                    <RouterLink to="/register">
                      <div class="flex items-center gap-2">
                        <UserAddOutlined class="text-xs" />
                        <span class="text-xs">Daftar</span>
                      </div>
                    </RouterLink>
                  </MenuItem>
                </Menu>
              </template>
              <div class="hidden md:block">
                <Button
                  type="primary"
                  class="flex  text-white justify-center items-center h-max px-4 py-1  transition duration-300 select-none cursor-pointer rounded-md !bg-blue-600 hover:!bg-blue-700"
                >
                  Ayo Gabung
              </Button>
              </div>
            </Dropdown>

            <!-- /* HAMBURGER MENU */} -->
            <button class="md:hidden p-2" @click="() => (isMenuOpen = !isMenuOpen)">
                <HamburgerMenu />
            </button>
        </div>
        <!-- {/* MOBILE DESIGN */} -->
         <div :class="['w-full opacity-20', isMenuOpen ? 'visible h-screen bg-black' : 'invisible  h-0']" @click="() => isMenuOpen = !isMenuOpen">
        </div>
        <div :class="['fixed top-0 left-0 right-0 mt-16 md:hidden bg-white border-t border-t-gray-400  transition-all duration-300 flex flex-col justify-between px-4', isMenuOpen ? 'py-4 h-[50vh] visible opacity-100' : 'h-0 py-0 invisible opacity-0' ]" >
            <div class="container mx-auto flex flex-col justify-between ">
                <ul class="px-4 space-y-4">
                <li v-for="(l, i) in navItems" :key="i" :class="[
                    'block text-sm font-medium py-2',
                    activeLink === l.href
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900',
                    'cursor-pointer',
                ]" @click="() => handleChooseNav(l.href)">
                    {{ l.label }}
                </li>
            </ul>
        </div> 
        <ul class="container mx-auto px-4 flex justify-between items-center ">
            <li v-for="(v,i) in gabungOption" :key="`list-${i}`" :class="['text-gray-600 hover:text-gray-900 text-sm font-medium py-2']">
                    <RouterLink :to="v.link">{{ v.label }}</RouterLink>
            </li>
        </ul>


           
        </div>
    </nav>
</template>
