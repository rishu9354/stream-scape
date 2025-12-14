<template>
<nav class="sticky top-0 z-50 w-full px-6 md:px-16 py-4 transition-all duration-300 border-b border-white/5"
        :class="isScrolled ? 'bg-black/95 shadow-lg':'bg-black/90'">
    <div class="flex justify-between items-center max-w-7xl mx-auto">
            <!-- brand name -->
               <NuxtLink to="/" class="flex-shrink-0">
             
                <img src="/images/logo.png" alt="logo" class="h-10 md:h-12 object-contain hover:scale-105 transition-transform duration-300">
           </NuxtLink>

           <!-- humburger menu btn -->
            <!-- <button class="md:hidden" @click="isOpen =!isOpen">
            <input type="search" name="inputSearch" class="text-white px-3 py-2 bg-zinc-800 rounded-3xl w-36 mr-10" placeholder="Search">

                <span class="text-4xl">{{ isOpen ? '*':'=' }}</span>
            </button> -->
       <!-- desktop menu -->
        <div class="hidden md:flex space-x-8 text-sm font-medium text-zinc-300">
           <NuxtLink to="/" active-class="text-white font-bold" class="hover:text-white transition">Home</NuxtLink>
           <NuxtLink to="/show" active-class="text-white font-bold" class="hover:text-white transition">TV Shows</NuxtLink>
           <NuxtLink to="/movie" active-class="text-white font-bold" class="hover:text-white transition">Movies</NuxtLink>

            <!-- <input type="search" name="inputSearch" class="text-white px-3 py-2 bg-zinc-800 rounded-3xl" placeholder="Search">
            <span class="px-3 py-2 bg-green-400 rounded-full font-mono font-semibold hover:bg-red-600 cursor-pointer"
            @mouseenter="isHover = true" @mouseleave="isHover = false">
                <button type="button" class="" @click="logout">{{ isHover ? 'Logout' :(auth.isAuthenticated ? 'Online' : 'Offline') }}</button>

                
            </span> -->
        </div>
        <div class="hidden md:flex items-center gap-6">

            <div class="relative group">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                </div>
                <input type="search" v-model="searchQuery" @keyup.enter="handleSearch" class="bg-black/50 border border-zinc-700 text-white text-sm rounded-full focus:ring-1 focus:ring-white focus:border-white block w-64 pl-10 p-2 transition-all duration-300 placeholder-zinc-500" placeholder="Titles, people, genres">
            </div>

            <div class="relative">
                <button @click="logout" @mouseenter="isHover = true" @mouseleave="isHover = false" class="flex items-center gap-2">
                    <div class="size-9 rounded overflow-hidden border border-zinc-700 transition-all duration-300" :class="isHover ? 'border-red-600' : ''">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="User" class="w-full h-full object-cover">
                    </div>
                    <span class="text-xs text-zinc-300 group-hover:text-white transition-colors">
                        {{ isHover ? 'Logout' : logic.fname }}
                    </span>
                </button>
            </div>
        </div>

        <button class="md:hidden text-white focus:outline-none" @click="isOpen = !isOpen">
            <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
        </button>

    </div>

    <Transition name="slide-down">
        <div v-if="isOpen" class="md:hidden absolute top-full left-0 w-full bg-zinc-950 border-t border-zinc-800 shadow-2xl flex flex-col p-6 space-y-6">
            <div class="relative w-full">
                <input type="search" v-model="searchQuery" @keyup.enter="handleSearch" class="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-white" placeholder="Search for movies...">

                <button @click="handleSearch" class="absolute right-3 top-3 text-zinc-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                </button>
            </div>
            <!-- mobile view -->
             <div class="flex flex-col space-y-4 text-zinc-300 font-medium text-lg">
             <NuxtLink to="/" @click="isOpen = false" class="hover:text-amber-500 transition" >Home</NuxtLink>
             <NuxtLink to="/show" @click="isOpen = false" class="hover:text-amber-500 transition" >TV Show</NuxtLink>
             <NuxtLink to="/movie" @click="isOpen = false" class="hover:text-amber-500 transition" >Movies</NuxtLink>

             <!-- <span class="px-3 py-2 bg-green-400 rounded-full font-mono font-semibold hover:bg-red-600 cursor-pointer"
             @mouseenter="isHover = true" @mouseleave="isHover = false">
             </span> -->

             <button @click="logout" class="text-left text-red-500 font-bold mt-4 border-t border-zinc-800 pt-4">Logout</button>
             </div>
        </div>
    </Transition>
    </nav>
</template>

<script setup>
import { useAuth } from '~/composables/state';
import { useAuthStore } from '~/stores/authStore';
const router = useRouter();
const auth = useAuth();
const logic = useAuthStore();

//UI States
const isHover = ref(false);
const isOpen = ref(false);
const isScrolled = ref(false);
const searchQuery = ref('');

// Search Logic
function handleSearch(){
    if (searchQuery.value.trim() !== '') {
        router.push({
            path:'/search',
            query:{q:searchQuery.value}
        });
        isOpen.value = false;
    }
}

// scroll effect logic
const handleScroll = ()=>{
    isScrolled.value = window.scrollY > 50;
}

function logout(){
    logic.logout();
    console.warn("Logging Out ...");
    router.push("/login")
    location.reload();
}

onMounted(()=>{
    window.addEventListener('scroll',handleScroll);
})
onUnmounted(()=>{
    window.addEventListener('scroll',handleScroll);
})
</script>