<template>
    <section class="relative w-full min-h-screen bg-neutral-950 text-white pb-20">
        <div class="px-4 md:px-10 pt-8 md:pt-12 mb-8">
            
            <h1 class="text-3xl md:text-5xl font-bold font-serif text-amber-500 tracking-wide drop-shadow-lg cursor-default">Trending Series</h1>
            <div class="w-25 h-1 bg-amber-600 mt-2 rounded-full"></div>
        </div>
        <div v-if="movies && movies.length > 0" 
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 px-4 md:px-10">

            <div v-for="list in movies" :key="list._id"
                class="group relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
                <div class="relative aspect-[2/3] w-full overflow-hidden">
                    <img :src="list.poster" alt="pic" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80"></div>
                </div>
                <!-- play and wishlist btn -->
                <div class="absolute bottom-0 left-0 w-full flex flex-col items-center text-center">
                     <h1 class="text-lg md:text-xl font-bold text-white mb-3 leading-tight drop-shadow-md">
                        {{ list.title }}
                    </h1>
                <NuxtLink class="backdrop-blur-md bg-white/10 border border-white/20 hover:bg-amber-500 hover:text-black hover:border-amber-500 text-white text-sm md:text-base px-6 py-2 rounded-full font-medium transition-all duration-300 w-full" :to="`/series/${list.title}`">More info</NuxtLink>    
                <!-- <NuxtLink class="bg-gray-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-600 transition">+ My List</NuxtLink> -->
             </div>
            </div>
        </div>

        <div v-else class="flex justify-center items-center h-64">
            <div class="animate-pulse text-xl font-light text-neutral-500 tracking-widest uppercase">
                Loading Collections...
            </div>
        </div>
    </section>
</template>

<script setup>
import { useMovieStore } from '~/stores/movieStore';
import { storeToRefs } from 'pinia';
const getMovieData = useMovieStore();
const { movies } = storeToRefs(getMovieData);


onMounted(() =>{
    getMovieData.movieList()
})
// console.log(movies);
// const series = movies.value


</script>