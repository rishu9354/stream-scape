<template>
    <section class="relative w-full h-[85vh] bg-black text-white">
<!-- video logic -->
        <video :src="`/videos/${selectedSeries}.mp4`" ref="videoRef" autoplay :muted="isMuted" loop playsinline class="absolute inset-0 w-full h-full object-cover"></video>

        <!-- overlay effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        <!-- <div class="absolute inset-0 bg-black bg-opacity-50 z-10"></div> -->
        <!-- content -->
        <div class="relative z-10 px-6 md:px-16 pt-28 max-w-4xl">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ movie.title }}</h1>

            <!-- ratings -->
            <div class="flex items-center space-x-4 text-sm text-gray-300 mb-4">
                <div class="flex items-center space-x-1 text-green-400">
                    <span>⭐</span>
                    <span>{{ movie.vote }}</span>
                </div>
                <span>{{ movie.reviews }} Reviews</span>
                <span>•</span>
                <span>{{movie.released}}</span>
                <span>•</span>
                <span>{{ movie.runtime }}</span>
            </div>

            <!-- Mute/Unmute Button -->
      <button
        @click="toggleMute"
        class="self-start  px-4 py-2 text-sm transition mt-3"
      >
        {{ isMuted ? '🔊' : '🔇' }}
      </button>
            <!-- description -->
             <p class="text-sm md:text-base text-gray-200 mb-6">{{ movie.storyline }}</p>
            <!-- buttons -->
             <div class="flex gap-4">
                <button class="bg-red-700 text-black px-6 py-2 rounded-md font-semibold hover:bg-red-800 transition">▶ Play</button>
                <button class="bg-gray-700 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-600 transition">+ My List</button>
             </div>
            </div>
    </section>
</template>


<script setup>
import { movieData } from '~/data/movieData';

const route = useRoute();
const videoRef = ref(null);
const isMuted = ref(true);



const toggleMute = ()=>{
    isMuted.value = !isMuted.value;
    if(videoRef.value){
        videoRef.value.muted = isMuted.value;
    }
}

const props = defineProps({
    seriesList:Array,
    isDynamicPage:Boolean,
    
})

const selectedSeries = computed(()=>{
    // if coming from [name].vue
    if(props.isDynamicPage && route.params.name){
        return route.params.name.replaceAll("-", "");
    } 

    // if coming from home page
    if(props.seriesList && props.seriesList.length > 0){
        const randomIndex = Math.floor(Math.random() * props.seriesList.length);
        return props.seriesList[randomIndex].replaceAll("-","");
    }
    return "Featured Series";   
});

const slug = selectedSeries.value;
const movie = movieData[slug];
console.log("movie",movie);

useHead({
    title:props.isDynamicPage ? `Series: ${selectedSeries.value}` : "Stream Scape"
})

</script>