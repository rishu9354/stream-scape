<template>
        <nav class="py-3 px-4 md:px-20 bg-zinc-950 text-white">
           <div class="flex justify-between items-center">
            <!-- brand name -->
               <NuxtLink to="">
               <!-- <h1 class="text-3xl font-extralight text-red-500">LOGO</h1> -->
                <img src="/images/logo.png" alt="logo" class="size-16">
           </NuxtLink>

           <!-- humburger menu btn -->
            <button class="md:hidden" @click="isOpen =!isOpen">
            <input type="search" name="inputSearch" class="text-white px-3 py-2 bg-zinc-800 rounded-3xl w-36 mr-10" placeholder="Search">

                <span class="text-4xl">{{ isOpen ? '*':'=' }}</span>
                <!-- <Icon :icon="isOpen ? '*' : '='" width="28" height="28"/> -->
            </button>
       <!-- desktop menu -->
        <div class="hidden md:flex space-x-12 items-center">
            <a href="/" class="nav-link hover:text-yellow-600">Home</a>
            <a href="/show" class="nav-link">Tv Shows</a>
            <a href="" class="nav-link">Movies</a>
            <a href="" class="nav-link">My List</a>
            <input type="search" name="inputSearch" class="text-white px-3 py-2 bg-zinc-800 rounded-3xl" placeholder="Search">
            <span class="px-3 py-2 bg-green-400 rounded-full font-mono font-semibold hover:bg-red-600 cursor-pointer"
            @mouseenter="isHover = true" @mouseleave="isHover = false">
                <button type="button" class="" @click="logout">{{ isHover ? 'Logout' :(auth.isAuthenticated ? 'Online' : 'Offline') }}</button>

                
            </span>
        </div>
           </div>

           <!-- mobile view -->
            <div class="flex flex-col space-y-4 mt-6 md:hidden" v-if="isOpen">
            <a href="/" class="nav-link hover:text-yellow-600">Home</a>
            <a href="/show" class="nav-link">Tv Shows</a>
            <a href="" class="nav-link">Movies</a>
            <a href="" class="nav-link">My List</a>
            <span class="px-3 py-2 bg-green-400 rounded-full font-mono font-semibold hover:bg-red-600 cursor-pointer"
            @mouseenter="isHover = true" @mouseleave="isHover = false">
            <button type="button" class="" @click="logout">{{ isHover ? 'Logout' :(auth.isAuthenticated ? 'Online' : 'Offline') }}</button>

                
            </span>
            </div>
    </nav>

</template>

<script setup>
import { useAuth } from '~/composables/state';
import { useAuthStore } from '~/stores/authStore';
const router = useRouter();
const auth = useAuth();
const logic = useAuthStore();
const isHover = ref(false);
const isOpen = ref(false);
function logout(){
    logic.logout();
    console.warn("Logging Out ...");
    router.push("/login")
    location.reload();
}
</script>