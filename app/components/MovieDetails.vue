<template>
    <div class="bg-zinc-900 grid grid-cols-1 md:grid-cols-3 gap-10 py-10 px-6 md:px-20 text-white">
        <!-- poster -->
        <div>
            <img alt="movie-poster" class="rounded-xl w-full max-w-sm" :src="movieData.poster">
        </div>

        <!-- details -->
        <div class="md:col-span-2 flex flex-col gap-4">

            <ToggleTabs v-model:selected="selectedTab" />
            <div class="space-y-6" v-if="selectedTab === 'storyline'">
                <h2 class="text-3xl font-semibold font-serif">Storyline</h2>
                <p class="text-zinc-300">{{ movieData.storyline }}</p>

                <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <Detail label="Released" :value="movieData.released" />
                    <Detail label="Runtime" :value="movieData.runtime" />
                    <Detail label="Budget" :value="movieData.budget" />
                    <Detail label="Popularity" :value="movieData.popularity" />
                    <Detail label="Language" :value="movieData.language" />
                    <Detail label="Vote" :value="movieData.vote" />

                </div>

                <div class="mt-4">
                    <h3 class="font-semibold mb-2">Genres</h3>
                    <div class="flex gap-2 flex-wrap">
                        <span class="px-3 py-1 bg-zinc-800 rounded-full text-sm cursor-default"
                            v-for="genre in movieData.genres" :key="genre">
                            {{ genre }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="" v-else-if="selectedTab ==='episodes' ">
                <EpisodeList :episodes="movieData.episodes" @play="goToPlayer" />
                <!-- <VideoPlayer v-if="currentEp" :current="currentEp" :episodes="movie.episodes" @update:current="currentEp = $event" /> -->
            </div>
        </div>


    </div>




</template>

<script setup>
// import { movieData } from '~/data/movieData';
import { useMovieStore } from '~/stores/authStore';
const route = useRoute();
const router = useRouter();
const slug = route.params.name;
const getMovieData = useMovieStore();
const { movie, currentEp } = storeToRefs(getMovieData);
const movieData = movie;
console.log("movie details:",movieData.title)


const selectedTab = ref('storyline');
// const currentEp = ref(movie.episodes?.[0] || null);

// function formatCurrency(amount) {
//     return "$" + Number(amount).toLocaleString();
// }
function formatRuntime(mins) {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}h ${minutes}min`;
}

function goToPlayer(ep){
    router.push({
        name:'player',
        query:{
            movie:slug,
            ep:ep.video_url,
            ep:ep.title
        }
    })
    console.log("episode click:",ep.title);
    
}
onMounted(() =>{
    getMovieData.fetchMovie(slug)
})

</script>