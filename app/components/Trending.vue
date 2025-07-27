<template>
    <section class="relative w-full h-[95vh] bg-zinc-900 text-white">
        <h1 class="text-5xl px-8 py-5 pt-5 font-medium font-serif">Trending Series</h1>
        <div v-if="series" class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 px-8">

            <div v-for="list in series" :key="list"
                class="shadow-lg rounded-lg text-center bg-zinc-800 hover:bg-700 transition">
                <h1 class="text-2xl py-4 font-semibold font-sans">{{ list }}</h1>
                <div class="flex justify-center px-5 pb-4 rounded-md">
                    <img :src="`/images/${list}.jpg`" alt="pic" class="w-full h-48 object-cover rounded">
                </div>
                <!-- play and wishlist btn -->
                 <div class="flex gap-4 justify-center mb-4 mt-3">
                <NuxtLink class="bg-zinc-600 text-black px-6 py-2 rounded-md font-semibold hover:bg-zinc-700 transition" :to="`/series/${list}`">More info</NuxtLink>    
                <NuxtLink class="bg-gray-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-600 transition">+ My List</NuxtLink>
             </div>
            </div>
        </div>
    </section>
</template>

<script setup>

// using server/api to get web series name
const { data: series } = await useFetch("/api/lists",{baseURL:'/api'});


// const iphones=["iphone-XS","iphone-14","iphone-14-pro"];
</script>