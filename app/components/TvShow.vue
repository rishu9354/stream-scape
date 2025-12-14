<template>
    <section class="min-h-screen bg-[#141414] text-white pt-24 px-4 md:px-12 pb-10">

        <div class="flex items-baseline justify-between mb-5">
            <h1 class="text-3xl md:text-5xl font-bold tracking-tight text-amber-500 drop-shadow-lg">Tv Shows</h1>

            <div
                class="hidden md:flex items-center gap-3 px-3 py-1 border border-white/30 rounded bg-black/50 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition">
                <span class="text-sm font-medium">Genres</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        </div>

        <div v-if="pending" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            <div v-for="n in 5" :key="n" class="aspect-[2/3] bg-zinc-800 rounded-md animate-pulse"></div>
        </div>

        <div v-else
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-y-8 md:gap-x-4">

            <div v-for="list in series" :key="list"
                class="group relative bg-zinc-900 rounded-md overflow-hidden transition-all duration-300 hover:z-20 hover:scale-105 hover:shadow-2xl hover:shadow-black/80 cursor-pointer">
                <div class="aspect-[2/3] w-full relative">
                    <img :src="`/images/${list}.jpg`" alt="pic" loading="lazy"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:brightness-75"
                        @error="handleImageError">
                </div>

                <div
                    class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h1 class="text-lg font-bold truncate text-white mb-2 drop-shadow-md">{{ list }}</h1>

                    <!-- play and wishlist btn -->
                    <div class="flex gap-3 items-center">
                        <NuxtLink :to="`/series/${list}`" title="More Info"
                            class="size-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition active:scale-95">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                class="size-6">
                                <path fill-rule="evenodd"
                                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.535 0 3.246l-11.54 6.348c-1.25.686-2.779-.217-2.779-1.643V5.653z"
                                    clip-rule="evenodd" />
                            </svg>
                        </NuxtLink>
                        <button
                            class="size-10 rounded-full border-2 border-zinc-400 text-zinc-300 flex items-center justify-center hover:border-white hover:text-white hover:bg-white/10 transition"
                            title="Add to My List">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                        <!-- <NuxtLink :to="`/series/${list}`" class="size-10 rounded-full border-2 border-zinc-400 text-zinc-300 flex items-center justify-center hover:border-white hover:text-white hover:bg-white/10 transition ml-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </NuxtLink> -->
                    </div>
                    <div class="mt-3 flex items-center gap-2 text-xs font-semibold text-zinc-400">
                        <span class="text-green-400">98% Match</span>
                        <span class="border border-zinc-500 px-1 rounded text-[10px]">U/A 16+</span>
                        <span>1 Seasons</span>
                    </div>

                </div>

            </div>
        </div>
    </section>
</template>

<script setup>

// using server/api to get web series name
const { data: series,pending } = await useFetch("/api/shows",{baseURL:'/api'});
// console.log(series);

// Fallback for broken images
const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/300x450?text=No+Poster"; 
};

</script>