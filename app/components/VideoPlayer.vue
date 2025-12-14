<template>
<div class="relative w-screen h-screen bg-black overflow-hidden group" ref="playerContainer">

<div class="absolute top-0 left-0 right-0 z-50 p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-100 focus-within:opacity-100">

        <div class="flex items-center justify-between max-w-7xl mx-auto text-white">
            <button @click="goBack" class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95">
                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    <span class="font-semibold text-sm tracking-wide">Back</span>
                
            </button>

            <h2 class="text-lg md:text-xl font-bold tracking-wider drop-shadow-md truncate max-w-[50%]">{{ current.title }}</h2>

            <img src="/images/logo.png" alt="logo" class="h-8 md:h-10 object-contain drop-shadow-lg opacity-80">
        </div>
    </div>
    <!-- video player -->
        <video class="w-full h-full object-contain focus:outline-none" controls autoplay playsinline @ended="handleVideoEnd" ref="player"  @error="handleError" @loadedmetadata="onVideoLoaded" v-if="current.video_url" >
            <source :src="current.video_url" type="video/mp4" />
            <p class="text-white text-center mt-20">Your browser does not support the video tag.</p>
        </video>
        
        <div v-if="isLoading" class="absolute inset-0 z-40 flex items-center justify-center bg-black">
            <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-t-4 border-red-600"></div>
        </div>

        <div v-if="hasError" class="absolute inset-0 z-40 flex flex-col items-center justify-center bg-zinc-900 text-white">
            <div class="text-5xl mb-4">⚠️</div>
            <h3 class="text-xl font-bold mb-2">Video Unavailable</h3>
            <button @click="goBack" class="text-zinc-400 underline hover:text-white">Go Back</button>
        </div>

        <div v-if="showNextPrompt" class="absolute bottom-10 right-10 z-50 animate-slide-up" >
            <button @click="playnext" class="bg-white text-black px-6 py-3 rounded font-bold hover:bg-zinc-200 shadow-xl transition flex items-center gap-2">
                <span>Next Episode</span>
                <span class="text-xs font-mono bg-black text-white px-2 py-0.5 rounded">{{ countdown }}</span>
            </button>
        </div>
</div>
</template>

<script setup>
import { useMovieStore } from '~/stores/movieStore';


const route = useRoute();
const router = useRouter();

const playerContainer = ref(null);
const player = ref(null);
const isLoading = ref(true);
const hasError = ref(false);
const showNextPrompt = ref(false);
const countdown = ref(5);
let countdownInterval =null;


const movieSlug = route.query.movie;
const epTitle =  route.query.ep;
const getMovieData = useMovieStore();
const { movie } = storeToRefs(getMovieData);
// const movieData = getMovieData.fetchMovie(movieSlug);

// const currentIndex = episodes.findIndex(e => e.title === epTitle);
// const current = ref(episodes[currentIndex] || episodes[0]);
const currentIndex = ref(0);
const current = ref({});

// landscape logic & fullscreen
const enterFullScreen = async ()=>{
    if(!playerContainer.value) return;
    try {
        // req fullscreen
        if(playerContainer.value.requestFullscreen){
            await playerContainer.value.requestFullscreen();
        } else if(playerContainer.value.webkitRequestFullscreen){
            await playerContainer.value.webkitRequestFullscreen();
        }

        if(screen.orientation && screen.orientation.lock){
            await screen.orientation.lock('landscape').catch((e)=>{
                console.log("Orientation lock not supported..:",e);
                
            });
        }
    } catch (error) {
        console.log('Fullscreen interaction required first:', error);
    }
}

const exitFullScreen = ()=>{
    if(document.fullscreenElement){
        document.exitFullscreen().catch(error => console.log(error));
    }
    if(screen.orientation && screen.orientation.unlock){
        screen.orientation.unlock();
    }
} 

// video handler
const onVideoLoaded = ()=>{
    isLoading.value = false;
    setTimeout(() => {
        enterFullScreen(); // if video fully loaded then we play on landscape
        
    },500);

}

function handleError(){
    // if (!current.value.video_url) {
    //     return false;
    // }
    // console.error("video failed to load: ",current.value.video_url)
    // return true;

    isLoading.value = false;
    hasError.value = true;
}


// load episodes
function loadEpisode(index){
    const episodes = movie.value?.episodes || [];
    if(episodes[index]){
        currentIndex.value = index;
        current.value = episodes[index];
        // console.log("current ",current.value.video_url)
        // console.log("Now playing episode:", current.value.title, "=>", current.value.video_url)

        // reset states for ne episode
        isLoading.value = true;
        hasError.value = false;
        showNextPrompt.value = false;
        countdown.value = 5;
        if(countdownInterval) clearInterval(countdownInterval);
    }
}

// init load episodes
onMounted(async() =>{
    await getMovieData.fetchMovie(movieSlug); // fetch the exact movie data
    const episodes = movie.value?.episodes || [];
    const idx = episodes.findIndex(e => e.title === epTitle);
    loadEpisode(idx >= 0 ? idx : 0);
})

// new episode & countdown logic
function handleVideoEnd(){
       const episodes = movie.value?.episodes || [];
       const next = currentIndex.value + 1;

    //    agar episode avaible hai tabhi show karega 
    if(next < episodes.length){
        showNextPrompt.value = true;
        countdown.value = 5;

        // start coundwon timer
        countdownInterval = setInterval(()=>{
            countdown.value--;
            if(countdown.value <=0){
                playnext();
            }
        },1000)
    }

}


function playnext(){
    if(countdownInterval) clearInterval(countdownInterval);
    showNextPrompt.value = false;
    
    const episodes = movie.value?.episodes || [];
    
    const next = currentIndex.value + 1;
    
    if(next < episodes.length){
        loadEpisode(next);
        
        // video reloaded
        router.replace({
            name:'player',
            query:{movie:movieSlug, ep:episodes[next].title}
        }).then(()=>{
            nextTick(()=>{
                if(player.value){
                    player.value.load();
                    player.value.play().catch(err =>{
                        console.warn("Autoplay is not working: ",err)
                    })
                }
            })
            
        })
    }
}

// watch for route changes
watch(
    ()=> route.query.ep,
    (newEp)=>{
    const episodes = movie.value?.episodes || [];

        const idx = episodes.findIndex(e=> e.title === newEp);
        loadEpisode(idx >= 0 ? idx : 0);
    }
)

function goBack(){
    exitFullScreen();
    router.back();
}

onBeforeUnmount(()=>{
    if(countdownInterval) clearInterval(countdownInterval);
    exitFullScreen();
})


</script>

<style scoped>
/* Smooth slide up animation for Next button */
.animate-slide-up {
    animation: slideUp 0.5s ease-out forwards;
}

@keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
</style>