<template>
    <section class="relative w-full h-[70vh] md:h-[85vh] bg-black text-white overflow-hidden group">
<!-- video logic -->
        <video :src="`/videos/${selectedSeries}.mp4`" ref="videoRef" autoplay :muted="isMuted" loop playsinline class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"></video>

        <!-- overlay effect -->
       <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent md:bg-gradient-to-r md:from-black md:via-black/50 md:to-transparent"></div>
       <!-- Mute/Unmute Button -->
 <button
   @click="toggleMute"
   class="absolute bottom-32 right-6 md:bottom-10 md:right-10 z-30 w-12 h-12 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 text-white"
 >
   {{ isMuted ? '🔊' : '🔇' }}
 </button>
       
        <!-- content -->
        <div class="absolute bottom-0 left-0 w-full z-20 px-6 md:px-16 pb-12 md:pb-20 max-w-3xl flex flex-col items-start">
            <h1 class="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg animate-fade-up">{{ movie.title }}</h1>
       
            <!-- ratings -->
            <div class="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-300 mb-5 animate-fade-up delay-100">
                <div class="flex items-center space-x-1 text-emerald-400 font-bold bg-black/40 px-2 py-1 rounded border border-emerald-500/30">
                    <span>⭐</span>
                    <span>{{ movie.vote }}</span>
                </div>
                <span class="hidden md:inline">•</span>
                <span>{{ movie.reviews }} Reviews</span>
                <span class="hidden md:inline">•</span>

                <span class="font-semibold text-white">{{movie.released}}</span>
                <span>•</span>
                <span class="border border-gray-500 px-1 rounded text-xs">{{ movie.runtime }}</span>
            </div>

            <!-- description -->
             <p class="text-sm md:text-lg text-gray-200 mb-8 leading-relaxed line-clamp-3 md:line-clamp-none max-w-2xl animate-fade-up delay-200">{{ movie.storyline }}</p>
            <!-- buttons -->
             <div class="flex gap-4 animate-fade-up delay-300">
                <button class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 text-amber-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10">
                            <path fill-rule="evenodd"
                                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                                clip-rule="evenodd" />
                        </svg>
                </button>
                <!-- <button class="flex items-center gap-2 bg-gray-600/80 backdrop-blur-sm text-white px-6 md:px-8 py-2 md:py-3 rounded-md font-semibold hover:bg-gray-500/80 transition-all duration-300">ℹ More Info</button> -->
             </div>
            </div>
    </section>
</template>

<style scoped>
/* aimations */
.animate-fade-up{
    animation: fadeUp 0.8s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);
}
.delay-100 { animation-delay: 0.1s;}
.delay-200 {animation-delay: 0.2s;}
.delay-300 {animation-delay: 0.3s;}

@keyframes fadeUp {
    to{
        opacity: 1;
        transform: translateY(0);
    }
}

</style>


<script setup>
// import { movieData } from '~/data/movieData';
import { useMovieStore } from '~/stores/movieStore';


const route = useRoute();
const videoRef = ref(null);
const isMuted = ref(true);

const getMovieData = useMovieStore();
const { movie } = storeToRefs(getMovieData)


// console.log("Banner movie",movie.value);
// const valueMovie = movie.value;
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

const slug = computed(() => route.params.name || selectedSeries.value);
// const movie = computed(() => getMovieData.movie)

onMounted(() =>{
    if(slug.value){
        getMovieData.fetchMovie(slug.value)
    }
})
watch(movie,(val)=>{
    console.log("Banner movie updated:");
    
})
useHead({
    title:props.isDynamicPage ? `Series: ${slug.value}` : "Stream Scape"
})

</script>