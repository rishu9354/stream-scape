<template>
    <div class="bg-zinc-900 h-screen flex flex-col">
        <div class="flex justify-between p-2 text-zinc-500">
            <button @click="goBack">Go Back</button>
            <img src="/images/logo.png" alt="logo" class="size-12">
            <h2>{{ current.title }}</h2>
        </div>
        <video class="w-full flex-1 bg-black" controls autoplay @ended="playnext" ref="player"  @error="handleError">
            <source :src="current.url" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>

</template>

<script setup>
import { movieData } from '~/data/movieData';

const route = useRoute();
const router = useRouter();



const movieSlug = route.query.movie;
const epTitle =  route.query.ep;

const movie = movieData[movieSlug];
const episodes = movie?.episodes || [];

// const currentIndex = episodes.findIndex(e => e.title === epTitle);
// const current = ref(episodes[currentIndex] || episodes[0]);
const currentIndex = ref(0);
const current = ref({});

const player = ref(null);

// load episodes
function loadEpisode(index){
    if(episodes[index]){
        currentIndex.value = index;
        current.value = episodes[index];
    }
}

// init load episodes
loadEpisode(
    episodes.findIndex(e => e.title === route.query.ep) || 0
);

// watch for route changes
watch(
    ()=> route.query.ep,
    (newEp)=>{
        const idx = episodes.findIndex(e=> e.title === newEp);
        loadEpisode(idx >= 0 ? idx : 0);
    }
)

function playnext(){

    const next = currentIndex.value + 1;
    
    if(next < episodes.length){
        loadEpisode(next);

        // video reloaded
        nextTick(()=>{
            if(player.value){
                player.value.load();
                player.value.play().catch(err =>{
                    console.warn("Autoplay is not working: ",err)
                })
            }
        })
        router.replace({
            name:'player',
            query:{movie:movieSlug, ep:episodes[next].title}
        })
    }
}

function handleError(){
    console.error("video failed to load: ",current.url)
}
function goBack(){
    router.back();
}
</script>