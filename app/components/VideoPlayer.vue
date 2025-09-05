<template>
    <div class="bg-zinc-900 h-screen flex flex-col">
        <div class="flex justify-between p-2 text-zinc-500">
            <button @click="goBack">Go Back</button>
            <img src="/images/logo.png" alt="logo" class="size-12">
            <h2>{{ current.title }}</h2>
        </div>
        <video class="w-full flex-1 bg-black" controls autoplay @ended="playnext" ref="player"  @error="handleError" v-if="current.video_url">
            <source :src="current.video_url" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <!-- <span else>Video url undefined</span> -->
    </div>

</template>

<script setup>
import { useMovieStore } from '~/stores/authStore';


const route = useRoute();
const router = useRouter();



const movieSlug = route.query.movie;
const epTitle =  route.query.ep;
const getMovieData = useMovieStore();
const { movie } = storeToRefs(getMovieData);
// const movieData = getMovieData.fetchMovie(movieSlug);

// const currentIndex = episodes.findIndex(e => e.title === epTitle);
// const current = ref(episodes[currentIndex] || episodes[0]);
const currentIndex = ref(0);
const current = ref({});

const player = ref(null);

// load episodes
function loadEpisode(index){
    const episodes = movie.value?.episodes || [];
    if(episodes[index]){
        currentIndex.value = index;
        current.value = episodes[index];
        console.log("current ",current.value.video_url)
        console.log("Now playing episode:", current.value.title, "=>", current.value.video_url)
    }
}

// init load episodes
onMounted(async() =>{
    await getMovieData.fetchMovie(movieSlug); // fetch the exact movie data
    const episodes = movie.value?.episodes || [];
    const idx = episodes.findIndex(e => e.title === epTitle);
    loadEpisode(idx >= 0 ? idx : 0);
})

// watch for route changes
watch(
    ()=> route.query.ep,
    (newEp)=>{
    const episodes = movie.value?.episodes || [];

        const idx = episodes.findIndex(e=> e.title === newEp);
        loadEpisode(idx >= 0 ? idx : 0);
    }
)

function playnext(){
    const episodes = movie.value?.episodes || [];

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
    if (!current.value.video_url) {
        return false;
    }
    console.error("video failed to load: ",current.value.video_url)
    return true;
}
function goBack(){
    router.back();
}
</script>