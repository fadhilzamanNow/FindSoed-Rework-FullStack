<script setup lang="ts">
import {
  CodeSandboxOutlined,
  RollbackOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { Flex, Dropdown, Menu, MenuItem, Button } from "ant-design-vue";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { useLoginStore } from "../../stores/loginInfo";
import { storeToRefs } from "pinia";
import { useNavbarStore } from "../../stores/navbarInfo";
import HamburgerMenu from "./HamburgerMenu.vue";
import { useAuthStore } from "../../stores/authStore";
import { useViewStore } from "../../stores/viewStore";

const login = useLoginStore();

const { path } = useRoute();
const view = storeToRefs(useViewStore());
const { isNavbarOpen } = storeToRefs(useNavbarStore());
const auth = useAuthStore();
const notMain: string[] = ["/", "/login", "/register"];

const isNotMain = notMain.find((v) => path === v);

//console.log("is not main :", isNotMain)

//const isPathList : boolean = path === "/list"

/* const {scrollProgYBg} = useHeroStore();
 */
/* watchEffect(() => {
  console.log("nilai : ", scrollProgYBg)
}) */

/* onMounted(() => {
  if(scrollProgYBg){

  useMotionValueEvent(scrollProgYBg, 'change', (l) => {
  console.log("nav : ", l)
})
  }
}) */

/* watchEffect(() => {
  console.log("Is Navbar Open : ", isNavbarOpen.value)
}) */

/* const handleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value
} */

/* const handleLogout = () => {
  localStorage.removeItem("authToken")
  auth.setAuthToken(null);const handleLogout = () => {
  localStorage.removeItem("authToken")
  auth.setAuthToken(null);
  auth.setUserInfo(null);
}


  auth.setUserInfo(null);
}

 */
</script>

<template>
  <Flex
    align="center"
    class="w-full border-b-gray-300 py-1 px-2 min-h-[50px] bg-white"
    :class="[path !== '/' ? 'border-b-1' : 'border-b-0']"
  >
    <Flex
      :vertical="false"
      justify="space-between"
      align="center"
      class="w-full"
    >
      <RouterLink to="/">
        <Flex
          :vertical="false"
          align="center"
          gap="8"
          class="select-none"
          v-if="!login.isLogin"
        >
          <CodeSandboxOutlined class="!text-black text-3xl" />
          <h1 class="text-2xl font-bold">
            <span class="text-black">Find</span
            ><span class="text-[#1890FF]">Soed</span>
          </h1>
        </Flex>
      </RouterLink>
      <Flex class="text-sm" gap="8" v-if="isNotMain">
        <RouterLink to="/register">
          <div class="hidden sm:flex">
            <Button
              type="primary"
              class="hidden bg-black text-white rounded-sm sm:flex justify-center items-center h-max px-4 py-1 hover:bg-slate-700 transition duration-300 select-none cursor-pointer"
            >
              DAFTAR
            </Button>
          </div>
        </RouterLink>
        <RouterLink to="/login">
          <div class="hidden sm:flex">
            <Button
              class="hidden bg-white text-black rounded-sm sm:flex justify-center items-center h-max px-4 py-1 hover:bg-slate-200 transition duration-300 select-none cursor-pointer"
            >
              MASUK
            </Button>
          </div>
        </RouterLink>
        <Dropdown>
          <template #overlay>
            <Menu>
              <MenuItem>
                <RouterLink to="/login">
                  <Flex align="center" gap="8">
                    <UserOutlined class="text-xs" />
                    <span class="text-xs">Login</span>
                  </Flex>
                </RouterLink>
              </MenuItem>
              <MenuItem>
                <RouterLink to="/register">
                  <Flex align="center" gap="8">
                    <UserAddOutlined class="text-xs" />
                    <span class="text-xs">Daftar</span>
                  </Flex>
                </RouterLink>
              </MenuItem>
            </Menu>
          </template>
          <div class="sm:hidden">
            <Button
              type="primary"
              class="flex text-white justify-center items-center h-max px-4 py-1 transition duration-300 select-none cursor-pointer rounded-md"
            >
              Mulai
            </Button>
          </div>
        </Dropdown>
      </Flex>
      <div class="flex gap-1 items-center" v-else>
        <Dropdown placement="bottomLeft">
          <template #overlay>
            <Menu>
              <MenuItem>
                <RouterLink to="/setting">
                  <Flex gap="8" align="center">
                    <SettingOutlined />
                    <span>Settings</span>
                  </Flex>
                </RouterLink>
              </MenuItem>
              <MenuItem>
                <div @click="login.logout">
                  <RouterLink to="/login">
                    <Flex gap="8" align="center">
                      <RollbackOutlined />
                      <span>Logout</span>
                    </Flex>
                  </RouterLink>
                </div>
              </MenuItem>
            </Menu>
          </template>
          <div
            class="flex text-2xl h-[40px] w-[40px] bg-white hover:bg-gray-200 justify-center items-center rounded-md"
          >
            <UserOutlined />
          </div>
        </Dropdown>
        <div v-if="view.width.value < 1000">
          <HamburgerMenu />
        </div>
      </div>
    </Flex>
  </Flex>
</template>
